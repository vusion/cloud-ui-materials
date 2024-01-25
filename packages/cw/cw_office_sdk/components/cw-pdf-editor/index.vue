<template>
  <div :class="$style.root">
    <div :class="$style.select" @click="select()" vusion-slot-name="default" :vusion-empty-background="$env.VUE_APP_DESIGNER && !$slots.default ? 'add-any' : false
      ">
      <input :class="$style.file" ref="file" type="file" accept="application/pdf" :disabled="disabled" @click.stop
        @change="onUploadPDF" />
      <slot></slot>
    </div>
    <div :class="$style.pdfView">
      <div v-for="(page, pIndex) in pages" :key="pIndex" :class="$style.pdfViewItem">
        <pdf-page :page="page" :ref="`page${pIndex}`" />
        <div :class="$style.itemView">
          <div v-for="(object, oIndex) in allObjects[pIndex]" :key="oIndex">
            <div v-if="object.type === 'image'">
              <image-item @onUpdate="updateObject(object.id, $event)" @onDelete="deleteObject(object.id)"
                :file="object.file" :payload="object.payload" :x="object.x" :y="object.y" :width="object.width"
                :height="object.height" :originWidth="object.originWidth" :originHeight="object.originHeight"
                 />
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
  readAsPDF,
  readAsDataURL
} from "./util/asyncReader";
import { save } from './util/PDF';
const PDFJS = require("pdfjs-dist");
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker");
// import demoImage from '../../assets/sealImag.png'
export default {
  name: "cw-pdf-editor",
  components: {
    'pdf-page': PdfPage,
    'image-item': ImageItem
  },
  props: {
    value: {
      type: String,
      default: "请在这里编写代码"
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
      addingDrawing: false
    }
  },
  methods: {
    async savePDF(newPdfName = new Date().getTime()) {
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

    select() {
      if (this.disabled) return;

      this.$refs.file.value = "";
      this.$refs.file.click();
    },
    genID() {
      let id = 0;
      return function genId() {
        return id++;
      };
    },
    selectImage() {
      if (this.disabled) return;
      this.$refs.image.value = "";
      this.$refs.image.click();
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
      this.initTextField();
      await this.initImages();
    },
    initTextField() {
      if (this.selectedPageIndex < 0 || !this.initTextFields || this.initTextFields.length === 0) {
        return;
      }
      for (let i = 0; i < this.pages.length; i++) {
        this.selectedPageIndex = i;
        for (let j = 0; j < this.initTextFields.length; j++) {
          let text = this.initTextFields[j];
          this.addTextField(text, 0, j * 60, this.selectedPageIndex);
        }
      }
      this.selectedPageIndex = 0;
      let checker = setInterval(() => {
        if (this.$refs.textItem.length === this.initTextFields.length * this.pages.length) {
          document.getElementById('pdfBody').dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            view: window
          }));
          clearInterval(checker)
        }
      }, 100);

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
            if (this.initTextFields.length === 0) {
              y = j * 100
            } else {
              y = (j - 1 + this.initTextFields.length) * 100
            }
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
    resetDefaultState() {
      this.pdfFile = null;
      this.numPages = null;
      this.pdfDocument = null;
      this.pages = [];
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
  display: block;
  position: relative;
}

.select {
  display: inline-block;
  position: relative;
  overflow: hidden\0;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
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
</style>