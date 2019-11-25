import XAceEditor from 'x-ace-editor.vue';

export default {
    name: 'x-ace-editor',
    extends: XAceEditor,
    props: {
        options: {
            type: Object,
            default() {
                return {
                    showPrintMargin: false,
                };
            },
        },
        themeMode: {
            type: String,
            default: 'no-follow',
        },
    },
};
