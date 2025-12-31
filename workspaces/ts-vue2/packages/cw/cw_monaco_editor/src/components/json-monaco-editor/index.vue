<template>
  <div ref="editorContainer" :class="[$style.root, {[$style.designer]: $env?.VUE_APP_DESIGNER}]" >
    <div ref="monacoContainer" :class="[$style.editor]" :error="hasError"></div>
  </div>
</template>

<script>
// 添加 Monaco Editor 样式配置
const monacoStyles = {
  '--vscode-editorCodeLens-lineHeight': '15px',
  '--vscode-editorCodeLens-fontSize': '10px',
  '--vscode-editorCodeLens-fontFeatureSettings': '"liga" off, "calt" off',
}
import { debounce } from 'lodash'

export default {
  name: 'json-monaco-editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: null
    },
    attrThreshold: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      editor: null,
      decorations: [],
      hasError: false,
      errorMessage: '',
      placeholderWidget: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadMonacoEditor();
    })
  },
  computed: {
    isInDesigner() {
      return this?.$env ? this.$env.VUE_APP_DESIGNER : true;
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose()
    }
  },
  methods: {
    loadMonacoEditor() {
      // 检查是否已经加载
      if (window.MonacoEditor || window.monaco) {
        this.initEditor(window.MonacoEditor || window.monaco);
        return;
      }

      // 动态加载Monaco编辑器脚本
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/monaco-editor@0.52.2/min/vs/loader.js';
      script.onload = () => {
        window.require.config({
          paths: {
            vs: 'https://unpkg.com/monaco-editor@0.52.2/min/vs'
          }
        });
        
        // 加载Monaco编辑器
        window.require(['vs/editor/editor.main'], () => {
          this.initEditor(window.monaco);
        });
      };
      document.head.appendChild(script);
    },
    initEditor(monaco) {
      // 配置 JSON 语言校验
      try {
          monaco?.languages?.json?.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          allowComments: false,
          schemas: [],
          enableSchemaRequest: true
        })
      } catch (e) {
        console.log('monaco-editor 初始化失败', e)
        // console.error('monaco-editor 初始化失败', e)
      }
      

      // monaco?.editor.getModels().forEach(model => model.dispose());

      const containerElement = this.$refs.editorContainer;
      const editorHeight = containerElement ? 
      parseInt(getComputedStyle(containerElement).getPropertyValue('--cw-style-height')) || 340 : 
      340;

      const editorWidth = containerElement ? 
      parseInt(getComputedStyle(containerElement).getPropertyValue('--cw-style-width')) || 500 : 
      500;

      this.editor = monaco.editor.create(this.$refs.monacoContainer, {
        dimension: {
          width: editorWidth,
          height: editorHeight
        },
        scrollBeyondLastLine: false,
        minimap: {
          enabled: true
        },
        folding: true,
        scrollbar: {},
        value: this.value,
        language: 'json',
        theme: 'vs-light',  // 使用浅色主题
        fontSize: 14,
        lineHeight: 20,
        renderValidationDecorations: 'on',
      })

      // 应用自定义样式
      Object.entries(monacoStyles).forEach(([key, value]) => {
        this.$refs.monacoContainer.style.setProperty(key, value)
      })

      // 监听校验状态变化
      const model = this.editor.getModel()
      monaco.editor.setModelMarkers(model, 'json', [])

      this.editor.onDidChangeModelContent(() => {
        const value = this.editor.getValue()
        const model = this.editor?.getModel();
        const length = model?.getLineCount();
        this.editor.updateOptions({
          formatOnType: true,
          formatOnPaste: true,
        })
        if (value !== '') {
          this.editor.removeOverlayWidget(this.placeholderWidget)
          this.validateJson(value)
          if (this.attrThreshold > 0 && length > this.attrThreshold) {
            debounce(() => {
              this.checkJsonLength(value)
            }, 500)()
          }
        } else {
          this.editor.addOverlayWidget(this.placeholderWidget)
        }
        this.$emit('update:value', value)
        this.$emit('change', {
          newValue: value,
          oldValue: this.value
        })
        this.validateJson(value)
      })

      this.createPlaceholderWidget(monaco)
    },

    checkJsonLength(content) {
      const model = this.editor?.getModel();
      const length = model?.getLineCount();

      if (length > this.attrThreshold) {
        const newContent = (content || '').split('\n').slice(0, this.attrThreshold).join('\n');
        this.editor.executeEdits('checkJsonLength', [
          {
            range: model.getFullModelRange(),
            text: newContent
          }
        ]);

        this.$emit('onMaxLength')
      }
    },
    validateJson(content) {
      try {
        if (!content.trim()) {
          this.hasError = false
          this.errorMessage = ''
          return
        }

        // 尝试解析 JSON
        const parsed = JSON.parse(content)

        // 检查是否为对象或数组
        if (typeof parsed !== 'object' || parsed === null) {
          throw new Error('Invalid JSON')
        }

        this.hasError = false
        this.errorMessage = ''
      } catch (e) {
        this.hasError = true
        this.errorMessage = '仅支持json格式'
      }
    },
    createPlaceholderWidget(monaco) {
      this.placeholderWidget = {
        getId: () => 'placeholder.widget',
        getDomNode: () => {
          if (!this.domNode) {
            let placeholder = ''
            try {
              placeholder = JSON.parse(this.placeholder) || '';
            } catch (e) {
              placeholder = '';
            }

            this.domNode = document.createElement("div");
            const content = JSON.stringify(placeholder, null, 4).replace(/ /g, "&nbsp;").replace(/\n/g, "<br>");
            this.domNode.innerHTML = "请输入接口请求体或返回的JSON样例，最多支持500行<br>例如：<br>".concat(content),
              Object.assign(this.domNode.style, {
                color: "#999999",
                userSelect: "none",
                pointerEvents: "none",
                position: "absolute",
                top: "0px",
                left: "75px",
                lineHeight: 1.6,
                fontSize: '13px',
              })
          }
          return this.domNode
        },
        getPosition: () => {
          return {
            preference: monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER
          }
        }
      }
      if (this.value === '') {
        this.editor.addOverlayWidget(this.placeholderWidget)
      }
    },
  },
  watch: {
    value(newValue) {
      if (this.editor && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue)
        // this.updatePlaceholder()
      }
    },
    hasError(newValue) {
      this.$emit('error', this.errorMessage)
    }
  }
}
</script>

<style module>
.root {
  position: relative;
}
.editor {
  min-width: auto;
  height: auto;
  min-height: 200px;

  [class=overflow-guard] {
    border: 1px solid #e5e5e5;
  }

  [class=overflow-guard] [class=margin] {
    background-color: #e5e5e5;
  }

  [class=minimap-decorations-layer] {
    border-left: 1px solid #e4e4e4;
  }

  &[error=true] {
    [class=overflow-guard] {
      border: 1px solid #f24957 !important;
    }
  }
}

.placeholder {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #999;
  pointer-events: none;
  font-style: italic;
  z-index: 1;
}
.designer::before {
  content: "发布预览后使用";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 16px;
  z-index: 1;
  pointer-events: none;
}
</style>
