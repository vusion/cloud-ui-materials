<template>
    <div
      id="pdf-preview"
      style="display: flex; flex-direction: column"
      ref="pdf-preview"
      :class="$env.VUE_APP_DESIGNER && $style.room"
    ></div>
</template>

<script>
import jsPDF from "jspdf/dist/jspdf.umd";
import readAsPDF from "@/utils/readAsPDF";

export default {
  name: "cw-pdf-select-view",
  props: {
    value: {
      type: String,
    },
    access:{
      type: String,
      default:'public'
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
    },
  },
  data() {
    return {
      selected: [],
      pdf: null,
    };
  },
  mounted() {
    this.init();
    const parent = this.$refs["pdf-preview"];
    const callback = (e) => {
      const el = e.target;
      const els = [...parent.querySelectorAll("canvas")];
      const idx = els.indexOf(el);
      const sIdx = this.selected.indexOf(idx);
      if (~sIdx) {
        this.selected.splice(sIdx, 1);
      } else {
        this.selected.push(idx);
      }
      els.forEach((item, index) => {
        if (this.selected.includes(index)) {
          item.style.border = "1px solid red";
        } else {
          item.style.border = "1px solid #ccc";
        }
      });
    };
    parent.addEventListener("click", callback);
  },
  methods: {
    getSelected(){
      return this.selected
    },
    arrayBufferToFile(arrayBuffer, fileName, mimeType) {
      var blob = new Blob([arrayBuffer], { type: mimeType });
      var file = new File([blob], fileName, {
        type: mimeType,
        lastModified: Date.now(),
      });
      return file;
    },

    copyCanvasData(target, source) {
      return new Promise((resolve, reject) => {
        const data = source.toDataURL("image/png");
        console.log(data);
        const img = new Image();
        img.src = data;
        img.onload = () => {
          const ctx = target.getContext("2d");
          ctx.drawImage(img, 0, 0);
          resolve(true);
        };
        img.onerror = () => {
          reject(false);
        };
      });
    },
    async uploadFile() {
      const doc = new jsPDF();
      console.log(doc);
      const els = this.$refs["pdf-preview"].querySelectorAll("canvas");
      this.selected.sort((x,y)=>x-y).forEach((item, idx) => {
        const canvas = els[item];
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 0, 0);
        if(idx !== this.selected.length-1){
          doc.addPage();
        }
      });
      const arrayBuffer = doc.output("arraybuffer");
      var mimeType = "image/png"; // 假设转换的是PNG文件
      var fileName = "file.pdf";
      var file = this.arrayBufferToFile(arrayBuffer, fileName, mimeType);
      console.log(file);
      let formData  = new FormData()
      formData.append('file',file)
      formData.append('lcapIsCompress',false)
      formData.append('viaOriginURL',false)
      const res = await fetch("/upload",{
        method:'post',
        headers:{
          'Lcap-Access':this.access
        },
        body: formData,
      }).then(r=>r.json())
      return res
    },
    init() {
      try {
        const pdfUrl = this.value;
        if (!this.value) {
          throw new Error("无效链接");
        }
        const parent = this.$refs["pdf-preview"];
        parent.innerHTML = "";
        readAsPDF(pdfUrl).then(async(pdf) => {
          this.pdf = pdf;
          let promises = []
          for (let i = 1; i < pdf.numPages + 1; i++) {
              promises.push(pdf.getPage(i))
              // const page = await  pdf.getPage(i)
          }
          const pages = await Promise.all(promises)
          pages.forEach(page =>{
              const viewport = page.getViewport({ scale: 1.2 });
              const canvas = document.createElement("canvas");
              parent.append(canvas);
              const context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({
                canvasContext: context,
                viewport: viewport,
              });
          })
          
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style module>
.room {
  height: 300px;
  overflow: hidden;
  border: 1px solid #ccc;
}
</style>

<style>
#pdf-preview canvas {
  border: 1px solid #ccc;
}
</style>
