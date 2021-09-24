<template>
    <div ref="root" :class="$style.root">
        <div class="in-editor">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './css/index.css'
import './css/font.css'
import './node_modules/katex/dist/katex.css';

import Quill from "quill"
import { addQuillTitle } from './js/addToolTip.js'
import customIcon from './js/custom-Icon.js'

// 替换自定义字体设置
let fonts = [false, 'SimSun','Hiragino-Sans-GB','PingFang-SC','STSong','STFangsong','STKaiti','Arial', 'Times-New-Roman', 'Comic-Sans-MS', 'Courier-New', 'Georgia'];
let Font = Quill.import('formats/font');
Font.whitelist = fonts;

// 替换自定义字号大小设置
let Size = Quill.import('attributors/style/size');
let sizes = ['9px', '10px', '11px', '12px', false, '16px', '18px', '20px', '22px', '24px', '26px', '28px','36px','42px','48px','72px'];
Size.whitelist = sizes;
Quill.register(Size, true);

let Colors = ['#ffffff', '#010101', '#e73521', '#f1a039', '#fffe54', '#b4f551', '#8cdcfd', '#4042cb', '#d856f6',
              '#eeeeee', '#777777', '#f5c9bc', '#fae1b9', '#fff2d0', '#ddead8', '#e5f8fe', '#cfc7f0', '#f9e5fe',
              '#dddddd', '#555555', '#de9c9c', '#f2bb61', '#fae5a4', '#b8d98a', '#99d2e3', '#867ee3', '#de9af1',
              '#cccccc', '#333333', '#ce6f6b', '#e89233', '#f9d977', '#95bc45', '#73c0ea', '#424bb2', '#bd52d8',
              '#999999', '#222222', '#b82718', '#d55a26', '#f4ba3f', '#708c28', '#3e88f3', '#2d42ab', '#9330cb'];

export default {
    name: 'lcap-rich-text-editor',
    props: {
        value: String,
        textSub: Boolean,
        textSuper: Boolean,
        formula: Boolean,
        placeholder: {
            type: String,
            default: ""
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editor: null,
            toolbar: {
                container: [
                    [{'header': 1}, {'header': 2}, {'header': 3}, {'font': fonts}, {'size': sizes}],
                    ['bold', 'italic', 'underline', 'strike', {'color': Colors}, {'background': Colors}],
                    [{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video', 'blockquote', 'code-block'],
                    ['clean'],
                    // [
                    //     {'table': 'TD'},
                    //     // {'table-insert-row': 'TIR'},
                    //     // {'table-insert-column': 'TIC'},
                    //     // {'table-delete-row': 'TDR'},
                    //     // {'table-delete-column': 'TDC'}
                    // ]
                ]
            },
            options: {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: [
                            [{'header': 1}, {'header': 2}, {'header': 3}, {'font': fonts}, {'size': sizes}],
                            ['bold', 'italic', 'underline', 'strike', {'color': Colors}, {'background': Colors}],
                            [{'align': []}, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video', 'blockquote', 'code-block'],
                            ['clean'],
                            // [
                            //     {'table': 'TD'},
                            //     // {'table-insert-row': 'TIR'},
                            //     // {'table-insert-column': 'TIC'},
                            //     // {'table-delete-row': 'TDR'},
                            //     // {'table-delete-column': 'TDC'}
                            // ]
                        ]
                    }
                },
                placeholder: this.placeholder,
                readOnly: this.readOnly
            }
        }
    },
    watch: {
        toolbar (val) {
            if (!this.editor) {
                return
            }
            this.options.modules.toolbar = val;
            this.reRender();
        },
        value(val) {
            if (!this.editor) {
                return
            }

            let content = this.editor.root.innerHTML;
            if (val && val !== content) {
                let delta = this.editor.clipboard.convert({
                    html: val
                });
                this.editor.setContents(delta);
            }
        },
        textSub(val) {
            this.configEditorToolBarOptions(val, 1, {'script': 'sub'});
        },
        textSuper(val) {
            this.configEditorToolBarOptions(val, 1, {'script': 'super'});
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
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.reRender();
        });
    },
    methods: {
        reRender() {
            customIcon();
            this.init();
            this.isShowToolBar(this.readOnly);
            addQuillTitle();
        },
        init() {
            let editorDom = this.$el.querySelector('.in-editor');
            let content = '';

            // 删除quill实例以及工具栏DOM
            if (this.editor !== null) {
                content = this.editor.root.innerHTML;
                this.$refs.root.querySelector('.ql-toolbar.ql-snow').remove();
                this.editor = null;
                editorDom.innerHTML = '';
            } else {
                // 处理初始化的props
                content = this.value;
                this.options.readOnly = this.readOnly;
                this.options.placeholder = this.placeholder;
                this.configOptionsToolbar(this.textSub, 1, {'script': 'sub'});
                this.configOptionsToolbar(this.textSuper, 1, {'script': 'super'});
                this.configOptionsToolbar(this.formula, 3, 'formula');
            }

            this.editor = new Quill(editorDom, this.options);

            // 恢复内容区文本
            let delta = this.editor.clipboard.convert({
                html: content
            });
            this.editor.setContents(delta);

            this.editor.on('text-change', (delta, OldDelta, source) => {
                if (source === 'user') {
                    this.$emit('input', this.editor.root.innerHTML);
                    this.$emit('update:value', this.editor.root.innerHTML);
                }
                this.$emit('change', this.editor.root.innerHTML);
            });
        },
        configEditorToolBarOptions(val, arrIndex, insertItem) {
            this.configOptionsToolbar(val, arrIndex, insertItem);
            this.toolbar = JSON.parse(JSON.stringify(this.options.modules.toolbar));
        },
        configOptionsToolbar(val, arrIndex, insertItem) {
            let updateOptions = this.options.modules.toolbar.container[arrIndex];
            let deleteIndex = 0, insertIndex = 0;
            if (insertItem === 'formula') {
                deleteIndex = -3;
                insertIndex = 3;
            } else if (insertItem.script === 'sub') {
                deleteIndex = -1;
                insertIndex = updateOptions.length;
            } else if (insertItem.script === 'super') {
                for (let i = 0; i < updateOptions.length; i++) {
                    if (updateOptions[i].script && updateOptions[i].script === 'sub') {
                        deleteIndex = -2;
                        insertIndex = -1;
                    } else if (i === updateOptions.length - 1){
                        deleteIndex = -1;
                        insertIndex = updateOptions.length;
                    }
                }
            }
            if (!val) {
                updateOptions.splice(deleteIndex, 1);
            } else {
                updateOptions.splice(insertIndex, 0, insertItem);
            }
        },
        isShowToolBar(val) {
            let toolbar = this.$refs.root.querySelector('.ql-toolbar.ql-snow');
            let editorContext = this.$refs.root.querySelector('.ql-toolbar.ql-snow + .ql-container.ql-snow');
            if (val) {
                toolbar.style.display = 'none';
                editorContext.style.borderTop = "1px solid #ccc";
            } else {
                toolbar.style.display = 'block';
                editorContext.style.borderTop = "0px";
            }
        }
    }
};
</script>

<style module>
.root {}
</style>
