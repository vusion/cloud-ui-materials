<template>
  <s-uploader
    ref="cusupload"
    :class="$style.iconUpload"
    drag
    mt-16
    :show-file-list="false"
    :action="`/api/v1/user/file?appId=${$route?.query?.appId}&type=image&subType=cusicon`"
    max-size="50MB"
    :before-upload="checkFile"
    :on-success="onUploadSuccessIcon"
    :on-error="onUploadErrorIcon"
  >
    <img :class="$style.vectorIcon" src="@/assets/upload.svg" alt="vector icon" />
    <div mt-5>将文件拖到此处，或<span :class="$style.uploadDesc">点击上传</span>， 仅支持SVG格式</div>
  </s-uploader>

  <upload-icon-list mt-16 :class="$style.iconbox" :data="cusList" :limit="60">
    <template #item="{ item }">
      <div
        :class="[$style.iconitem, isSameUrl(tempValue, item.url) ? $style.iconitemactive : '']"
        :key="item.id"
        @click="setCurTempIcon(item)"
        style="font-size: 32px"
      >
        <online-svg-icon :purecss="!isIe11" :url="item.url"></online-svg-icon>
      </div>
    </template>
  </upload-icon-list>

  <div v-if="cusList.length == 0" :class="$style.nocurlist">暂无图标</div>

  <el-dialog
    ref="modalicon"
    title="图标颜色"
    v-model="modalVisibleIcon"
    align-center
    destroy-on-close
    :close-on-click-modal="false"
    width="440px"
    @close="onCancelIcon"
  >
    <div :class="$style.icon2wrap">
      <div :class="$style.icon2wrapleft" @click="curRadio = '1'">
        <div :class="$style.blobwrap" style="color: #666666">
          <online-svg-icon :purecss="!isIe11" :url="blob1"></online-svg-icon>
        </div>
        <el-radio-group v-model="curRadio"><el-radio value="1">去除图标颜色</el-radio></el-radio-group>
        <div :class="$style.blobwrapdesc">可在样式中自定义图标颜色</div>
      </div>
      <div :class="$style.icon2wrapright" @click="curRadio = '2'">
        <div :class="$style.blobwrap">
          <online-svg-icon :purecss="!isIe11" :url="blob2"></online-svg-icon>
        </div>
        <el-radio-group v-model="curRadio"><el-radio value="2">保留图标颜色</el-radio></el-radio-group>
        <div :class="$style.blobwrapdesc">不支持在样式中自定义图标颜色</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancelIcon">取 消</el-button>
        <el-button type="primary" @click="onOkIcon">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import SUploader from '../public/s-uploader.vue';
import onlineSvgIcon from '../public/online-svg-icon.vue';
import UploadIconList from '../public/upload-icon-list.vue';
import { loadFiles } from '@/apis';
import { stoB, simpleColor, getName, toName, isSvgUrl, isSameUrl } from '../../utils/handleSvg.js';

