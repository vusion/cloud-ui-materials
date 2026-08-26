<template>
  <div :class="[$style.root, !readOnly && $style.border]" ref="rootRef">
    <Toolbar
      ref="toolbarRef"
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :default-config="toolbarConfig"
      :mode="mode"
      v-show="!readOnly"
    />
    <div v-viewer="{ movable: false, zIndex: 8000 }" style="position: relative">
      <Editor
        ref="editorRef"
        :style="rootStyle"
        v-model="currentValue"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
        @onFocus="onFocus"
        @onBlur="onBlur"
        @customPaste="customPaste"
      />
      <button
        type="button"
        @click="docxParse()"
        :style="{
          position: 'absolute',
          bottom: '4px',
          right: '4px',
          color: '#337ae5',
          display: showDocxButton ? 'block' : 'none',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '12px',
        }"
      >
        上传并解析docx
      </button>
    </div>
    <input type="file" :value="fileInputValue" accept=".docx" style="display: none" ref="docxInputRef" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import type { IDomEditor } from '@wangeditor-next/editor';
import { SlateTransforms } from '@wangeditor-next/editor';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue';
import '@wangeditor-next/editor/dist/css/style.css';
import 'viewerjs/dist/viewer.css';
import { FilterXSS } from 'xss';
import { saveAs } from 'file-saver';
import { Document, Packer } from 'docx';
import JSZip from 'jszip';
import whiteListOption from '../../utils/whiteListTag';
import { imageTypes, videoTypes } from './constant';
import { processHTML } from './processHTML';
import { parser } from './slateToDocx';
import { parser as docxParser } from './docxToSlate';
import { useMField } from './useMField';

const myxss = new FilterXSS({ whiteList: whiteListOption });

const props = withDefaults(
  defineProps<{
    value?: string;
    readOnly?: boolean;
    scroll?: boolean;
    placeholder?: string;
    editorStyle?: string;
    uploadImgServer?: string;
    accept?: string;
    acceptVideo?: string;
    showDocxButton?: boolean;
    urlField?: string;
    viaOriginURL?: boolean;
  }>(),
  {
    value: '',
    readOnly: false,
    scroll: true,
    placeholder: '',
    editorStyle: '',
    uploadImgServer: '',
    accept: '.png,.jpg,.jpeg,.webp',
    acceptVideo: '.mp4,.avi,.mov,.wmv,.mkv,.flv,.mpeg,.rmvb,.3gp,.webm',
    showDocxButton: false,
    urlField: 'filePath',
    viaOriginURL: true,
  },
);

const emit = defineEmits<{
  'update:value': [value: string];
  change: [payload: { value: string; editor: IDomEditor }];
  'upload-fail': [payload: { value: string }];
  input: [value: string];
  focus: [payload: { value: string; editor: IDomEditor }];
  blur: [payload: { value: string; editor: IDomEditor }];
}>();

const { forwardToValidator } = useMField();

const rootRef = ref<HTMLElement | null>(null);
const toolbarRef = ref<InstanceType<typeof Toolbar> | null>(null);
const editorRef = ref<InstanceType<typeof Editor> | null>(null);
const docxInputRef = ref<HTMLInputElement | null>(null);
const fileInputValue = ref<string | null>(null);

const currentValue = ref(myxss.process(props.value ?? ''));
const editor = shallowRef<IDomEditor | null>(null);
const mode = 'default';
const toolbarConfig = {
  excludeKeys: ['fullScreen', 'codeBlock', 'insertImage'],
};
const defaultHeight = ref('');
const editorHeight = ref<Record<string, string | null>>({
  height: props.scroll ? '180px' : null,
  'min-height': props.scroll ? null : '180px',
});

const acceptList = computed(() => props.accept.split(','));
const acceptEditorList = computed(() =>
  props.accept.split(',').map((item) => `image/${item.substring(1, item.length)}`),
);
const acceptVideoList = computed(() => props.acceptVideo.split(','));
const acceptVideoEditorList = computed(() =>
  props.acceptVideo.split(',').map((item) => `video/${item.substring(1, item.length)}`),
);

function getBasePath() {
  return (window as any).appInfo?.basePath ?? '';
}

function getCookie(cname: string) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

function parseStyleAttr(styleStr: string) {
  return styleStr.split(/;/gim).reduce<Record<string, string>>((obj, item) => {
    const arrs = item.trim().split(/:/gim);
    if (arrs.length > 1) {
      obj[arrs[0].trim()] = arrs[1].trim();
    }
    return obj;
  }, {});
}

function removePX(str: string) {
  return str.substring(0, str.length - 2);
}

const rootStyle = computed(() => ({
  ...editorHeight.value,
  ...parseStyleAttr(props.editorStyle),
}));

