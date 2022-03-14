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
    aSelect = oToolBar.querySelectorAll('.ql-picker');
    aButton.forEach(function (item) {
        if (item.className === 'ql-script') {
            item.value === 'sub' ? item.title = '下标' : item.title = '上标';
        } else if (item.className === 'ql-indent') {
            item.value === '+1' ? item.title = '增加缩进' : item.title = '减少缩进';
        } else if (item.className === 'ql-list') {
            item.value === 'ordered' ? item.title = '编号' : item.title = '项目符号';
        } else if (item.className === 'ql-header') {
            item.title = item.value + "级" + titleConfig[item.classList[0]];
        } else {
            item.title = titleConfig[item.classList[0]];
        }
    });
    aSelect.forEach(function (item) {
        let tipTitle = item.classList[0];
        if (tipTitle === 'ql-align') {
            item.querySelectorAll('.ql-picker-item').forEach((listItem) => {
                 let alignValue = listItem.getAttribute('data-value')
                if (alignValue === 'center') {
                    listItem.title = "居中对齐";
                } else if (alignValue === 'right') {
                    listItem.title = "右对齐";
                } else if (alignValue === 'justify') {
                    listItem.title = "两端对齐";
                } else {
                    listItem.title = "左对齐";
                }
            })
        }
        item.title = titleConfig[tipTitle];
    });
    // 替换下拉框的箭头svg
    const fontPicker = document.querySelectorAll(".ql-font .ql-picker-label");
    const sizePicker = document.querySelectorAll(".ql-size .ql-picker-label");
    const dropIcon = `<svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4L1.30337e-06 -1.47821e-06L6 -4.76837e-07L3 4Z" fill="#BFBFBF"/>
                    </svg>`;
    sizePicker.forEach((item) => {
        item.innerHTML = dropIcon;
    });
    fontPicker.forEach((item) => {
        item.innerHTML = dropIcon;
    });
}