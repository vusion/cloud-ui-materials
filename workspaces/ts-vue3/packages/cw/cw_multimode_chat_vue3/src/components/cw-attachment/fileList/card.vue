<template>
  <div :class="[$style.root]">
    <div :class="[isImgPreview ? $style.imgPreview : $style.overview]">
      <template v-if="isImgPreview">
        <div :class="$style.imgwrap">
          <img :src="previewUrl" alt="" />
          <div v-if="status === 'uploading' || status === 'error'" :class="$style.mask">
            <InfoCircleOutlined v-if="status === 'error'" />
            <CwProgress
              v-if="status === 'uploading'"
              :percent="getPercent(item.percent)"
              :format="formatPercent"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div :class="$style.icon">
          <template v-if="iconState.icon === 'video-icon'">
            <CwVideoIcon :style="{ color: iconState.iconColor }" />
          </template>
          <template v-else-if="iconState.icon === 'audio-icon'">
            <CwAudioIcon :style="{ color: iconState.iconColor }" />
          </template>
          <template v-else-if="iconState.icon === 'file-image'">
            <img :src="ImageDemoIcon" style="width: 40px" alt="" />
          </template>
          <component
            :is="iconState.iconComp"
            v-else
            :style="{ color: iconState.iconColor, fontSize: '24px' }"
          />
        </div>
        <div :class="$style.content">
          <div :class="$style.name">
            <div :class="$style.prefix">{{ nameState.namePrefix ?? EMPTY }}</div>
            <div :class="$style.suffix">{{ nameState.nameSuffix }}</div>
            <div></div>
          </div>
          <div
            :class="[$style.desc, status === 'error' ? $style.descerror : '']"
            :title="status === 'error' ? desc : ''"
          >
            {{ desc }}
          </div>
        </div>
      </template>
      <button v-if="!readonly" :class="$style.remove" :disabled="disabled" @click="onRemove">
        <CloseCircleFilled />
      </button>
    </div>
    <div
      v-if="status === 'uploading' && !isImgPreview"
      :class="$style.loadingmask"
      :style="{ width: `${getPercent(item.percent)}%` }"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  CloseCircleFilled,
  FileExcelFilled,
  FileMarkdownFilled,
  FilePdfFilled,
  FilePptFilled,
  FileTextFilled,
  FileWordFilled,
  FileZipFilled,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
import { previewImage } from '../util.ts';
import AudioIcon from './audioIcon.vue';
import VideoIcon from './videoIcon.vue';
import CwProcess from '../progress.vue';
import ImageDemoIcon from '../assets/imgdemo.svg';

const DEFAULT_ICON_COLOR = '#8c8c8c';
const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];
const EMPTY = '\u00A0';