const editorConfig = computed(() => {
  const authorization = getCookie('authorization');
  const headers = authorization ? { Authorization: authorization } : {};
  const MENU_CONF: Record<string, unknown> = {};

  Object.assign(
    MENU_CONF,
    {
      uploadImage: props.accept
        ? {
            server: props.uploadImgServer || `${getBasePath()}/gateway/lowcode/api/v1/app/upload`,
            fieldName: 'file',
            maxFileSize: 50 * 1024 * 1024,
            headers,
            onBeforeUpload: (file: Record<string, { type: string }>) => {
              const type = Object.values(file)[0].type.split('/')[1];
              if (!acceptList.value.includes('.' + type) || !imageTypes.includes(type)) {
                emit('upload-fail', { value: `不支持上传${type}类型的图片文件` });
                return false;
              }
              return file;
            },
            customInsert: (res: Record<string, string>, insertFn: (url: string) => void) => {
              const url = res[props.urlField];
              const finalUrl =
                url && url.startsWith('/upload') ? `${getBasePath()}${url}` : url;
              insertFn(finalUrl);
            },
            meta: {
              viaOriginURL: props.viaOriginURL,
            },
            allowedFileTypes: acceptEditorList.value,
            disable: true,
          }
        : null,
    },
    {
      uploadVideo: {
        server: props.acceptVideo
          ? props.uploadImgServer || `${getBasePath()}/gateway/lowcode/api/v1/app/upload`
          : null,
        fieldName: 'file',
        maxFileSize: 1000 * 1024 * 1024,
        headers,
        onBeforeUpload: (file: Record<string, { type: string }>) => {
          const type = Object.values(file)[0].type.split('/')[1];
          if (!acceptVideoList.value.includes('.' + type) || !videoTypes.includes(type)) {
            emit('upload-fail', { value: `不支持上传${type}类型的视频文件` });
            return false;
          }
        },
        customInsert(res: Record<string, string>, insertFn: (url: string) => void) {
          const url = res.filePath;
          const finalUrl = url && url.startsWith('/upload') ? `${getBasePath()}${url}` : url;
          insertFn(finalUrl);
        },
        meta: {
          viaOriginURL: props.viaOriginURL,
        },
        allowedFileTypes: acceptVideoEditorList.value,
      },
    },
  );

  return {
    readOnly: props.readOnly,
    scroll: props.scroll,
    placeholder: props.placeholder,
    autoFocus: false,
    MENU_CONF,
  };
});

watch(
  () => props.readOnly,
  (val) => {
    if (!editor.value) return;
    val ? editor.value.disable() : editor.value.enable();
  },
);

watch(
  () => props.value,
  (value) => {
    if (value !== currentValue.value) {
      currentValue.value = myxss.process(value ?? '');
    }
  },
);

watch(currentValue, (value) => {
  emit('update:value', value);
  forwardToValidator('update', value);
});

async function customUplodeForPasteImage(dataURL: string | Blob) {
  let blob: Blob | string = dataURL;
  if (typeof dataURL === 'string') {
    const [typeStr, baseStr] = dataURL.split(';');
    const type = typeStr.split(':')[1];
    const base64 = baseStr.split(',')[1];
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    blob = new Blob([byteArray], { type });
  }

  const formData = new FormData();
  formData.append('file', blob as Blob);

  const authorization = getCookie('authorization');
  const headers = authorization ? { Authorization: authorization } : {};

  const url = await fetch(
    props.uploadImgServer || `${getBasePath()}/gateway/lowcode/api/v1/app/upload`,
    {
      method: 'POST',
      headers,
      body: formData,
    },
  )
    .then((res) => res.json())
    .then((v) => v.filePath)
    .catch(() => '');

  const finalUrl = url && url.startsWith('/upload') ? `${getBasePath()}${url}` : url;
  return finalUrl;
}

async function docxParse(file?: File) {
  if (!file) {
    file = await new Promise<File | null>((res) => {
      const fileInput = docxInputRef.value;
      if (!fileInput) {
        res(null);
        return;
      }
      const fn = (e: Event) => {
        fileInput.removeEventListener('input', fn);
        fileInput.removeEventListener('cancel', cancelFn);
        const target = e.target as HTMLInputElement;
        res(target.files?.[0] ?? null);
        target.value = '';
      };
      const cancelFn = () => {
        res(null);
        fileInput.removeEventListener('input', fn);
        fileInput.removeEventListener('cancel', cancelFn);
      };
      fileInput.addEventListener('cancel', cancelFn);
      fileInput.addEventListener('input', fn);
      fileInput.click();
    });
  }
  if (!file || !editor.value) return;

  const nodes = await docxParser(file, customUplodeForPasteImage);
  SlateTransforms.insertNodes(editor.value, nodes, {
    at: [editor.value.children.length],
  });
  return nodes;
}

async function exportToBlob(result: { value?: Blob } = {}) {
  if (!editor.value) return;
  const children = editor.value.children;
  const tmp = children.map((n) => parser(n, editor.value!));
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: tmp,
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  result.value = blob;
  return blob;
}

