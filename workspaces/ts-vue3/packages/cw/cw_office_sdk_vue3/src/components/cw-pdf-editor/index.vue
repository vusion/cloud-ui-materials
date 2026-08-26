<template>
  <div :class="$style.root">
    <div :class="$style.toolbarContainer">
      <div vusion-slot-name="pdf" :class="$style.firstToolbar" @click="select">
        <input
          ref="file"
          name="pdf"
          :class="$style.file"
          type="file"
          accept="application/pdf"
          style="overflow: hidden"
          @click.stop
          @change="onUploadPDF"
        />
        <slot name="pdf" />
        <div v-if="!$slots.pdf">
          <el-button>上传PDF文件</el-button>
        </div>
      </div>
      <div vusion-slot-name="image" :class="$style.toolbar" @click="selectImage">
        <input
          ref="image"
          :class="$style.file"
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          style="overflow: hidden"
          @click.stop
          @change="onUploadImage"
        />
        <slot name="image" />
        <div v-if="!$slots.image">
          <el-button>上传图片</el-button>
        </div>
      </div>
      <div :class="$style.toolbar">
        <slot />
      </div>
    </div>
    <div v-if="pages.length" :class="$style.pdfView">
      <div v-for="(page, pIndex) in pages" :key="pIndex" :class="$style.pdfViewItem">
        <PdfPage
          :ref="(el) => setPageRef(el, pIndex)"
          :page="page"
          :class="[$style.pdfContainer, pIndex === selectedPageIndex ? $style.shadowOutline : '']"
          @select-page="selectPage(pIndex)"
        />
        <div :class="$style.itemView">
          <div v-for="(object, oIndex) in allObjects[pIndex]" :key="oIndex">
            <div v-if="object.type === 'image'">
              <ImageItem
                :file="object.file"
                :payload="object.payload"
                :x="object.x"
                :y="object.y"
                :width="object.width"
                :height="object.height"
                :origin-width="object.originWidth"
                :origin-height="object.originHeight"
                :fix-size="selectedPageIndex !== pIndex"
                @on-update="updateObject(object.id, $event)"
                @on-delete="deleteObject(object.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, toRaw } from 'vue';
import type { PDFPageProxy } from 'pdfjs-dist';
import readAsPDF from '@/utils/read-as-pdf';
import PdfPage from './pdf-page.vue';
import ImageItem from './image-item.vue';
import { readAsDataURL, readAsImage } from './util/async-reader';
import { save } from './util/PDF';

type EditorObject = {
  id: ReturnType<typeof genID>;
  type: 'image';
  width: number;
  height: number;
  originWidth: number;
  originHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  x: number;
  y: number;
  isSealImage: boolean;
  payload: HTMLImageElement;
  file: Blob | File | string;
};

const file = ref<HTMLInputElement | null>(null);
const image = ref<HTMLInputElement | null>(null);
const pageRefs = ref<Array<InstanceType<typeof PdfPage> | null>>([]);

const pdfFile = shallowRef<Blob | File | null>(null);
const pages = ref<Promise<PDFPageProxy>[]>([]);
const allObjects = shallowRef<EditorObject[][]>([]);
const selectedPageIndex = ref(-1);
const saving = ref(false);

function setPageRef(el: unknown, index: number) {
  pageRefs.value[index] = el as InstanceType<typeof PdfPage> | null;
}

function genID() {
  let id = 0;
  return function genId() {
    return id++;
  };
}

async function savePDF(newPdfName: string | number = new Date().getTime()) {
  if (!pdfFile.value || saving.value || !pages.value.length) return;
  saving.value = true;
  try {
    const rawFile = toRaw(pdfFile.value);
    const rawObjects = toRaw(allObjects.value).map((pageObjects) =>
      pageObjects.map((object) => ({
        ...object,
        file: toRaw(object.file),
      })),
    );
    await save(rawFile, rawObjects, newPdfName);
  } catch (e) {
    console.log(e);
  } finally {
    saving.value = false;
  }
}

