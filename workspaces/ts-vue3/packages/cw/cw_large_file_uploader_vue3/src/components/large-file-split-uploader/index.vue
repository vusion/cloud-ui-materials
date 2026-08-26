<template>
  <div :class="$style.root" :display="display">
    <div
      v-if="draggable && (!readonly || isDesigner)"
      :class="$style.draggable"
      :dragover="dragover"
      :tabindex="readonly || disabled ? undefined : 0"
      @click="select()"
      @drop.prevent="onDrop"
      @paste="onPaste"
      @dragover.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
    >
      <input
        ref="fileRef"
        type="file"
        :name="name"
        :class="$style.file"
        :accept="accept"
        :readonly="readonly"
        :disabled="!!uploadingCount || disabled"
        :multiple="multiple"
        @click.stop
        @change="onChange"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.5349 9.44679L18.3493 8.59993C17.7098 5.6824 15.108 3.49951 12 3.49951C8.89196 3.49951 6.29024 5.6824 5.65073 8.59993L5.4651 9.44679L4.63864 9.70869C2.81715 10.2859 1.5 11.9908 1.5 13.9995C1.5 16.4848 3.51472 18.4995 6 18.4995H8V19.9995H6C2.68629 19.9995 0 17.3132 0 13.9995C0 11.3183 1.75873 9.04778 4.18552 8.27876C4.97271 4.68751 8.17245 1.99951 12 1.99951C15.8276 1.99951 19.0273 4.68751 19.8145 8.27876C22.2413 9.04778 24 11.3183 24 13.9995C24 17.3132 21.3137 19.9995 18 19.9995H16V18.4995H18C20.4853 18.4995 22.5 16.4848 22.5 13.9995C22.5 11.9908 21.1829 10.2859 19.3614 9.70869L18.5349 9.44679Z"
          fill="#CCCCCC"
        />
        <path
          d="M12.75 12.3101V19.9995H11.25V12.3103L8.78771 14.7726L7.72705 13.7119L11.9697 9.46927L12 9.49958L12.0304 9.46916L16.2731 13.7118L15.2124 14.7725L12.75 12.3101Z"
          fill="#CCCCCC"
        />
      </svg>

      <div v-if="dragDescription" :class="$style.dragDescription">
        <span>{{ dragDescription }}</span>
      </div>
    </div>
    <div
      v-else
      :class="$style.select"
      @click="select()"
      vusion-slot-name="default"
      :vusion-empty-background="isDesigner && !slots.default ? 'add-any' : false"
    >
      <input
        ref="fileRef"
        type="file"
        :name="name"
        :class="$style.file"
        :accept="accept"
        :readonly="readonly"
        :disabled="!!uploadingCount || disabled"
        :multiple="multiple"
        @click.stop
        @change="onChange"
      />
      <SlotWithButtonState />
    </div>
    <template>
      <div v-if="description" :class="$style.description">
        {{ description }}
      </div>
      <div
        v-if="showErrorMessage && errorMessage && errorMessage.length"
        :class="$style.errwrap"
      >
        <div
          v-for="errItem in errorMessage"
          :key="errItem"
          :class="$style.errmessage"
        >
          {{ errItem }}
        </div>
      </div>
    </template>
    <div
      v-if="
        !isDesigner &&
        currentValue &&
        (currentValue.url ||
          currentValue.showProgress ||
          (currentValue.length && currentValue[0].url) ||
          (currentValue.length && currentValue[0].showProgress))
      "
      :class="$style.list"
    >
      <div
        v-for="(item, index) in currentValue.length ? currentValue : [currentValue]"
        :key="item.uid ?? index"
        :class="$style.item"
      >
        <a
          v-if="!item.showProgress"
          :class="$style.link"
          :href="item.url"
          download
          >{{ item.name }}</a
        >
        <LinearProgress
          v-if="item.showProgress"
          :class="$style.progress"
          :percent="item.percent"
        />
        <svg
          v-else-if="!readonly && !disabled"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          :class="$style.remove"
          @click="remove(index)"
        >
          <path
            d="M478.016 352.704v445.952H545.92V352.704H478.08zM318.912 798.72V352.64h68.032v445.952H318.912zM638.528 352.704v445.952h67.968V352.704H638.528z"
          />
          <path
            d="M452.032 64c-56.32 0-102.016 45.44-102.016 101.568v25.856H64V259.2h94.016v599.296A101.76 101.76 0 0 0 259.968 960h504c56.32 0 102.016-45.44 102.016-101.568V259.2H960V191.36h-286.016v-25.856A101.76 101.76 0 0 0 572.032 64H452.032z m153.984 127.424H417.92v-25.856a33.92 33.92 0 0 1 34.048-33.92h120a33.92 33.92 0 0 1 33.92 33.92v25.856zM225.92 858.432V259.2h572.032v599.296a33.92 33.92 0 0 1-33.984 33.92H259.904a33.92 33.92 0 0 1-33.92-33.92z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  cloneVNode,
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  useSlots,
  watch,
} from 'vue';
import ajax from './ajax';
import LinearProgress from './LinearProgress.vue';
import { useMField } from './useMField';