async function exportToDocx(filename?: string) {
  const blob = await exportToBlob();
  if (blob) {
    await saveAs(blob, filename || 'example.docx');
  }
}

async function exportToDocxXml(result: { value?: string } = {}) {
  const blob = await exportToBlob();
  if (!blob) return;
  const zip = await JSZip.loadAsync(blob);
  const str = await zip.file('word/document.xml')?.async('string');
  if (!str) return;
  const domparser = new DOMParser();
  const xml = domparser.parseFromString(str, 'text/xml');
  const serializer = new XMLSerializer();
  const xmlstr = Array.from(xml.children[0].children[0].children)
    .map(serializer.serializeToString.bind(serializer))
    .join('');
  result.value = xmlstr;
  return xmlstr;
}

function cancel() {}

function customPaste(ed: IDomEditor, event: ClipboardEvent) {
  const fragment = event.clipboardData?.getData('application/x-slate-fragment');
  if (fragment) return true;
  const html = event.clipboardData?.getData('text/html');
  if (html) {
    processHTML(html, async (x) => customUplodeForPasteImage(x)).then((domBody) => {
      const str = new XMLSerializer().serializeToString(domBody);
      ed.dangerouslyInsertHtml(str);
    });
    event.preventDefault();
    return false;
  }
  return true;
}

function setHeight() {
  const textareaNode = editorRef.value?.$el?.querySelector('[data-slate-editor]') as HTMLElement | null;
  if (!textareaNode) return;
  const currentheight = textareaNode.getBoundingClientRect().height;
  const height = editorHeight.value.height || '';
  if (height && currentheight > Number(removePX(height))) {
    editorHeight.value['min-height'] = editorHeight.value.height;
    editorHeight.value.height = null;
  } else if (currentheight <= Number(removePX(defaultHeight.value))) {
    editorHeight.value.height = defaultHeight.value;
  }
}

function onCreated(ed: IDomEditor) {
  editor.value = Object.seal(ed) as IDomEditor;
  const root = rootRef.value;
  if (!root) return;
  let height = root.style.height;
  setTimeout(() => {
    if (height) {
      const toolbarEl = (toolbarRef.value as any)?.$el as HTMLElement | undefined;
      const toolHeight = toolbarEl?.getBoundingClientRect().height ?? 0;
      height = removePX(height);
      editorHeight.value.height = `${Number(height) - toolHeight - 2}px`;
      if (!(window as any).$uilibenv?.IDE_DESIGNER) {
        root.style.removeProperty('height');
      }
    }
    defaultHeight.value = editorHeight.value.height || '';
    if (!props.scroll) {
      setHeight();
    }
  });
}

function onChange(ed: IDomEditor) {
  if (!props.scroll) {
    setHeight();
  }
  if (ed.isEmpty() && !currentValue.value && (currentValue.value as unknown) !== 0) return;
  const value = ed.isEmpty() ? '' : ed.getHtml();
  const processed = myxss.process(value);
  emit('change', { value: processed, editor: ed });
  emit('input', processed);
  forwardToValidator('input', processed);
  forwardToValidator('change', { value: processed, editor: ed });
}

function onFocus(ed: IDomEditor) {
  emit('focus', { value: currentValue.value, editor: ed });
  forwardToValidator('focus');
  if (!props.accept) {
    setTimeout(() => {
      rootRef.value
        ?.querySelector('[data-menu-key="group-image"]')
        ?.parentElement?.classList.add('no-accept-disabled');
    });
  }
  if (!props.acceptVideo) {
    setTimeout(() => {
      rootRef.value
        ?.querySelector('[data-menu-key="group-video"]')
        ?.parentElement?.classList.add('no-accept-disabled');
    });
  }
}

function onBlur(ed: IDomEditor) {
  emit('blur', { value: currentValue.value, editor: ed });
  forwardToValidator('blur');
}

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
    editor.value = null;
  }
});

defineExpose({
  cancel,
  exportToBlob,
  exportToDocx,
  exportToDocxXml,
  docxParse,
  editor,
});
</script>

<style module>
.root {
  z-index: 1000;
}

.border {
  border: 1px solid #ccc;
}
</style>

<style>
.w-e-text-container img {
  min-height: unset !important;
  min-width: unset !important;
  display: block;
  height: fit-content;
  width: fit-content;
}
.w-e-image-container {
  max-width: 100%;
}
.w-e-textarea-video-container {
  max-width: 100%;
}
.w-e-text-container video,
.w-e-image-container video,
.w-e-textarea-video-container video,
.w-e-text-container iframe {
  max-width: 100% !important;
  height: auto !important;
  display: block;
  object-fit: contain;
}

.no-accept-disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.no-accept-disabled svg {
  fill: var(--w-e-toolbar-disabled-color) !important;
}
.w-e-text-container [data-slate-editor] {
  word-break: break-word;
}
</style>
