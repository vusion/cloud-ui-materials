<template>
    <div :class="$style.root" v-show="!hidden">
        <u-button
            :class="$style.button"
            color="primary"
            text="打印"
            @click="printPage"></u-button>
    </div>
</template>

<script>
import html2Canvas from 'html2canvas';
// import JsPDF from 'jspdf';
import { saveAs } from 'file-saver';

export default {
    name: 'lcap-print-page-new',
    data() {
        return {
            base64PdfData: '',
        };
    },
    props: {
        download: { type: Boolean, default: false },
        hidden: { type: Boolean, default: false },
        fileName: { type: String, default: '文件导出' },
        canvasWidth: undefined,
        canvasHeight: undefined,
        fileType: { type: String, default: 'pdf' },
        printDOM: { type: String, default: 'body' },
        isNotFullPage: { type: Boolean, default: false },
    },
    mounted() {
        const appendJs = () => {
            let script = document.createElement('script');
            script.src = 'https://unpkg.com/jspdf@1.5.3/dist/jspdf.min.js';
            // script.src = '//dev.uploadjspdf.dogfood.lcap.163yun.com/upload/app/jspdfmin_20231215104818885.js';
            let node = document.getElementsByTagName('script')[0];
            node.parentNode.insertBefore(script, node);
        };
        appendJs(); // jspdf已经通过commonjs导入，理论上不需要再通过script导入。
    },
    methods: {
        async printPage() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let canvasWidth =
                        this.canvasHeight === 'auto'
                            ? document.body.clientWidth
                            : this.canvasWidth;
                    let canvasHeight =
                        this.canvasHeight === 'auto'
                            ? document.body.clientHeight
                            : this.canvasHeight;
                    this.getPdf({
                        element: document.querySelector(this.printDOM), // pdf模板节点：上面第一步中的模板内容节点
                        title: this.fileName, // pdf文件名
                        allowDownload: this.download, // 是否允许下载
                        fileType: this.fileType, // 文件类型
                        isFullPage: !this.isNotFullPage, // pdf尺寸：true为不分页的长文件，false为A4分页的文件
                        canvasOptions: {
                            height: canvasHeight,
                            width: canvasWidth, // 画布尺寸
                        },
                    }).then((res) => {
                        this.$emit('print', res);
                        this.base64PdfData = res;
                        resolve(res);
                    });
                }, 1500);
            });
        },

        getPdf({
            element,
            title,
            allowDownload,
            fileType,
            isFullPage,
            canvasOptions = {},
        }) {
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
                    height,
                    x: 0,
                    y: window.pageYOffset,
                })
                    .then(function (canvas) {
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
                            PDF = new jsPDF('', 'pt', [imgWidth, imgHeight]); // [imgWidth, imgHeight] 为PDF宽高
                            PDF.addImage(
                                pageData,
                                'JPEG',
                                0,
                                0,
                                imgWidth,
                                imgHeight
                            );
                        } else {
                            // A4纸截图
                            imgWidth = 595;
                            imgHeight =
                                (imgWidth / contentWidth) * contentHeight;
                            let position = 0;
                            let pageHeight = (contentWidth / imgWidth) * 842; // A4一页的高度
                            PDF = new jsPDF('', 'pt', 'a4');
                            if (contentHeight < pageHeight) {
                                PDF.addImage(
                                    pageData,
                                    'JPEG',
                                    0,
                                    0,
                                    imgWidth,
                                    imgHeight
                                );
                            } else {
                                while (contentHeight > 0) {
                                    PDF.addImage(
                                        pageData,
                                        'JPEG',
                                        0,
                                        position,
                                        imgWidth,
                                        imgHeight
                                    );
                                    contentHeight -= pageHeight;
                                    position -= 842;
                                    if (contentHeight > 0) {
                                        PDF.addPage();
                                    }
                                }
                            }
                        }
                        const fileURL = PDF.output('blob'); // 生成pdf文件的url
                        // console.log('file', fileURL);
                        if (fileType === 'png' && allowDownload) {
                            canvas.toBlob(function (blob) {
                                saveAs(blob, title + '.png');
                            });
                        } else if (fileType === 'pdf' && allowDownload) {
                            PDF.save(title + '.pdf'); // 保存pdf文件
                        }
                        resolve(fileURL);
                    })
                    .catch((err) => reject(err));
            });
        },
    },
};
</script>

<style module>
.root {
    display: inline;
}
</style>