const PRESET_FILE_ICONS: {
  icon: string;
  iconComp?: object;
  color: string;
  ext: string[];
}[] = [
  { icon: 'file-excel', iconComp: FileExcelFilled, color: '#22b35e', ext: ['xlsx', 'xls'] },
  { icon: 'file-image', color: DEFAULT_ICON_COLOR, ext: IMG_EXTS },
  { icon: 'file-markdown', iconComp: FileMarkdownFilled, color: DEFAULT_ICON_COLOR, ext: ['md', 'mdx'] },
  { icon: 'file-pdf', iconComp: FilePdfFilled, color: '#ff4d4f', ext: ['pdf'] },
  { icon: 'file-ppt', iconComp: FilePptFilled, color: '#ff6e31', ext: ['ppt', 'pptx'] },
  { icon: 'file-word', iconComp: FileWordFilled, color: '#1677ff', ext: ['doc', 'docx'] },
  { icon: 'file-zip', iconComp: FileZipFilled, color: '#fab714', ext: ['zip', 'rar', '7z', 'tar', 'gz'] },
  { icon: 'video-icon', color: '#ff4d4f', ext: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'] },
  { icon: 'audio-icon', color: '#8c8c8c', ext: ['mp3', 'wav', 'flac', 'ape', 'aac', 'ogg'] },
];

export default {
  name: 'cw-filelist-card',
  components: {
    InfoCircleOutlined,
    CloseCircleFilled,
    CwProgress: CwProcess,
    CwVideoIcon: VideoIcon,
    CwAudioIcon: AudioIcon,
  },
  props: {
    item: {
      type: Object,
      default: () => ({
        name: '',
        size: 0,
        status: 'done',
        percent: 0,
        description: '',
        thumbUrl: '',
        url: '',
        originFileObj: null,
      }),
    },
    imgPreview: { type: Boolean, default: true },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      EMPTY,
      previewImgUrl: undefined as string | undefined,
      ImageDemoIcon,
    };
  },
  computed: {
    nameState() {
      const item = this.item as { name?: string };
      const nameStr = item.name || '';
      const match = nameStr.match(/^(.*)\.[^.]+$/);
      return {
        namePrefix: match ? match[1] : nameStr,
        nameSuffix: match ? nameStr.slice(match[1].length) : '',
      };
    },
    status() {
      return (this.item as { status?: string }).status || 'success';
    },
    isImg() {
      return this.matchExt(this.nameState?.nameSuffix, IMG_EXTS);
    },
    iconState() {
      if (!this.nameState) return { icon: '', iconComp: FileTextFilled, iconColor: DEFAULT_ICON_COLOR };
      for (const row of PRESET_FILE_ICONS) {
        if (this.matchExt(this.nameState.nameSuffix, row.ext)) {
          return {
            icon: row.icon,
            iconComp: row.iconComp || FileTextFilled,
            iconColor: row.color,
          };
        }
      }
      return {
        icon: 'file-text',
        iconComp: FileTextFilled,
        iconColor: DEFAULT_ICON_COLOR,
      };
    },
    isImgPreview() {
      return this.imgPreview && this.isImg;
    },
    previewUrl() {
      const item = this.item as { thumbUrl?: string; url?: string };
      return item.thumbUrl || item.url || this.previewImgUrl;
    },
    desc() {
      const item = this.item as { status?: string; error?: string; size?: number };
      if (item.status === 'uploading') {
        return `上传中...${this.getPercent(item.percent ?? 0)}%`;
      }
      if (item.status === 'error') {
        return item.error ? '上传失败：' + item.error : '上传失败';
      }
      return item.size ? this.getSize(item.size) : '';
    },
  },
  watch: {
    'item.originFileObj': {
      immediate: true,
      handler() {
        const item = this.item as { originFileObj?: Blob };
        if (item.originFileObj) {
          let synced = true;
          previewImage(item.originFileObj).then((url) => {
            if (synced) {
              this.previewImgUrl = url;
              synced = false;
            }
          });
        } else {
          this.previewImgUrl = undefined;
        }
      },
    },
  },
  methods: {
    matchExt(suffix: string, ext: string[]) {
      if (!suffix) return false;
      return ext.some((e) => suffix.toLowerCase() === `.${e}`);
    },
    getSize(size: number) {
      let retSize = size;
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
      let unitIndex = 0;
      while (retSize >= 1024 && unitIndex < units.length - 1) {
        retSize /= 1024;
        unitIndex++;
      }
      return `${retSize.toFixed(0)} ${units[unitIndex]}`;
    },
    onRemove() {
      if (this.disabled || this.readonly) return;
      this.$emit('remove', this.item);
    },
    getPercent(percent: number | undefined) {
      return Number((percent ?? 0).toFixed(2));
    },
    formatPercent(percent: number) {
      const p = percent === 100 ? 100 : percent;
      return p === 100 ? '' : `${p.toFixed(0)}%`;
    },
  },
};
</script>

<style module>
:root {
  --cw-filelist-card-background-color: #f2f3f5;
  --cw-filelist-card-content-name-color: #111;
  --cw-filelist-card-content-desc-color: #999;
  --cw-filelist-card-content-desc-color-error: #f24957;
  --cw-filelist-card-loading-background-color: #000;
}
.root {
  border-radius: 8px;
  position: relative;
  background-color: var(--cw-filelist-card-background-color);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  font-size: 12px;
}
.overview {
  padding: 4px 8px;
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  align-items: center;
}
.overview .icon {
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.imgPreview .imgwrap {
  width: 54px;
  height: 54px;
  border-radius: 8px;
  overflow: hidden;
}
.imgPreview .imgwrap img {
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
}
.remove {
  position: absolute;
  top: 3px;
  inset-inline-end: 0;
  border: 0;
  padding: 4px;
  background: transparent;
  line-height: 1;
  transform: translate(50%, -50%);
  font-size: 14px;
  cursor: pointer;
  opacity: 0.5;
}
.root:hover .remove {
  display: block;
}
.root:hover .remove:hover {
  opacity: 0.8;
}
.content {
  flex: auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.content .name {
  color: var(--cw-filelist-card-content-name-color);
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  font-size: 14px;
}
.content .name .prefix {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .name .suffix {
  flex: none;
}
.content .desc {
  color: var(--cw-filelist-card-content-desc-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .descerror {
  color: var(--cw-filelist-card-content-desc-color-error);
}
.mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.mask :global(.ant-progress-text) {
  color: white !important;
}
.loadingmask {
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  height: 100%;
}
</style>
