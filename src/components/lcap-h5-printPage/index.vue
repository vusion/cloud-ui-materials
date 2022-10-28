<template>
  <div :class="$style.root">
    <u-button :class="$style.button" @click="printPage">
      打印
    </u-button>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export default {
  name: 'lcap-h5-printPage',
  mounted() {
    const appendJs = () => {
      let script = document.createElement('script');
      script.src = 'https://unpkg.com/jspdf@1.5.3/dist/jspdf.min.js';
      let node = document.getElementsByTagName('script')[0];
      node.parentNode.insertBefore(script, node);
    };
    appendJs();
  },
  methods: {
    printPage() {
      setTimeout(() => {
        this.getPdf({
          element: document.querySelector('body'),  // pdf模板节点：上面第一步中的模板内容节点
          title: '文件导出',  // pdf文件名
          isFullPage: true,   // pdf尺寸：true为不分页的长文件，false为A4分页的文件
          canvasOptions: {
            width: 1000   // 画布尺寸
          }
        })
      }, 500);
    },

    getPdf({ element, title, isFullPage, canvasOptions = {} })  {
      return new Promise((resolve, reject) => {
        // 定义canvas画布的属性，避免生成的pdf文件尺寸不统一
        let { scale = 2, width, height } = canvasOptions;
        width = width || element.clientWidth;
        height = height || element.clientHeight;
        element.ownerDocument.defaultView.devicePixelRatio = scale;
        element.ownerDocument.defaultView.innerWidth = width;
        element.ownerDocument.defaultView.innerHeight = height;

        html2Canvas(element, {
          // allowTaint: true,
          useCORS: true,
          scale,
          width,
          height
        })
          .then(function(canvas) {
            let contentWidth = canvas.width;
            let contentHeight = canvas.height;
            let pageData = canvas.toDataURL('image/jpeg', 1.0);
            let PDF;
            let imgWidth;
            let imgHeight;

            if (isFullPage) {
              // 全屏长图
              imgWidth = (contentWidth / scale) * 0.75;
              imgHeight = (contentHeight / scale) * 0.75;
              PDF = new jsPDF('', 'pt', [imgWidth, imgHeight]);  // [imgWidth, imgHeight] 为PDF宽高
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
              // A4纸截图
              imgWidth = 595;
              imgHeight = (imgWidth / contentWidth) * contentHeight;
              let position = 0;
              let pageHeight = (contentWidth / imgWidth) * 842; // A4一页的高度
              PDF = new jsPDF('', 'pt', 'a4');
              if (contentHeight < pageHeight) {
                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
              } else {
                while (contentHeight > 0) {
                  PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                  contentHeight -= pageHeight;
                  position -= 842;
                  if (contentHeight > 0) {
                    PDF.addPage();
                  }
                }
              }
            }
            PDF.save(title + '.pdf');  // 保存pdf文件
            resolve();
          })
          .catch(err => reject(err));
      });
    }
  },
};

</script>

<style module>
.root {
}
</style>
