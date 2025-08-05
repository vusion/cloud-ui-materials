<template>
  <el-config-provider :locale="zhCn" namespace="huadian">
    <div :class="$style.setterRoot">
      <el-input readonly v-model="selectItemTitle" :class="$style.entryInput" :placeholder="placeholder" @click.capture="handleClick">
        <template #prefix>
          <img draggable="false" :class="$style.prefixIcon" v-if="showClearIcon" :src="getIconSrc(props.value)" alt="" />
        </template>
        <template #suffix>
          <svg v-if="showClearIcon" :class="$style.clearIcon" @click="handleClear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
            ></path>
            <path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"></path>
          </svg>
        </template>
      </el-input>
      <el-dialog ref="dialogRef" v-model="dialogVisible" title="选择图标" width="1200" :align-center="true" @open="handleOpen" @close="handleClose">
        <div :class="$style.container">
          <el-tabs v-model="activeName" @tab-change="changeTab">
            <el-tab-pane label="图标库" name="library">
              <IconLibrary ref="iconLibraryRef" @showDetail="handleLibraryShowDetail" @select="handleLibrarySelect" />
            </el-tab-pane>
            <el-tab-pane label="上传图标" name="upload">
              <UploadIcon ref="uploadIconRef" :value="value" @select="handleUploadSelect" />
            </el-tab-pane>
          </el-tabs>
        </div>
        <template #footer>
          <div v-if="footerShowStatus" :class="$style.dialogFooter">
            <el-button :class="$style.dialogCancelButton" @click="handleCancel">{{ cancelTitle }}</el-button>
            <el-button type="primary" :disabled="confirmDisabledStatus" :class="$style.dialogConfirmButton" @click="handleConfirm">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </el-config-provider>
</template>

<script setup>
import { ref, computed } from 'vue';
import IconLibrary from '@/components/ExIconSetter/IconLibrary.vue';
import UploadIcon from '@/components/ExIconSetter/UploadIcon.vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { getIconSrc } from '@/utils/handleSvg';
import { isSvgUrl } from '@/utils/handleSvg';
import { iconProductPath } from '@/config';

const props = defineProps({
  value: {
    default: '',
  },
  onChange: {
    default: (val) => {},
  },
});

// input
const showClearIcon = ref(!!props.value);

const handleClear = () => {
  selectItem.value = undefined;
  showClearIcon.value = false;
  props.onChange('');
};

const placeholder = computed(() => {
  return showClearIcon.value ? '' : '请选择图标';
});

// dialog
const dialogRef = ref(null);
const dialogVisible = ref(false);
const handleClick = () => {
  dialogVisible.value = true;
};

const activeName = ref('library');

const iconLibraryRef = ref(null);
const uploadIconRef = ref(null);

const changeTab = (name) => {
  activeName.value = name;
  if (name === 'upload') {
    uploadIconRef.value.onOpen();
  }
};

// iconLibrary
const showDetail = ref(false);
const handleLibraryShowDetail = (item) => {
  showDetail.value = true;
};
const handleLibrarySelect = (item) => {
  selectItem.value = item?.iconImg;
};

const handleUploadSelect = (item) => {
  selectItem.value = item;
};

// footer
const footerShowStatus = computed(() => {
  return activeName.value === 'library' ? showDetail.value : activeName.value === 'upload';
});
const cancelTitle = computed(() => {
  return activeName.value === 'library' ? '返回' : '取消';
});

const selectItem = ref(undefined);
const confirmDisabledStatus = computed(() => !selectItem.value);

const handleOpen = () => {
  if (isSvgUrl(props.value)) {
    activeName.value = 'upload';
    selectItem.value = props.value;
    uploadIconRef.value?.onOpen();
  }
};

const handleClose = () => {
  resetLibraryStatus();
  activeName.value = 'library';
};

const resetLibraryStatus = () => {
  // activeName.value = 'library';
  showDetail.value = false;
  selectItem.value = undefined;
  iconLibraryRef.value.showDetail = false;
  iconLibraryRef.value.selectIcon = undefined;
};

const handleCancel = () => {
  if (activeName.value === 'library') {
    resetLibraryStatus();
  } else if (activeName.value === 'upload') {
    dialogRef.value.handleClose();
  }
};

const handleConfirm = () => {
  if (selectItem.value) {
    showClearIcon.value = true;
    const targetSrc = activeName.value === 'library' ? `${iconProductPath}${selectItem.value}` : selectItem.value;
    props.onChange(targetSrc);
    dialogRef.value.handleClose();
  }
};
</script>

<style lang="scss" module>
.setterRoot {
  max-width: 500px;
  @include dialog;

  .entryInput {
    width: max(100%, 248px);
    height: 28px;
    .prefixIcon {
      width: 20px;
      height: 20px;
      font-size: 20px;
      cursor: pointer;
    }

    .clearIcon {
      height: 14px;
      width: 14px;
      cursor: pointer;
      color: $icon-color;
      &:hover {
        color: $icon-hover-color;
      }
    }
  }

  .container {
    // height: 686px;
    border-radius: 4px;
    padding: 16px;
    background-color: $white-color;
  }

  .dialogFooter {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;

    .dialogCancelButton {
      // 默认
      --huadian-button-text-color: #eea02a;
      --huadian-button-border-color: #eea02a;
      --huadian-button-bg-color: #ffffff;
      // hover
      --huadian-button-hover-text-color: #eea02a;
      --huadian-button-hover-border-color: #eea02a;
      --huadian-button-hover-bg-color: #fef5ea;
      // 按下
      --huadian-button-active-text-color: #e9872e;
      --huadian-button-active-border-color: #e9872e;
      --huadian-button-active-bg-color: #fef5ea;
      // 禁用
      --huadian-button-disabled-text-color: #a6a6a6;
      --huadian-button-disabled-bg-color: #f4f4f4;
      --huadian-button-disabled-border-color: #cdd7d5;
    }
    .dialogConfirmButton {
      --huadian-color-primary: #eea02a; // 默认
      --huadian-color-primary-light-3: #ffcd6d; // 悬停
      --huadian-color-primary-dark-2: #e9872e; // 按下
      --huadian-color-primary-light-5: #f4f4f4; // 禁用背景颜色
      --huadian-button-disabled-text-color: #a6a6a6; // 禁用字体颜色
    }
  }
}
</style>

<style lang="scss" scoped>
@include dialog;
</style>
