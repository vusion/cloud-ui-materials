<template>
  <s-uploader
    multiple
    drag
    :show-file-list="false"
    action="/api/v1/user/file"
    max-size="50MB"
    :accept="config[type].accept"
    :disabled="files[0] && files[0].type === 'progress'"
    :data="{ type, appId }"
    :before-upload="onUploadStart"
    :on-progress="onUploadProgress"
    :on-success="onUploadSuccess"
  >
    <img :class="$style.vectorIcon" src="@/assets/upload.svg" alt="vector icon" />
    <div mt-5>将文件拖到此处，或<span :class="$style.uploadDesc">点击上传</span></div>
  </s-uploader>

  <upload-icon-list mt-16 :class="$style.iconbox" :data="files" :limit="60">
    <template #item="{ item }">
      <div
        :class="[$style.iconitem, isSameUrl(internalUrl, item.url) ? $style.iconitemactive : '']"
        :key="item.id"
        @click="setCurTempImg(item)"
        style="font-size: 32px"
      >
        <el-progress v-if="item.type === 'progress'" :percentage="item.percent" :class="$style.progress">上传中</el-progress>
        <img v-else :src="item.url" :class="$style.iconItemImg" @dblclick=""/>
        <!-- <s-others-icon name="open_in_full" :class="$style.previewIcon" @click="onShowPreview(file, $event)"></s-others-icon> -->
      </div>
    </template>
  </upload-icon-list>

  <div v-if="files.length == 0" :class="$style.nocurlist">暂无插画</div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, onMounted } from 'vue';
import SUploader from '../public/s-uploader.vue';
import onlineSvgIcon from '../public/online-svg-icon.vue';
import UploadIconList from '../public/upload-icon-list.vue';
import { ElMessage } from 'element-plus';
import { loadFiles } from '@/apis';
import { isSameUrl } from '@/utils/handleSvg';

const props = withDefaults(
  defineProps<{
    value: string;
    type: string;
  }>(),
  {
    type: 'image',
  }
);

const emits = defineEmits(['select']);

const currentValue = ref(props.value);
const files = ref([]);
const internalUrl = ref(props.value);
const externalUrl = ref('');
const preViewUrl = ref('');
const currentTab = ref('internal');
const lightboxSrc = ref('');
const lightboxVisible = ref(false);
const appId = new URLSearchParams(window.location.search).get('appId');
const config = reactive({
  image: {
    accept: 'image/*',
  },
  link: {
    accept: 'image/*, .doc,.docx,.ppt,.ppts,.xls,.xlsx,.rar,.zip,.pdf,.txt',
  },
});

function onUploadSuccess(event, rawFile) {
  if (!event) return;
  const url = event.result;
  const fileName = rawFile.name;
  const findIndex = files.value.findIndex((item) => item.name === fileName);
  if (event.code !== 200) {
    ElMessage.error(event.msg);
    if (findIndex !== -1) {
      files.value.splice(findIndex, 1);
    }
    return;
  }
  if (findIndex !== 1) {
    const fileItem = files.value[findIndex];
    fileItem.url = url;
    delete fileItem.type;
  }

  setTimeout(() => {
    internalUrl.value = url;
  });
}

function onUploadProgress(event) {
  if (!event) return;
  files.value[0].percent = event.percent;
}

function onUploadStart(event) {
  files.value.unshift({ type: 'progress', percent: 0, url: '', name: event.name });
}

async function getFiles() {
  const res = await loadFiles({
    size: 9999,
    type: props.type,
    // 从地址栏读取query中的appId
    appId,
  });
  files.value =
    res.result?.list?.map((item) => ({
      url: item.fileUrl,
      name: item.name,
    })) || [];
}

async function onOpen() {
  externalUrl.value = '';
  preViewUrl.value = '';
  internalUrl.value = '';

  if (currentValue.value) {
    if (props.type === 'link') {
      currentTab.value = 'internal';
      internalUrl.value = currentValue.value;
    } else {
      const hasInFileIndex = files.value.findIndex((image) => isSameUrl(currentValue.value, image.url));
      const hasInFile = hasInFileIndex !== -1;
      if (!hasInFile) {
        currentTab.value = 'external';
        externalUrl.value = currentValue.value;
        preViewUrl.value = currentValue.value;
      } else {
        currentTab.value = 'internal';
        const listUrl = files.value[hasInFileIndex].url;
        const protocols = listUrl?.match(/^(https:|http:)/);
        internalUrl.value = !/^[https:|http:]/.test(currentValue.value) && protocols ? protocols[0] + currentValue.value : currentValue.value;
      }
    }
  }
}

onMounted(() => {
  getFiles();
});

const setCurTempImg = (item) => {
  internalUrl.value = item.url;
  emits('select', item.url);
};

defineExpose({
  onOpen,
});
</script>

<style lang="scss" module>
.uploadDesc {
  color: $primary-color;
}

.iconbox {
  position: relative;
  max-height: 310px;
  overflow-y: auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(270px, 1fr));
  grid-gap: 16px;
  grid-auto-rows: 290px;
  @include scrollbar;
}

.iconitem {
  height: 290px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: $bg-color;
  display: flex;
  justify-content: center;
  align-items: center;
}

.iconitem:hover {
  border-color: $primary-color;
}
.iconitemactive {
  border-color: $primary-color;
}

.iconItemImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nocurlist {
  height: 326px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
