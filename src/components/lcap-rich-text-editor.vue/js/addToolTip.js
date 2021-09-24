const titleConfig = {
    'ql-header': '标题',
    'ql-font': '字体',
    'ql-size': '字号',
    'ql-bold': '加粗',
    'ql-italic': '倾斜',
    'ql-underline': '下划线',
    'ql-strike': '删除线',
    'ql-color': '字体颜色',
    'ql-background': '字体背景色',
    'ql-script': '上标/下标',
    'ql-align': '对齐',
    'ql-list': '列表',
    'ql-indent': '缩进',
    'ql-link': '插入链接',
    'ql-image': '插入图片',
    'ql-video': '插入视频',
    'ql-formula': '插入公式',
    'ql-blockquote': '引用',
    'ql-code': '代码',
    'ql-code-block': '代码',
    'ql-clean': '清除格式',
    'ql-table': '表格',
};

export function addQuillTitle() {
    const oToolBar = document.querySelector('.ql-toolbar'),
    aButton = oToolBar.querySelectorAll('button'),
    aSelect = oToolBar.querySelectorAll('select');
    aButton.forEach(function (item) {
        if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标';
        } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '增加缩进' : item.title = '减少缩进';
        } else if (item.className === 'ql-list') {
            item.value === 'ordered' ? item.title = '编号' : item.title = '项目符号';
        } else {
            item.title = titleConfig[item.classList[0]];
        }
    });
    aSelect.forEach(function (item) {
        item.parentNode.title = titleConfig[item.classList[0]];
    });
}