interface FileItem {
  uid?: number;
  status?: string;
  name?: string;
  size?: number;
  percent?: number;
  showProgress?: boolean;
  url?: string;
  response?: unknown;
  length?: never;
}

type CurrentValue = FileItem | FileItem[];

const props = withDefaults(
  defineProps<{
    value?: string | Record<string, unknown>;
    url: string;
    name?: string;
    accept?: string;
    headers?: Record<string, string | null>;
    withCredentials?: boolean;
    multiple?: boolean;
    data?: Record<string, unknown>;
    urlField?: string;
    draggable?: boolean;
    pastable?: boolean;
    converter?: string;
    readonly?: boolean;
    disabled?: boolean;
    dragDescription?: string;
    description?: string;
    showErrorMessage?: boolean;
    authorization?: boolean;
    access?: string | null;
    viaOriginURL?: boolean;
    display?: string;
  }>(),
  {
    name: 'file',
    headers: () => ({}),
    withCredentials: false,
    multiple: false,
    urlField: 'url',
    draggable: false,
    pastable: false,
    readonly: false,
    disabled: false,
    dragDescription: '点击/拖动/粘贴文件到这里',
    showErrorMessage: true,
    authorization: true,
    access: null,
    viaOriginURL: false,
    display: 'block',
  },
);

const emit = defineEmits<{
  (e: 'input', value: string | null): void;
  (e: 'update:value', value: string | null): void;
  (e: 'change', payload: { value: string | null; oldValue: string | null }, sender?: unknown): void;
  (e: 'before-upload', payload: unknown, sender?: unknown): void;
  (e: 'progress', payload: unknown, sender?: unknown): void;
  (e: 'success', payload: unknown, sender?: unknown): void;
  (e: 'error', payload: unknown, sender?: unknown): void;
  (e: 'before-remove', payload: unknown, sender?: unknown): void;
  (e: 'remove', payload: unknown, sender?: unknown): void;
}>();

const slots = useSlots();
useMField();
const vm = getCurrentInstance()?.proxy;
const fileRef = ref<HTMLInputElement | null>(null);
const dragover = ref(false);
const errorMessage = ref<string[]>([]);
const uploadingCount = ref(0);

const isDesigner = computed(
  () => (window as { $uilibenv?: { IDE_DESIGNER?: boolean } }).$uilibenv?.IDE_DESIGNER === true,
);

function fromValue(value: string | Record<string, unknown> | undefined): CurrentValue {
  if (isDesigner.value) {
    return props.multiple ? [{}] : {};
  }
  if (props.converter === 'json') {
    if (props.multiple) {
      return JSON.parse((value as string) || '[{}]');
    }
    return JSON.parse((value as string) || '{}');
  }
  if (!value) {
    return props.multiple ? [{}] : {};
  }
  return props.multiple
    ? [{ url: value as string, name: handleFileName(value as string) }]
    : { url: value as string, name: handleFileName(value as string) };
}

function toValue(value: CurrentValue): string | null {
  if (props.converter === 'json') {
    return value ? JSON.stringify(value) : null;
  }
  const item = Array.isArray(value) ? value[0] : value;
  return item?.url || null;
}

