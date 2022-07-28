<template>
<div ref="root" :class="$style.root" :disablescroll="disablescroll ? 'can': 'no'">
    <div class="in-editor">
        <slot></slot>
    </div>
    <u-uploader ref="uploader" @error="showErrorMsg($event)" @success="insertImg($event)" @size-exceed="errorSize($event)" style="display: none;" :url="uploadUrl" url-field="result" max-size="100MB" :show-file-list="false" accept="image/gif,image/png,image/jpeg">
        <u-button style="display: none;" id="uploadButton" color="primary">Upload</u-button>
    </u-uploader>
</div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { MField } from 'cloud-ui.vusion';
import './css/katex.css';
import './css/index.css';
import './css/font.css';

import Quill from 'quill';
import { addQuillTitle } from './js/addToolTip.js';
import customIcon from './js/custom-Icon.js';

// 自定义工具栏图标
customIcon();

// 替换自定义字体设置
const fonts = [false, 'SimSun', 'Hiragino-Sans-GB', 'PingFang-SC', 'STSong', 'STFangsong', 'STKaiti', 'Arial', 'Times-New-Roman', 'Comic-Sans-MS', 'Courier-New', 'Georgia'];
const Font = Quill.import('formats/font');
Font.whitelist = fonts;

// 替换自定义字号大小设置
const Size = Quill.import('attributors/style/size');
const sizes = ['9px', '10px', '11px', '12px', false, '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '42px', '48px', '72px'];
Size.whitelist = sizes;
Quill.register(Size, true);

const Colors = ['#ffffff', '#010101', '#e73521', '#f1a039', '#fffe54', '#b4f551', '#8cdcfd', '#4042cb', '#d856f6',
                '#eeeeee', '#777777', '#f5c9bc', '#fae1b9', '#fff2d0', '#ddead8', '#e5f8fe', '#cfc7f0', '#f9e5fe',
                '#dddddd', '#555555', '#de9c9c', '#f2bb61', '#fae5a4', '#b8d98a', '#99d2e3', '#867ee3', '#de9af1',
                '#cccccc', '#333333', '#ce6f6b', '#e89233', '#f9d977', '#95bc45', '#73c0ea', '#424bb2', '#bd52d8',
                '#999999', '#222222', '#b82718', '#d55a26', '#f4ba3f', '#708c28', '#3e88f3', '#2d42ab', '#9330cb'];

export default {
    name: 'lcap-rich-text-editor',
    mixins: [MField],
    props: {
        value: String,
        textSub: {
            type: Boolean,
            default: false,
        },
        textSuper: {
            type: Boolean,
            default: false,
        },
        formula: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        imgUploadUrl: {
            type: String,
            default: '/gateway/lowcode/api/v1/app/upload',
        },
        disablescroll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            editor: null,
            toolbar: {
                container: [
                    [{ header: 1 }, { header: 2 }, { header: 3 }, { font: fonts }, { size: sizes }],
                    ['bold', 'italic', 'underline', 'strike', { color: Colors }, { background: Colors }],
                    [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link', 'image', 'video', 'blockquote', 'code-block'],
                    ['clean'],
                    // [
                    //     {'table': 'TD'},
                    //     // {'table-insert-row': 'TIR'},
                    //     // {'table-insert-column': 'TIC'},
                    //     // {'table-delete-row': 'TDR'},
                    //     // {'table-delete-column': 'TDC'}
                    // ]
                ],
            },
            options: {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: [
                            [{ header: 1 }, { header: 2 }, { header: 3 }, { font: fonts }, { size: sizes }],
                            ['bold', 'italic', 'underline', 'strike', { color: Colors }, { background: Colors }],
                            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                            ['link', 'image', 'video', 'blockquote', 'code-block'],
                            ['clean'],
                            // [
                            //     {'table': 'TD'},
                            //     // {'table-insert-row': 'TIR'},
                            //     // {'table-insert-column': 'TIC'},
                            //     // {'table-delete-row': 'TDR'},
                            //     // {'table-delete-column': 'TDC'}
                            // ]
                        ],
                    },
                },
                placeholder: this.placeholder,
                readOnly: this.readOnly,
            },
            uploadUrl: this.imgUploadUrl,
            write: true, //Bug-51423 光标左移
        };
    },
    watch: {
        toolbar(val) {
            if (!this.editor) {
                return;
            }
            this.options.modules.toolbar = val;
            this.reRender();
        },
        value(val) {
            const nodes = document.getElementsByClassName('ql-cursor');
            nodes.forEach((node) => {
                node.parentElement.removeChild(node);
            });
            if (!this.editor || !this.write) {
                this.write = true;
                return;
            }

            let content = this.editor.root.innerHTML;
            content = this.removeMathTag(content);
            if (this.readOnly) {
                this.editor.root.innerHTML = val;
                this.$emit('update:value', val);
                this.$emit('input', val);
                this.$emit('change', { value: val });
            } else if (['number', 'string'].includes(typeof val)) {
                if (val && val !== content) {
                    const valEnd = val.slice(-11);
                    let delta = null;
                    if (valEnd !== '<p><br></p>') {
                        delta = this.editor.clipboard.convert({
                            html: val,
                        });
                        this.editor.setContents(delta);
                        this.$emit('update:value', val);
                        this.$emit('input', val);
                        this.$emit('change', { value: val });
                    } else if (val === valEnd) {
                        this.editor.setContents('');
                    } else {
                        delta = this.editor.clipboard.convert({
                            html: val,
                        });
                        this.editor.setContents(delta);
                        this.$emit('update:value', val);
                        this.$emit('input', val);
                        this.$emit('change', { value: val });
                    }
                } else if (!val && val != 0) {
                    this.editor.setContents('');
                }
            } else if (!val) {
                this.editor.setContents('');
            } else {
                this.$toast.warning('编辑区目前只支持展示文本类型或数字类型的变量!');
            }
        },
        textSub(val) {
            this.configEditorToolBarOptions(val, 1, { script: 'sub' });
        },
        textSuper(val) {
            this.configEditorToolBarOptions(val, 1, { script: 'super' });
        },
        formula(val) {
            this.configEditorToolBarOptions(val, 3, 'formula');
        },
        readOnly() {
            this.options.readOnly = this.readOnly;
            this.reRender();
        },
        placeholder() {
            this.options.placeholder = this.placeholder;
            this.reRender();
        },
        imgUploadUrl(val) {
            this.uploadUrl = val;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.reRender();
            this.editor.root.addEventListener('keydown', (event) => {
                const e = event || window.event;
                const keyCode = e.keyCode;
                if (keyCode === 13) {
                    this.write = false;
                    e.stopPropagation();
                }
            }, true);
        });
    },
    methods: {
        reRender() {
            this.init();
            this.isShowToolBar(this.readOnly);
            // 添加气泡提示（暂时使用原生的title属性实现）
            addQuillTitle();
        },
        init() {
            const editorDom = this.$el.querySelector('.in-editor');
            let content = '';

            // 删除quill实例以及工具栏DOM
            if (this.editor !== null) {
                content = this.editor.root.innerHTML;
                this.$refs.root.querySelector('.ql-toolbar.ql-snow').remove();
                /** readOnly由true变为false时， ql-disabled类没有删除，导致公式编辑框看不见*/
                const container = this.$refs.root.querySelector('.in-editor.ql-container.ql-snow.ql-disabled');
                container && container.classList.remove('ql-disabled');
                this.editor = null;
                editorDom.innerHTML = '';
            } else {
                // 处理初始化的props
                content = this.value;
                this.options.readOnly = this.readOnly;
                this.options.placeholder = this.placeholder;
                this.configOptionsToolbar(this.textSub, 1, { script: 'sub' });
                this.configOptionsToolbar(this.textSuper, 1, { script: 'super' });
                this.configOptionsToolbar(this.formula, 3, 'formula');
            }

            this.editor = new Quill(editorDom, this.options);

            // 自定义图片上传
            const toolbar = this.editor.getModule('toolbar');
            toolbar.addHandler('image', () => {
                document.getElementById('uploadButton').click();
            });
            // 兼容处理 截图自动上传
            this.editor.root.addEventListener('paste', (event) => {
                if (
                    event.clipboardData
                    && event.clipboardData.files
                    && event.clipboardData.files.length
                ) {
                    event.preventDefault();
                    this.$refs.uploader.uploadFiles(event.clipboardData.files);
                }
            }, true);

            // 恢复内容区文本

            if (this.readOnly) {
                this.editor.root.innerHTML = content;
            } else {
                const delta = this.editor.clipboard.convert({
                    html: this.removeMathTag(content),
                });
                this.editor.setContents(delta);
            }

            this.editor.on('text-change', (delta, OldDelta, source) => {
                let contentText = this.editor.root.innerHTML;
                if (['<p><br></p>', '<p></p>'].includes(contentText)) {
                    contentText = '';
                }
                contentText = this.removeMathTag(contentText);
                if (source === 'user') {
                    this.$emit('update:value', contentText);
                    this.$emit('input', contentText);
                    this.$emit('change', { value: contentText });
                }
            });
        },
        configEditorToolBarOptions(val, arrIndex, insertItem) {
            this.configOptionsToolbar(val, arrIndex, insertItem);
            this.toolbar = JSON.parse(JSON.stringify(this.options.modules.toolbar));
        },
        configOptionsToolbar(val, arrIndex, insertItem) {
            const updateOptions = this.options.modules.toolbar.container[arrIndex];
            let deleteIndex = 0; let
                insertIndex = 0;
            let hasTextSub = false; let hasTextSuper = false; let
                hasFormula = false;
            let currentHandleItem = false;
            for (let i = 0; i < updateOptions.length; i++) {
                if (updateOptions[i] === 'formula') {
                    hasFormula = true;
                } else if (updateOptions[i].script && updateOptions[i].script === 'sub') {
                    hasTextSub = true;
                } else if (updateOptions[i].script && updateOptions[i].script === 'super') {
                    hasTextSuper = true;
                }
            }
            if (insertItem === 'formula') {
                deleteIndex = -3;
                insertIndex = 3;
                currentHandleItem = hasFormula;
            } else if (insertItem.script === 'sub') {
                deleteIndex = -1;
                insertIndex = updateOptions.length;
                currentHandleItem = hasTextSub;
            } else if (insertItem.script === 'super') {
                if (hasTextSub) {
                    deleteIndex = -2;
                    insertIndex = -1;
                } else {
                    deleteIndex = -1;
                    insertIndex = updateOptions.length;
                }
                currentHandleItem = hasTextSuper;
            }
            if (currentHandleItem && !val) {
                updateOptions.splice(deleteIndex, 1);
            } else if (!currentHandleItem && val) {
                updateOptions.splice(insertIndex, 0, insertItem);
            }
        },
        isShowToolBar(val) {
            const toolbar = this.$refs.root.querySelector('.ql-toolbar.ql-snow');
            const editorContext = this.$refs.root.querySelector('.ql-toolbar.ql-snow + .ql-container.ql-snow');
            if (val) {
                toolbar.style.display = 'none';
                editorContext.style.border = '0px';
            } else {
                toolbar.style.display = 'block';
                editorContext.style.border = '1px solid #e3e4e5';
                editorContext.style.borderTop = '0px';
            }
        },
        insertImg($event) {
            const range = this.editor.getSelection();
            if (range) {
                this.editor.insertEmbed(range.index, 'image', '' + $event.item.url);
                this.$emit('update:value', this.editor.root.innerHTML);
            }
        },
        showErrorMsg($event) {
            this.$toast.error($event.name + ' ' + $event.message);
        },
        errorSize($event) {
            this.$toast.warning($event.message);
        },
        /**
         * 插入公式后会有<math></math>标签，导致渲染报错，去除
         */
        removeMathTag(content) {
            const mathReg = new RegExp('<math.*?>.*?<\\/math>', 'g');
            if(mathReg.test(content)){
                content = content.replace(mathReg, '');
            }
            return content;
        }
    },
};
</script>

<style module>
.root {}
</style>