export default {
  components: {
    SUploader,
    onlineSvgIcon,
    UploadIconList,
  },
  props: {
    value: String,
  },
  data() {
    return {
      currentValue: '',
      tempValue: '',
      modalVisible: false,
      modalVisibleIcon: false,
      popoverVisible: false,
      urlType: 'uploader',
      files: [],
      internalUrl: this.value,
      externalUrl: '',
      preViewUrl: '',
      lightboxSrc: '',
      lightboxVisible: false,
      remixIconCategory: 'Arrows',
      iconconfig: {
        id: '',
        name: '',
        font_family: '',
        css_prefix_text: '',
        description: '',
        glyphs: [],
      },
      currentFile: null,
      currentSvg: '',
      cusList: [],
      blob1: '',
      blob2: '',
      blob1file: null,
      blob2file: null,
      curRadio: '1',
      fileIconMap: ['file-default', 'file-jpg', 'file-doc', 'file-ppt', 'file-txt', 'file-pdf', 'file-csv', 'file-zip', 'file-xlxs'],
      isIe11: !!window.MSInputMethodContext && !!document.documentMode,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (this.isSvgUrl(value)) {
          this.tempValue = value;
        } else {
          //   this.currentValue = getName(value, this.useIconConfig.glyphs);
          //   this.tempValue = getName(value, this.useIconConfig.glyphs);
          this.tempValue = '';
        }
        this.currentValue = ' ';
      },
    },
    currentFile(nvalue, oldValue) {
      if (nvalue) {
        this.processFile(nvalue, oldValue);
      }
    },
  },
  mounted() {
    this.getCustomIconList();
  },
  methods: {
    stoB,
    simpleColor,
    // getName,
    toName,
    isSvgUrl,
    isSameUrl,
    processFile(file) {
      this.currentSvg = '';
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentSvg = e.target.result;
        const tempblob = this.stoB(this.simpleColor(this.currentSvg));
        this.blob1 = window.URL.createObjectURL(tempblob);
        this.blob1file = new File([tempblob], file.name, { type: 'image/svg+xml' });
      };
      reader.readAsText(file);
      this.blob2 = window.URL.createObjectURL(file);
      this.blob2file = file;
      this.modalVisibleIcon = true;
    },
    async checkFile(file) {
      if (!/svg/.test(file.type)) {
        this.$message.warning('仅支持SVG格式文件');
        return false;
      }
      const result = this.currentFile !== null;
      this.currentFile = file;
      return result;
    },
    async onUploadSuccessIcon(item) {
      await this.getCustomIconList();
      this.tempValue = item?.result;
    },
    onUploadErrorIcon() {
      this.tempValue = '';
      this.$message('上传失败，请重试！');
    },
    async getCustomIconList() {
      const res = await loadFiles({
        size: 9999,
        type: 'image',
        subType: 'cusicon',
      });
      const tempL =
        res.result?.list?.map?.((item) => ({
          url: item.fileUrl,
          name: item.name,
          id: item.id,
          date: item.createdTime,
          time: new Date(item.createdTime.replace(/-/g, '/')).getTime(),
        })) || [];
      this.cusList = tempL.filter((it) => it.url && it.url.endsWith('.svg')).sort((a, b) => b.time - a.time);
    },
    toSearch() {
      let { externalUrl } = this;

      externalUrl = externalUrl && externalUrl.trim();

      this.iconconfig.glyphs = this.useIconConfig.glyphs.filter((v) => {
        if (v.keywords && externalUrl && v.keywords.find((keyword) => keyword.indexOf(externalUrl) !== -1)) {
          return true;
        }

        if (v.category && v.category !== this.remixIconCategory) {
          return false;
        }

        return (
          v.name.toLowerCase().includes((externalUrl || '').toLowerCase()) ||
          (v.keywords &&
            Array.isArray(v.keywords) &&
            v.keywords
              .join('')
              .toLowerCase()
              .includes((externalUrl || '').toLowerCase())) ||
          (v.font_class && v.font_class.toLowerCase().includes((externalUrl || '').toLowerCase()))
        );
      });
    },
    onOpen() {
      if (this.isSvgUrl(this.value)) {
        this.currentValue = ' ';
        this.tempValue = this.value;
        this.modalVisible = true;
      } else {
        // this.currentValue = getName(this.value, this.iconconfig.glyphs);
        // this.tempValue = getName(this.value, this.iconconfig.glyphs);
        this.currentValue = ' ';
        this.tempValue = ' ';
        this.modalVisible = true;
        // this.toSearch();
      }
    },

    setCurTempIcon(item) {
      this.tempValue = item.url;
      this.$emit('select', item.url);
    },
    onOk() {
      if (this.isSvgUrl(this.tempValue)) {
        this.currentValue = ' ';
        const svgSrc = this.tempValue.replace(/^https?:/, '');
        this.$emit('select', svgSrc);
      } else {
        this.currentValue = this.tempValue;
        this.$emit('select', this.toName(this.currentValue, this.iconconfig.glyphs));
        this.externalUrl = '';
      }
      this.modalVisible = false;
      this.popoverVisible = false;
    },
    onCancel() {
      this.tempValue = '';
      this.externalUrl = '';
      this.modalVisible = false;
    },
    onOkIcon() {
      this.$refs.cusupload.uploaderRef.handleStart(this.curRadio === '1' ? this.blob1file : this.blob2file);
      this.$refs.cusupload.uploaderRef.submit();
      this.onCancelIcon();
    },
    onCancelIcon() {
      this.tempValue = '';
      this.modalVisibleIcon = false;
      this.currentFile = null;
    },
  },
};
</script>

<style module lang="scss">
.iconUpload {
  width: 100%;
  [class^='el-upload-dragger'] {
    display: flex;
    justify-content: center;
    // 纵向排列
    flex-direction: column;
    align-items: center;
    height: 180px;
    padding: unset;
    background-color: var(--uploader-draggable-background);
    color: $designer-icon-select-desc-color-cus;

    &:hover {
      border-color: $primary-color;
    }
  }

  [class^='el-upload']:focus [class^='el-upload-dragger'] {
    border-color: $primary-color;
  }
}

.uploadDesc {
  color: $primary-color;
}

.iconbox {
  position: relative;
  max-height: 310px;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @include scrollbar;
}

.iconitem {
  display: inline-block;
  width: calc(100% / 8);
  height: 80px;
  text-align: center;
  /* padding-top: 20px; */
  color: var(--text-color-regular);
  cursor: pointer;
  border: 1px solid transparent;
  margin-right: -2px;
  margin-bottom: -2px;
  padding: 0 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.iconitem:hover {
  border-color: $primary-color;
}
.iconitemactive {
  border-color: $primary-color;
}

.nocurlist {
  height: 326px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon2wrap {
  display: flex;
}
.icon2wrapleft {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-right: 48px;
}
.icon2wrapright {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.blobwrap {
  font-size: 32px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--designer-icon-select-bgcolor-cus);
  border: 1px solid #e0e0e0;
  border-width: var(--designer-icon-select-border-width);
  border-radius: 4px;
  margin-bottom: 10px;
}
.blobwrapdesc {
  color: var(--designer-icon-select-desc-color-cus);
}
</style>
