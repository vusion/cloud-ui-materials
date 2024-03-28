<template>
  <div :class="$style.root">
    <div :class="$style.toolbarContainer">
      <div @click="select()" vusion-slot-name="pdf" :class="$style.firstToolbar">
        <input name="pdf" :class="$style.file" ref="file" type="file" accept="application/pdf" @click.stop
          @change="onUploadPDF" style="overflow: hidden;" />
        <slot name="pdf"></slot>
        <div v-if="!$slots.pdf">
          <u-button>上传PDF文件</u-button>
        </div>
      </div>
      <div @click="selectImage()" vusion-slot-name="image" :class="$style.toolbar">
        <input :class="$style.file" ref="image" type="file" name="image" accept="image/png, image/jpeg" @click.stop
          @change="onUploadImage" style="overflow: hidden;" />
        <slot name="image"></slot>
        <div v-if="!$slots.image">
          <u-button>上传图片</u-button>
        </div>
      </div>
      <div :class="$style.toolbar"><slot></slot></div>
    </div>
    <div :class="$style.pdfView" v-if="pages.length">
      <div v-for="(page, pIndex) in pages" :key="pIndex" :class="$style.pdfViewItem">
        <pdf-page :page="page" :ref="`page${pIndex}`" @selectPage="selectPage(pIndex)"
          :class="[$style.pdfContainer, pIndex === selectedPageIndex ? $style.shadowOutline : '']" />
        <div :class="$style.itemView">
          <div v-for="(object, oIndex) in allObjects[pIndex]" :key="oIndex">
            <div v-if="object.type === 'image'">
              <image-item @onUpdate="updateObject(object.id, $event)" @onDelete="deleteObject(object.id)"
                :file="object.file" :payload="object.payload" :x="object.x" :y="object.y" :width="object.width"
                :height="object.height" :originWidth="object.originWidth" :originHeight="object.originHeight"
                :fixSize="selectedPageIndex !== pIndex" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PdfPage from './pdf-page'
import ImageItem from './image-item'
import {
  readAsImage,
  readAsDataURL
} from "./util/asyncReader";
import readAsPDF from '@/utils/readAsPDF';
import { save } from './util/PDF';
export default {
  name: "cw-pdf-editor",
  components: {
    'pdf-page': PdfPage,
    'image-item': ImageItem
  },
  data() {
    return {
      pdfFile: null,
      numPages: null,
      pdfDocument: null,
      pages: [],
      allObjects: [],
      selectedPageIndex: -1,
      saving: false,
      addingDrawing: false,
      pagesStyle: []
    }
  },
  methods: {
    async savePDF(newPdfName = new Date().getTime()) {
      console.log(this.allObjects)
      if (!this.pdfFile || this.saving || !this.pages.length) return;
      this.saving = true;
      try {
        await save(this.pdfFile, this.allObjects, newPdfName);
      } catch (e) {
        console.log(e);
      } finally {
        this.saving = false;
      }
    },
    deleteObject(objectId) {
      this.allObjects = this.allObjects.map((objects, pIndex) =>
        pIndex === this.selectedPageIndex
          ? objects.filter(object => object.id !== objectId)
          : objects
      );
    },
    async onUploadImage(e) {
      const file = e.target.files[0];
      if (file && this.selectedPageIndex >= 0) {
        await this.addImage(file);
      }
      e.target.value = null;
    },
    updateObject(objectId, payload) {
      this.allObjects = this.allObjects.map((objects, pIndex) =>
        pIndex === (payload.currentPage !== undefined ? payload.currentPage : this.selectedPageIndex)
          ? objects.map(object =>
            object.id === objectId ? { ...object, ...payload } : object
          )
          : objects
      );
    },
    updateStyle(index, { viewport }) {
      this.pagesStyle[index] = {
        width: viewport.width + 'px',
        height: viewport.height + 'px'
      }
      this.$forceUpdate()
    },

    select() {
      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    selectImage() {
      if (this.selectedPageIndex === -1) return;

      this.$refs.image.value = "";
      this.$refs.image.click();
    },
    genID() {
      let id = 0;
      return function genId() {
        return id++;
      };
    },
    async onUploadPDF(e) {
      const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
      const file = files[0];
      if (!file || file.type !== "application/pdf") return;
      this.selectedPageIndex = -1;
      try {
        await this.addPDF(file);
        this.selectedPageIndex = 0;
      } catch (e) {
        console.log(e);
      }
      await this.initImages();
    },
    async initImages() {
      if (this.selectedPageIndex < 0) {
        return;
      }
      for (let i = 0; i < this.pages.length; i++) {
        this.selectedPageIndex = i;
        let y = 0;
        if (this.initImageUrls && this.initImageUrls.length !== 0) {
          // 需要初始化图片
          for (let j = 0; j < this.initImageUrls.length; j++) {
            await this.addImage(this.initImageUrls[j], 0, y, 1);
          }
        }
        // 展示印章示例
        // const res = await fetch(this.sealImageUrl);
        // await this.addImage(await res.blob(), 0, (y + 1) * 100, 0.4, true);
      }
      this.selectedPageIndex = 0;
    },
    async addImage(file, x = 0, y = 0, sizeNarrow = 1, isSealImage = false) {
      try {
        // get dataURL to prevent canvas from tainted
        let url;
        if (typeof file === "string" && file.startsWith("http")) {
          url = file;
        } else {
          url = await readAsDataURL(file);
        }
        const img = await readAsImage(url);
        const id = this.genID();
        const { width, height } = img;

        const { canvasWidth, canvasHeight } =
          this.$refs[
            `page${this.selectedPageIndex}`
          ][0].getCanvasMeasurement();

        const object = {
          id,
          type: "image",
          width: width * sizeNarrow,
          height: height * sizeNarrow,
          originWidth: width,
          originHeight: height,
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight,
          x: x,
          y: y,
          isSealImage: isSealImage,
          payload: img,
          file
        };
        this.allObjects = this.allObjects.map((objects, pIndex) =>
          pIndex === this.selectedPageIndex ? [...objects, object] : objects
        );
      } catch (e) {
        console.log(`Fail to add image.`, e);
      }
    },
    selectPage(index) {
      this.selectedPageIndex = index;
    },
    resetDefaultState() {
      this.pdfFile = null;
      this.numPages = null;
      this.pdfDocument = null;
      this.pages = [];
      this.pagesStyle = [];
      this.allObjects = [];
    },
    async addPDF(file) {
      try {
        this.resetDefaultState();

        this.pdfFile = file;

        this.pdfDocument = await readAsPDF(file);
        if (this.pdfDocument) {
          this.numPages = this.pdfDocument.numPages;
          this.pages = Array(this.numPages)
            .fill()
            .map((_, i) => this.pdfDocument.getPage(i + 1));
          this.pagesStyle = Array(this.numPages).fill().map(() => ({
            width: '100%',
            height: '100%'
          }))
          this.allObjects = this.pages.map(() => []);
        }
      } catch (e) {
        console.log("Failed to add pdf.");
        throw e;
      }
    },
  }
}
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

.select {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.file {
  display: none;
  display: block\0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: var(--cursor-pointer);
  z-index: -1\0;
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
  background-color: var(--brand-primary-lightest);
  border: 1px solid var(--border-color-light);
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
  box-shadow: 0 0 0 3px var(--brand-primary);
}
.toolbarContainer {
  display: flex;
  .toolbar {
    margin-left: 10px;
  }
}

.pdfContainer {
  display: inline-block;
  margin: 10px 0;
}
</style>