const currentValue = ref<CurrentValue>(fromValue(props.value));

watch(
  () => props.value,
  (value) => {
    currentValue.value = fromValue(value);
  },
);

watch(
  currentValue,
  (val, oldVal) => {
    const value = toValue(val);
    emit('input', value);
    console.log('input', value);
    emit('update:value', value);
    console.log('update:value', value);
    const changePayload = {
      value,
      oldValue: toValue(oldVal),
    };
    emit('change', changePayload, vm);
    console.log('change', changePayload);
  },
);

const SlotWithButtonState = defineComponent({
  setup() {
    return () => {
      const vnodes = slots.default?.() ?? [];
      const shouldInjectButtonState =
        !props.draggable && !props.pastable && uploadingCount.value > 0;
      return vnodes.map((vnode) => {
        if (shouldInjectButtonState && vnode.props?.flag === 'large-file-uploader-button') {
          return cloneVNode(vnode, {
            loading: shouldInjectButtonState,
            disabled: shouldInjectButtonState,
          });
        }
        return vnode;
      });
    };
  },
});

function emitPrevent(name: string, payload: unknown): boolean {
  let cancel = false;
  emit(name as 'before-upload', Object.assign((payload as object) || {}, {
    preventDefault: () => {
      cancel = true;
    },
  }), vm);
  return cancel;
}

function onDrop(e: DragEvent) {
  dragover.value = false;
  if (props.readonly || props.disabled) return;
  const file = e.dataTransfer?.files[0];
  if (file) upload(file);
}

function onPaste(e: ClipboardEvent) {
  if (props.readonly || props.disabled) return;
  if (props.pastable) {
    const file = e.clipboardData?.files[0];
    if (file) upload(file);
  }
}

function select() {
  if (props.disabled || uploadingCount.value > 0 || props.readonly) return;
  if (fileRef.value) {
    fileRef.value.value = '';
    fileRef.value.click();
  }
}

function onChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files || files.length === 0) return;
  upload(files);
}

function normalizeFiles(files: FileList | File): File[] {
  if (files instanceof FileList) {
    return Array.from(files);
  }
  return [files];
}

async function upload(files: FileList | File) {
  const fileArray = normalizeFiles(files);
  if (
    emitPrevent(
      'before-upload',
      props.multiple
        ? fileArray
        : {
            file: fileArray[0],
          },
    )
  ) {
    return null;
  }
  uploadingCount.value = props.multiple ? fileArray.length : 1;
  errorMessage.value = [];
  console.log(
    'before-upload',
    props.multiple
      ? fileArray
      : {
          file: fileArray[0],
        },
  );
  currentValue.value = props.multiple
    ? fileArray.map((file) => ({
        uid: (file as File & { uid?: number }).uid ? (file as File & { uid?: number }).uid : Date.now(),
        status: 'uploading',
        name: file.name,
        size: file.size,
        percent: 0,
        showProgress: true,
      }))
    : {
        uid: (fileArray[0] as File & { uid?: number }).uid
          ? (fileArray[0] as File & { uid?: number }).uid
          : Date.now(),
        status: 'uploading',
        name: fileArray[0].name,
        size: fileArray[0].size,
        percent: 0,
        showProgress: true,
      };

  if (props.multiple) {
    for (const file of fileArray) {
      await uploadChunk(file);
    }
  } else {
    uploadChunk(fileArray[0]);
  }
  return null;
}

async function uploadChunk(file: File) {
  const chunkSize = 40 * 1024 * 1024;
  const minLastChunkSize = 5 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / chunkSize);
  let start = 0;
  const chunks: Blob[] = [];
  for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
    let chunk: Blob;
    if (chunkNumber === totalChunks - 1) {
      if (file.size - start < minLastChunkSize && totalChunks > 1) {
        chunk = file.slice(start - chunkSize, file.size);
        chunks.pop();
        chunks.push(chunk);
      } else {
        chunk = file.slice(start, file.size);
        chunks.push(chunk);
      }
    } else {
      chunk = file.slice(start, start + chunkSize);
      chunks.push(chunk);
    }
    start += chunkSize;
  }
  const fileName = `${new Date().getTime()}_${file.name}`;
  await postChunk(chunks, chunks.length, fileName);
  if (file.size > 5 * 1024 * 1024) {
    post(file, totalChunks, totalChunks, file.size, fileName, true);
  }
  uploadingCount.value--;
  return Promise.resolve();
}

