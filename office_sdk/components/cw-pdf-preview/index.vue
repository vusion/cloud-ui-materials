<template>
    <div style="display: flex;flex-direction: column;" ref="pdf-preview" :class="$env.VUE_APP_DESIGNER&&$style.room">
    </div>
</template>

<script>  
export default {
    name:"cw-pdf-preview",
    props:{
        value:{
          type:String,
        }
  },
  data() {
    return {
    }
  },

  watch:{
    value: {
      handler(newVal, oldVal) {
        console.log(newVal);
        if (newVal) {
          this.init()
        }
      },
    }
  },
  async  mounted() {
    await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.min.js')
    this.init()
  },
  methods: {
    copyCanvasData(target, source) {
        // console.log(target)
        return  new Promise((resolve, reject) => {
          const data = source.toDataURL("image/png")
          console.log(data);
          const img = new Image()
          img.src = data
          img.onload = () => {
            const ctx = target.getContext("2d")
            ctx.drawImage(img, 0, 0,100,100)
            resolve(true)
          }
          img.onerror = () => {
            reject(false)
          }
        })
      },
    loadScript(url) {
     return new Promise((resolve,reject) => {
          let script = document.createElement('script');
          script.src = url;
          document.body.appendChild(script);
          script.onload = () => {
            resolve(true)
            console.log('jspdf加载完成');
          }
          script.onerror = () => {
            reject(false)
          }
      })
   
    },
    init() {
      try {
        const pdfUrl = this.value;
        if (!this.value) {
          throw new Error("无效链接")
        }
        const parent = this.$refs["pdf-preview"]
        pdfjsLib.getDocument(pdfUrl).promise.then(function (pdfDoc) {
          for (let i = 1; i < pdfDoc.numPages + 1; i++){
              pdfDoc.getPage(i).then(function(page) {
              const viewport = page.getViewport({ scale: 2 });
              const canvas = document.createElement('canvas');
              parent.append(canvas);
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              page.render({
                canvasContext: context,
                viewport: viewport
              });
            });
          } 
        })
      } catch (error) {
        console.log(error);
      }
     
    }
  }
}
</script>

<style module>
.room{
  height: 300px;
  overflow: hidden;
  border:1px solid #ccc;
}
</style>