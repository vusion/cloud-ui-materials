<template>
  <div :class="[$style.root]">
    <div :class="[isImgPreview ? $style.imgPreview : $style.overview]">
      <template v-if="isImgPreview">
        <div :class="$style.imgwrap">
          <img :src="previewUrl" />
          <div :class="$style.mask" v-if="status === 'uploading' || status === 'error'">
            <a-icon type="info-circle" v-if="status === 'error'" />
            <cw-progress :percent="getPercent(item.percent)" :format="formatPercent" v-if="status === 'uploading'"/>
          </div>
        </div>
      </template>
      <template v-else>
        <div :class="$style.icon">
          <template v-if="iconState.icon === 'video-icon'">
            <cw-video-icon :style="{ color: iconState.iconColor }"/>
          </template>
          <template v-else-if="iconState.icon === 'audio-icon'">
            <cw-audio-icon :style="{ color: iconState.iconColor }"/>
          </template>
          <template v-else-if="iconState.icon === 'file-image'">
            <img :src="ImageDemoIcon" style="width:40px;"/>
          </template>
          <a-icon v-else :type="iconState.icon" :style="{ color: iconState.iconColor }" theme="filled" />
        </div>
        <div :class="$style.content">
          <div :class="$style.name">
            <div :class="$style.prefix">{{ nameState.namePrefix ?? EMPTY }}</div>
            <div :class="$style.suffix">{{ nameState.nameSuffix }}</div>
            <div></div>
          </div>
          <div :class="[$style.desc,status === 'error'?$style.descerror:'']" :title="status === 'error'?desc: ''">{{ desc }}</div>
        </div>
      </template>
      <button :class="$style.remove" @click="onRemove" v-if="!readonly" :disabled="disabled">
        <a-icon type="close-circle" theme="filled"/>
      </button>
    </div>
    <div :class="$style.loadingmask" v-if="status === 'uploading' && !isImgPreview" :style="{width: `${getPercent(item.percent)}%`}"></div>
  </div>
</template>

<script>
import Icon from 'ant-design-vue/lib/icon';
import {previewImage} from '../util.ts';
const DEFAULT_ICON_COLOR = '#8c8c8c';
const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];
import AudioIcon from './audioIcon.vue';
import VideoIcon from './videoIcon.vue';
const EMPTY = '\u00A0';
import CwProcess from '../progress';
import ImageDemoIcon from '../assets/imgdemo.svg';


const PRESET_FILE_ICONS = [
  {
    icon: 'file-excel',
    color: '#22b35e',
    ext: ['xlsx', 'xls'],
  },
  {
    icon: 'file-image',
    color: DEFAULT_ICON_COLOR,
    ext: IMG_EXTS,
  },
  {
    icon: 'file-markdown',
    color: DEFAULT_ICON_COLOR,
    ext: ['md', 'mdx'],
  },
  {
    icon: 'file-pdf',
    color: '#ff4d4f',
    ext: ['pdf'],
  },
  {
    icon: 'file-ppt',
    color: '#ff6e31',
    ext: ['ppt', 'pptx'],
  },
  {
    icon: 'file-word',
    color: '#1677ff',
    ext: ['doc', 'docx'],
  },
  {
    icon: 'file-zip',
    color: '#fab714',
    ext: ['zip', 'rar', '7z', 'tar', 'gz'],
  },
    {
      icon: 'video-icon',
      color: '#ff4d4f',
      ext: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
    },
    {
      icon: 'audio-icon',
      color: '#8c8c8c',
      ext: ['mp3', 'wav', 'flac', 'ape', 'aac', 'ogg'],
    },
];
export default {
  name: 'cw-filelist-card',
  components: {
    'a-icon': Icon,
    'cw-progress': CwProcess,
    'cw-video-icon': VideoIcon,
    'cw-audio-icon': AudioIcon,
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
    imgPreview: { type: Boolean, default: true, },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      test: '',
      EMPTY: EMPTY,
      previewImgUrl: undefined,
      ImageDemoIcon,
    };
  },
  computed: {
    nameState() {
      const nameStr = this.item.name || '';
      const match = nameStr.match(/^(.*)\.[^.]+$/);
      return {
        namePrefix: match ? match[1] : nameStr,
        nameSuffix: match ? nameStr.slice(match[1].length) : '',
      };
    },
    status() {
      return this.item.status || 'success';
    },
    isImg() {
      return this.matchExt(this.nameState && this.nameState.nameSuffix, IMG_EXTS);
    },
    iconState() {
      if (!this.nameState) return {};
      for (const { ext, icon, color } of PRESET_FILE_ICONS) {
        if (this.matchExt(this.nameState.nameSuffix, ext)) {
          return {
            icon,
            iconColor: color,
          };
        }
      }
      return {
        icon: 'file-text',
        iconColor: DEFAULT_ICON_COLOR,
      };
    },
    isImgPreview() {
      return this.imgPreview && this.isImg;
    },
    previewUrl() {
      return this.item.thumbUrl || this.item.url || this.previewImgUrl;
    },
    desc() {
      // if (this.item.description) {
      //     return this.item.description;
      // }
      if (this.item.status === 'uploading') {
        return `上传中...${this.getPercent(this.item.percent)}%`;
      } else if (this.item.status === 'error') {
        if (this.item.error) {
          return '上传失败：' + this.item.error;
        } else {
          return '上传失败';
        }
      }
      return this.item.size ? this.getSize(this.item.size) : '';
    },
  },
  watch: {
    'item.originFileObj': {
      immediate: true,
      handler(val) {
        if (this.item.originFileObj) {
          let synced = true;
          previewImage(this.item.originFileObj).then((url) => {
            if (synced) {
              this.previewImgUrl = url;
              synced = false;
            }
          });
        }
        this.previewImgUrl = undefined;
      }
    }
  },
  methods: {
    matchExt(suffix, ext) {
      if (!suffix) {
        return false;
      }
      return ext.some((e) => suffix.toLowerCase() === `.${e}`);
    },
    getSize(size) {
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
    getPercent(percent) {
      return Number(percent.toFixed(2));
    },
    formatPercent(percent) {
      percent = 30;
      return percent === 100? '' : `${percent.toFixed(0)}%`;
    }
  },
};
</script>

<style module>
:root{
  --cw-filelist-card-background-color: #f2f3f5;
  --cw-filelist-card-content-name-color: #111;
  --cw-filelist-card-content-desc-color: #999;
  --cw-filelist-card-content-desc-color-error: #F24957;
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
  /* width: 236px; */
}
.overview .icon {
  font-size: 24px;
}
.overview[loading]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--cw-filelist-card-loading-background-color);
  opacity: 0.5;
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
  /* display: none; */
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
  color: white
}
.mask [class="ant-progress-text"] {
  color: white !important;
}
.loadingmask {
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  height: 100%;
}
</style>