function deleteObject(objectId: EditorObject['id']) {
  allObjects.value = allObjects.value.map((objects, pIndex) =>
    pIndex === selectedPageIndex.value
      ? objects.filter((object) => object.id !== objectId)
      : objects,
  );
}

async function onUploadImage(e: Event) {
  const target = e.target as HTMLInputElement;
  const uploadFile = target.files?.[0];
  if (uploadFile && selectedPageIndex.value >= 0) {
    await addImage(uploadFile);
  }
  target.value = '';
}

function updateObject(objectId: EditorObject['id'], payload: Record<string, unknown>) {
  allObjects.value = allObjects.value.map((objects, pIndex) =>
    pIndex ===
    (payload.currentPage !== undefined ? (payload.currentPage as number) : selectedPageIndex.value)
      ? objects.map((object) =>
          object.id === objectId ? { ...object, ...payload } : object,
        )
      : objects,
  );
}

function select() {
  if (file.value) {
    file.value.value = '';
    file.value.click();
  }
}

function selectImage() {
  if (selectedPageIndex.value === -1) return;
  if (image.value) {
    image.value.value = '';
    image.value.click();
  }
}

async function onUploadPDF(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  const uploadFile = files?.[0];
  if (!uploadFile || uploadFile.type !== 'application/pdf') return;
  selectedPageIndex.value = -1;
  try {
    await addPDF(uploadFile);
    selectedPageIndex.value = 0;
  } catch (err) {
    console.log(err);
  }
  await initImages();
}

async function initImages() {
  if (selectedPageIndex.value < 0) return;
  for (let i = 0; i < pages.value.length; i++) {
    selectedPageIndex.value = i;
    const y = 0;
    void y;
  }
  selectedPageIndex.value = 0;
}

async function addImage(
  uploadFile: Blob | File | string,
  x = 0,
  y = 0,
  sizeNarrow = 1,
  isSealImage = false,
) {
  try {
    let url: string;
    if (typeof uploadFile === 'string' && uploadFile.startsWith('http')) {
      url = uploadFile;
    } else {
      url = await readAsDataURL(uploadFile as Blob);
    }
    const img = await readAsImage(url);
    const id = genID();
    const { width, height } = img;
    const pageRef = pageRefs.value[selectedPageIndex.value];
    const { canvasWidth, canvasHeight } = pageRef?.getCanvasMeasurement() ?? {
      canvasWidth: 0,
      canvasHeight: 0,
    };
    const object: EditorObject = {
      id,
      type: 'image',
      width: width * sizeNarrow,
      height: height * sizeNarrow,
      originWidth: width,
      originHeight: height,
      canvasWidth,
      canvasHeight,
      x,
      y,
      isSealImage,
      payload: img,
      file: uploadFile,
    };
    allObjects.value = allObjects.value.map((objects, pIndex) =>
      pIndex === selectedPageIndex.value ? [...objects, object] : objects,
    );
  } catch (e) {
    console.log('Fail to add image.', e);
  }
}

function selectPage(index: number) {
  selectedPageIndex.value = index;
}

function resetDefaultState() {
  pdfFile.value = null;
  pages.value = [];
  pageRefs.value = [];
  allObjects.value = [];
}

async function addPDF(uploadFile: Blob | File) {
  try {
    resetDefaultState();
    pdfFile.value = uploadFile;
    const pdfDocument = await readAsPDF(uploadFile);
    if (pdfDocument) {
      const numPages = pdfDocument.numPages;
      pages.value = Array(numPages)
        .fill(null)
        .map((_, i) => pdfDocument.getPage(i + 1));
      allObjects.value = pages.value.map(() => []);
    }
  } catch (e) {
    console.log('Failed to add pdf.');
    throw e;
  }
}

defineExpose({
  savePDF,
});
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
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
  z-index: -1;
}

.itemView {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
}

.pdfView {
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: var(--el-fill-color-lighter);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
}

.pdfViewItem {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
}

.shadowOutline {
  box-shadow: 0 0 0 3px var(--el-color-primary);
}

.toolbarContainer {
  display: flex;
}

.toolbar {
  margin-left: 10px;
}

.pdfContainer {
  display: inline-block;
  margin: 10px 0;
}
</style>
