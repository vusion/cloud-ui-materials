import type { editor as MonacoEditor, IDisposable } from 'monaco-editor';
import { nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import { getMonaco } from './monaco-setup';

const monacoStyles: Record<string, string> = {
  '--vscode-editorCodeLens-lineHeight': '15px',
  '--vscode-editorCodeLens-fontSize': '10px',
  '--vscode-editorCodeLens-fontFeatureSettings': '"liga" off, "calt" off',
};

export interface JsonMonacoEditorProps {
  value?: string;
  placeholder?: string | null;
  attrThreshold?: number;
}

export interface JsonMonacoEditorEmit {
  (event: 'update:value', value: string): void;
  (event: 'change', payload: { newValue: string; oldValue: string }): void;
  (event: 'error', errorMessage: string): void;
  (event: 'onMaxLength'): void;
}

function debounce<T extends (...args: never[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, wait);
  };
}

export function useJsonMonacoEditor(
  props: JsonMonacoEditorProps,
  emit: JsonMonacoEditorEmit,
  editorContainer: Ref<HTMLDivElement | null>,
  monacoContainer: Ref<HTMLDivElement | null>,
) {
  const hasError = ref(false);
  const errorMessage = ref('');

  let monacoEditor: MonacoEditor.IStandaloneCodeEditor | null = null;
  let contentChangeDisposable: IDisposable | null = null;
  let placeholderWidget: MonacoEditor.IOverlayWidget | null = null;
  let placeholderDomNode: HTMLDivElement | null = null;
  let isApplyingExternalValue = false;
  let isUnmounted = false;
  let monacoApi: typeof import('monaco-editor') | null = null;

  const debouncedCheckJsonLength = debounce((content: string) => {
    checkJsonLength(content);
  }, 500);

  function resolveDimension(
    cssValue: string,
    containerSize: number,
    fallback: number,
  ): number {
    const trimmed = cssValue.trim();
    if (!trimmed) {
      return containerSize > 0 ? containerSize : fallback;
    }
    if (trimmed.endsWith('%')) {
      return containerSize > 0 ? containerSize : fallback;
    }
    const parsed = parseInt(trimmed, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return containerSize > 0 ? containerSize : fallback;
    }
    return parsed;
  }

  function getEditorDimensions() {
    const containerElement = editorContainer.value;
    if (!containerElement) {
      return { editorHeight: 340, editorWidth: 500 };
    }

    const computed = getComputedStyle(containerElement);
    const editorHeight = resolveDimension(
      computed.getPropertyValue('--cw-style-height'),
      containerElement.clientHeight,
      340,
    );
    const editorWidth = resolveDimension(
      computed.getPropertyValue('--cw-style-width'),
      containerElement.clientWidth,
      500,
    );
    return { editorHeight, editorWidth };
  }

  function validateJson(content: string) {
    try {
      if (!content.trim()) {
        hasError.value = false;
        errorMessage.value = '';
        return;
      }

      const parsed = JSON.parse(content);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Invalid JSON');
      }

      hasError.value = false;
      errorMessage.value = '';
    } catch {
      hasError.value = true;
      errorMessage.value = '仅支持json格式';
    }
  }

  function checkJsonLength(content: string) {
    if (!monacoEditor || !props.attrThreshold || props.attrThreshold <= 0) return;

    const model = monacoEditor.getModel();
    if (!model) return;

    const length = model.getLineCount();
    if (length > props.attrThreshold) {
      const newContent = (content || '').split('\n').slice(0, props.attrThreshold).join('\n');
      monacoEditor.executeEdits('checkJsonLength', [
        {
          range: model.getFullModelRange(),
          text: newContent,
        },
      ]);
      emit('onMaxLength');
    }
  }

  function createPlaceholderWidget(monaco: typeof import('monaco-editor')) {
    placeholderWidget = {
      getId: () => 'placeholder.widget',
      getDomNode: () => {
        if (!placeholderDomNode) {
          let placeholder: unknown = '';
          try {
            placeholder = JSON.parse(props.placeholder || '') || '';
          } catch {
            placeholder = '';
          }

          placeholderDomNode = document.createElement('div');
          const content = JSON.stringify(placeholder, null, 4)
            .replace(/ /g, '&nbsp;')
            .replace(/\n/g, '<br>');
          placeholderDomNode.innerHTML =
            '请输入接口请求体或返回的JSON样例，最多支持500行<br>例如：<br>'.concat(content);
          Object.assign(placeholderDomNode.style, {
            color: '#999999',
            userSelect: 'none',
            pointerEvents: 'none',
            position: 'absolute',
            top: '0px',
            left: '75px',
            lineHeight: 1.6,
            fontSize: '13px',
          });
        }
        return placeholderDomNode;
      },
      getPosition: () => ({
        preference: monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
      }),
    };
  }

  function updatePlaceholderVisibility(value: string) {
    if (!monacoEditor || !placeholderWidget) return;
    if (value !== '') {
      monacoEditor.removeOverlayWidget(placeholderWidget);
    } else {
      monacoEditor.addOverlayWidget(placeholderWidget);
    }
  }

  function disposeEditor() {
    if (contentChangeDisposable) {
      contentChangeDisposable.dispose();
      contentChangeDisposable = null;
    }
    if (monacoEditor && placeholderWidget) {
      try {
        monacoEditor.removeOverlayWidget(placeholderWidget);
      } catch {
        // editor may already be disposed
      }
    }
    if (monacoEditor) {
      monacoEditor.dispose();
      monacoEditor = null;
    }
    placeholderWidget = null;
    placeholderDomNode = null;
  }

  async function initEditor() {
    if (isUnmounted || !monacoContainer.value) return;

    disposeEditor();

    const monaco = await getMonaco();
    if (isUnmounted || !monacoContainer.value) return;

    monacoApi = monaco;

    try {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        allowComments: false,
        schemas: [],
        enableSchemaRequest: true,
      });
    } catch (e) {
      console.log('monaco-editor 初始化失败', e);
    }

    const { editorHeight, editorWidth } = getEditorDimensions();

    monacoEditor = monaco.editor.create(monacoContainer.value, {
      dimension: {
        width: editorWidth,
        height: editorHeight,
      },
      scrollBeyondLastLine: false,
      minimap: { enabled: true },
      folding: true,
      scrollbar: {},
      value: props.value ?? '',
      language: 'json',
      theme: 'vs-light',
      fontSize: 14,
      lineHeight: 20,
      renderValidationDecorations: 'on',
      formatOnType: true,
      formatOnPaste: true,
    });

    Object.entries(monacoStyles).forEach(([key, value]) => {
      monacoContainer.value?.style.setProperty(key, value);
    });

    const model = monacoEditor.getModel();
    if (model) {
      monaco.editor.setModelMarkers(model, 'json', []);
    }

    createPlaceholderWidget(monaco);
    if ((props.value ?? '') === '') {
      monacoEditor.addOverlayWidget(placeholderWidget!);
    }

    contentChangeDisposable = monacoEditor.onDidChangeModelContent(() => {
      if (!monacoEditor) return;

      const value = monacoEditor.getValue();
      const contentModel = monacoEditor.getModel();
      const length = contentModel?.getLineCount() ?? 0;

      updatePlaceholderVisibility(value);
      validateJson(value);

      if (props.attrThreshold && props.attrThreshold > 0 && length > props.attrThreshold) {
        debouncedCheckJsonLength(value);
      }

      emit('update:value', value);
      emit('change', {
        newValue: value,
        oldValue: props.value ?? '',
      });
    });
  }

  async function loadMonacoEditor() {
    if (isUnmounted) return;
    await initEditor();
  }

  watch(
    () => props.value,
    (newValue) => {
      if (!monacoEditor || isApplyingExternalValue) return;
      const currentValue = monacoEditor.getValue();
      const nextValue = newValue ?? '';
      if (nextValue === currentValue) return;

      isApplyingExternalValue = true;
      monacoEditor.setValue(nextValue);
      updatePlaceholderVisibility(nextValue);
      validateJson(nextValue);
      isApplyingExternalValue = false;
    },
  );

  watch(hasError, () => {
    emit('error', errorMessage.value);
  });

  onMounted(() => {
    isUnmounted = false;
    nextTick(() => {
      loadMonacoEditor();
    });
  });

  onUnmounted(() => {
    isUnmounted = true;
    disposeEditor();
  });

  return {
    hasError,
    loadMonacoEditor,
  };
}