async function postChunk(chunks: Blob[], totalChunks: number, fileName: string) {
  let chunkNumber = 1;
  for (const chunk of chunks) {
    try {
      await post(chunk, chunkNumber++, totalChunks, chunk.size, fileName);
    } catch (error) {
      console.error('异步函数执行失败:', error);
      return Promise.reject();
    }
  }
  return Promise.resolve();
}

function post(
  chunk: Blob | File,
  chunkNumber: number,
  totalChunks: number,
  totalSize: number,
  fileName: string,
  isMerge?: boolean,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const headersReq = Object.assign(
      {},
      props.headers,
      props.authorization && {
        Authorization: getCookie('authorization') || null,
      },
      props.access && {
        'lcap-access': props.access,
      },
      (window as { appInfo?: { domainName?: string } }).appInfo?.domainName && {
        DomainName: (window as { appInfo?: { domainName?: string } }).appInfo!.domainName,
      },
      isMerge && { operation: 'merge' },
    );
    const formData = {
      ...props.data,
      viaOriginURL: props.viaOriginURL,
      totalSize,
      fileName,
      chunkSize: chunk.size,
      currentChunkSize: chunk.size,
      file: isMerge ? new Blob() : chunk,
      chunkNumber,
      totalChunks,
    };
    const requestData = {
      url: '/split/upload',
      withCredentials: props.withCredentials,
      name: props.name,
      data: formData,
      headers: headersReq,
    };

    const cv = currentValue.value;
    let target: FileItem;
    if (props.multiple && Array.isArray(cv)) {
      target = cv.find((item) => fileName.endsWith(item.name || '')) || cv[0];
    } else {
      target = cv as FileItem;
    }
    const percent = target.percent || 0;
    const xhr = ajax({
      ...requestData,
      onProgress: (e) => {
        target.name = fileName;
        target.status = 'uploading';
        target.percent = parseInt(String(percent + (e.percent || 0) / (totalChunks + 1)), 10);
        target.showProgress = true;
        if (props.multiple && Array.isArray(currentValue.value)) {
          currentValue.value = [...currentValue.value];
        }
        const progressPayload = {
          e,
          file: chunk,
          item: target,
          xhr,
        };
        emit('progress', progressPayload, vm);
        console.log('progress', progressPayload);
      },
      onSuccess: (res) => {
        const result = res as { result?: string };
        if (isMerge || totalSize <= 5 * 1024 * 1024) {
          if (target.url) {
            target.name = handleFileName(target.url);
          }
          target.url = result.result;
          target.name = fileName;
          target.status = 'success';
          target.percent = 100;
          target.showProgress = false;
          target.response = res;
          if (props.multiple && Array.isArray(currentValue.value)) {
            currentValue.value = [...currentValue.value];
          }
          const value = toValue(currentValue.value);
          emit('input', value);
          console.log('input', value);
          emit('update:value', value);
          console.log('update:value', value);
          const successPayload = {
            res,
            file: chunk,
            item: target,
            xhr,
          };
          emit('success', successPayload, vm);
          console.log('success', successPayload);
        }
        resolve();
      },
      onError: (e) => {
        const cvItem = currentValue.value as FileItem;
        cvItem.status = 'error';
        cvItem.showProgress = false;
        const value = toValue(currentValue.value);
        emit('input', value);
        console.log('input', value);
        try {
          const errorMessageText = JSON.parse(e as string).Message;
          errorMessage.value.push(errorMessageText);
        } catch {
          errorMessage.value.push(String(e));
        }
        const errorPayload = {
          e,
          file: chunk,
          item: currentValue.value,
          xhr,
        };
        emit('error', errorPayload, vm);
        console.log('error', errorPayload);
        reject();
      },
    });
    if (!xhr) reject();
  });
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

