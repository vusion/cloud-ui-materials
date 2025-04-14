<template>
  <div :class="$style.root" ref="editorContainer">
    <div ref="monacoContainer" :class="[$style.editor]" :error="hasError"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

// 配置 workers
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    return new editorWorker()
  }
}

// 添加 Monaco Editor 样式配置
const monacoStyles = {
  '--vscode-editorCodeLens-lineHeight': '15px',
  '--vscode-editorCodeLens-fontSize': '10px',
  '--vscode-editorCodeLens-fontFeatureSettings': '"liga" off, "calt" off',
}

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
    this.initMonaco()
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose()
    }
  },
  methods: {
    initMonaco() {
      // 配置 JSON 语言校验
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        allowComments: false,
        schemas: [],
        enableSchemaRequest: true
      })

      this.editor = monaco.editor.create(this.$refs.monacoContainer, {
        dimension: {
          width: 500,
          height: 340
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
        this.editor.updateOptions({
          formatOnType: true,
          formatOnPaste: true,
        })
        if (value !== '') {
          this.editor.removeOverlayWidget(this.placeholderWidget)
          this.validateJson(value)
          if (!this.hasError && this.attrThreshold > 0) {
            this.checkJsonLength(value)
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

      this.createPlaceholderWidget()
    },

    checkJsonLength(content) {
      const model = this.editor?.getModel();
      const length = model?.getLineCount();

      if (length > this.attrThreshold) {
        const newContent = content.split('\n').slice(0, this.attrThreshold).join('\n');
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
    createPlaceholderWidget() {
      this.placeholderWidget = {
        getId: () => 'placeholder.widget',
        getDomNode: () => {
          if (!this.domNode) {
            let placeholder = ''
            try {
              placeholder = JSON.parse(this.placeholder) || '请输入接口请求体或返回的JSON样例，最多支持500行<br>例如：<br>'
            } catch (e) {
              placeholder = '请输入接口请求体或返回的JSON样例，最多支持500行<br>例如：<br>'
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
      this.editor.addOverlayWidget(this.placeholderWidget)
      // this.updatePlaceholder()
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
      newValue && this.$emit('error', this.errorMessage)
    }
  }
}
</script>

<style module>
.root {}

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
</style>
