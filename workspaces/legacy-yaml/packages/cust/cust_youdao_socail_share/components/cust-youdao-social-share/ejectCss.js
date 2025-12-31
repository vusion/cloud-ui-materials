let hasStyle = true;

export const ejectCss = () => {
    if (hasStyle) return;
    hasStyle = true;
    const cssSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css';
    const link = document.createElement('link');

    // 设置 CSS 块的内容
    link.href = cssSrc;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 将 style 标签插入到 head 元素中
};