function remove(index: number) {
  const cv = currentValue.value;
  const value = props.multiple && Array.isArray(cv) ? cv[index] : cv;
  const beforeRemovePayload = {
    oldValue: value,
    item: value,
  };
  emit('before-remove', beforeRemovePayload, vm);
  console.log('before-remove', beforeRemovePayload);
  if (props.multiple && Array.isArray(currentValue.value)) {
    currentValue.value.splice(index, 1);
  } else {
    currentValue.value = {};
  }
  let removeValue: unknown;
  if (props.converter === 'json') {
    removeValue = currentValue.value;
  } else {
    removeValue = JSON.stringify(currentValue.value);
  }
  const removePayload = {
    value: removeValue,
    item: removeValue,
  };
  emit('remove', removePayload, vm);
  console.log('remove', removePayload);
}

function handleFileName(url: string) {
  const match = url.match(/\/([^/]+)$/);
  return match ? match[1] : null;
}

defineExpose({ select });
</script>

<style module>
.root {
  display: block;
  position: relative;
}

.root[display='inline'] {
  display: inline-block;
  max-width: 100%;
}

.select {
  display: inline-block;
  position: relative;
}

.full {
  width: 100%;
}

.file {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}

.file[readonly],
.file[disabled] {
  display: none;
}

.item {
  cursor: default;
  margin-top: 8px;
  padding: 4px 8px;
  background: var(--el-fill-color-lighter);
  border-radius: var(--el-border-radius-base);
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
}

.thumb {
  display: inline-block;
  vertical-align: middle;
}

.img {
  max-width: 100%;
  max-height: 100%;
}

.list .thumb::before {
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  float: left;
  margin-right: 8px;
  background: url('./assets/attachment.svg') no-repeat center / contain;
}

.item + .item {
  margin-top: 4px;
}

.item:hover {
  background: var(--el-fill-color);
}

.link {
  color: var(--el-color-primary);
  cursor: pointer;
  width: calc(100% - 50px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

.item:hover .link {
  color: var(--el-color-primary-dark-2);
}

.link:hover {
  text-decoration: underline;
}

.remove {
  display: none;
  float: right;
  line-height: 1;
  font-size: 14px;
  margin-top: 4px;
  cursor: pointer;
  opacity: 0.5;
  margin-right: 5px;
}

.item:hover .remove {
  display: block;
}

.remove:hover {
  opacity: 1;
}

.buttons {
  position: absolute;
  font-size: var(--el-font-size-extra-small);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button {
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
}

.button + .button {
  margin-left: 8px;
}

.button:hover {
  color: white;
}

.button[role='download']::before {
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url('./assets/download.svg') no-repeat center / contain;
}

.button[role='remove']::before {
  content: '';
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url('./assets/trashcan.svg') no-repeat center / contain;
}

.draggable {
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  background: var(--el-fill-color-lighter);
  border: 1px dashed var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  padding: 20px;
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.draggable:focus,
.draggable:hover,
.draggable[dragover] {
  outline: none;
  border-color: var(--el-color-primary);
}

.draggable > svg {
  font-size: 24px;
  color: var(--el-text-color-placeholder);
  margin: 10px 0px;
}

.dragDescription {
  margin-bottom: 10px;
  color: var(--el-text-color-secondary);
}

.errwrap {
  max-height: 120px;
  padding: 0 5px 5px 0;
}

.errmessage {
  display: block;
  white-space: normal;
  color: #f24957;
  border-radius: var(--el-border-radius-base);
  min-width: 0;
  margin: 4px 0;
  font-size: 12px;
}

.errmessage::before {
  content: '';
  display: inline-block;
  height: 12px;
  width: 12px;
  margin-left: 1px;
  margin-right: 4px;
  vertical-align: middle;
  background: url('./assets/warning.svg') no-repeat center / contain;
}

.description {
  color: var(--el-text-color-secondary);
  margin: 4px 0;
  font-size: 12px;
}

.cardwrap .description,
.cardwrap .errmessage {
  margin-left: 8px;
}

.cardwrap .errwrap {
  max-width: 100%;
}
</style>
