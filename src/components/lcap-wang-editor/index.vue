<template>
    <div :class="{ [$style.root]: true, [$style.border]: !readOnly }" ref="root">
        <toolbar
            ref="toolbar"
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :default-config="toolbarConfig"
            :mode="mode"
            v-show="!readOnly"
        ></toolbar>
        <editor
            ref="editor"
            :style="rootStyle"
            :value="currentValue"
            :default-config="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
            @onFocus="onFocus"
            @onBlur="onBlur"
        ></editor>
    </div>
</template>

<script>
import { MField } from 'cloud-ui.vusion';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import '@wangeditor/editor/dist/css/style.css';

export default {
    components: { Editor, Toolbar },
    mixins: [MField],
    props: {
        value: String,
        readOnly: Boolean,
        scroll: { type: Boolean, default: true },
        placeholder: String,
        editorStyle: { type: String, default: '' },
    },
    data() {
        const authorization = this.getCookie('authorization');
        const headers = authorization ? { Authorization: authorization } : {};
        return {
            currentValue: '',
            editor: null,
            toolbarConfig: {},
            editorConfig: {
                readOnly: this.readOnly,
                scroll: this.scroll,
                placeholder: this.placeholder,
                autoFocus: false,
                MENU_CONF: {
                    uploadImage: {
                        server: '/gateway/lowcode/api/v1/app/upload',
                        fieldName: 'file',
                        maxFileSize: 50 * 1024 * 1024, // 50M
                        // 自定义增加 http  header
                        headers,
                        // 自定义插入图片
                        customInsert(res, insertFn) {
                            const url = res.result;
                            insertFn(url);
                        },
                    },
                    uploadVideo: {
                        server: '/gateway/lowcode/api/v1/app/upload',
                        fieldName: 'file',
                        maxFileSize: 1000 * 1024 * 1024, // 1000M
                        // 自定义增加 http  header
                        headers,
                        // 自定义插入视频
                        customInsert(res, insertFn) {
                            const url = res.result;
                            insertFn(url);
                        },
                    },
                },
            },
            mode: 'default', // or 'simple',
            defaultHeight: '',
            editorHeight: {
                height: '180px',
                'min-height': null,
            },
        };
    },
    computed: {
        rootStyle() {
            return {
                ...this.editorHeight,
                ...this.parseStyleAttr(this.editorStyle),
            };
        },
    },
    watch: {
        readOnly(val) {
            val ? this.editor.disable() : this.editor.enable();
        },
        value: {
            handler(v) {
                this.currentValue = v;
            },
            immediate: true,
        },
    },
    beforeDestroy() {
        const { editor } = this;
        if (editor === null)
            return;
        // 组件销毁时，及时销毁编辑器
        editor.destroy();
    },
    methods: {
        onCreated(editor) {
            // 一定要用 Object.seal() ，否则会报错
            this.editor = Object.seal(editor);
            let height = this.$refs.root.style.height;
            setTimeout(() => {
                if (height) {
                    const toolHeight = this.$refs.toolbar.$el.getBoundingClientRect().height;
                    height = this.removePX(height);
                    this.editorHeight.height = height - toolHeight + 'px';
                    this.$refs.root.style.removeProperty('height');
                }
                this.defaultHeight = this.editorHeight.height;
                if (!this.scroll) {
                    this.setHeight();
                }
            });
        },
        onChange(editor) {
            // 添加min-height时，container容器小于editor编辑器高度，click事件需精确触发，体验较差。所以当container容器大于editor编辑器高度时再添加min-height属性
            if (!this.scroll) {
                this.setHeight();
            }
            // 内容为空时不重复赋值，防止表单错误校验
            if (editor.isEmpty() && (!this.currentValue && this.currentValue !== 0))
                return;
            const value = editor.isEmpty() ? '' : editor.getHtml();
            this.currentValue = this.splicing(value);
            this.$emit('change', { value: this.currentValue, editor });
            this.$emit('update:value', this.currentValue);
            this.$emit('input', this.currentValue);
        },
        onFocus(editor) {
            this.$emit('focus', { value: this.currentValue, editor });
        },
        onBlur(editor) {
            this.$emit('blur', { value: this.currentValue, editor });
        },
        getCookie(cname) {
            const name = `${cname}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                const c = ca[i].trim();
                if (c.indexOf(name) === 0)
                    return c.substring(name.length, c.length);
            }
            return '';
        },
        parseStyleAttr(styleStr) {
            const styleObj = styleStr.split(/;/gim).reduce((obj, item) => {
                const arrs = item.trim().split(/:/gim);
                if (arrs.length > 1) {
                    obj[arrs[0].trim()] = arrs[1].trim();
                }
                return obj;
            }, {});

            return styleObj;
        },
        removePX(str) {
            return str.substring(0, str.length - 2);
        },
        setHeight() {
            const textareaNode = this.$refs.editor.$el.querySelector('[data-slate-editor]');
            const currentheight = textareaNode.getBoundingClientRect().height;
            const height = this.editorHeight.height || '';
            if (height && currentheight > this.removePX(height)) {
                this.editorHeight['min-height'] = this.editorHeight.height;
                this.editorHeight.height = null;
            } else if (currentheight <= this.removePX(this.defaultHeight)) {
                this.editorHeight.height = this.defaultHeight;
            }
        },
        // 下面的函数属于hack： 新富文本组件，有序列表缩进，无法保存 https://overmind-project.netease.com/v2/my_workbench/bugdetail/Bug-53081
        // 已向editor-wang提交issues，当bug解决时需删除以下所有函数。
        splicing(oldVal) {
            const tagArr = [
                { openingTag: '<ul>', closingTag: '</ul>' },
                { openingTag: '<ol>', closingTag: '</ol>' },
            ];
            let newVal = oldVal;
            tagArr.forEach(({ openingTag, closingTag }) => {
                let joinValue = '';
                let stack = [];
                newVal.split(openingTag).forEach((str) => {
                    stack.push(true);
                    const endSplitArr = str.split(closingTag);
                    if (endSplitArr.length > 1) {
                        if (stack.length > 2)
                            joinValue = joinValue.slice(0, -openingTag.length);
                        stack = [];
                        if (endSplitArr[1].includes('<p>')) {
                            joinValue += endSplitArr[0] + closingTag + endSplitArr[1];
                        } else {
                            joinValue += endSplitArr[0] + endSplitArr[1] + closingTag;
                        }
                    } else {
                        joinValue += str;
                    }
                    joinValue += openingTag;
                });
                joinValue = joinValue.slice(0, -openingTag.length);
                newVal = joinValue;
            });
            // 内部实现逻辑不兼容，需要重新聚焦光标点
            if (newVal !== oldVal && this.editor.isFocused())
                this.hackfix(newVal);
            return newVal;
        },
        hackfix(newVal) {
            this.editor.clear();
            this.editor.setHtml(newVal);
            this.editor.blur();
            this.editor.focus();
            setTimeout(() => {
                this.editor.moveReverse(1);
                this.editor.move(1);
            });
        },
    },
};
</script>

<style module>
    .root {
        z-index: 1000;
    }

    .border {
        border: 1px solid #ccc;
    }
</style>