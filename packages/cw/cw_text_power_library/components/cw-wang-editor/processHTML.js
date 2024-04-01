export const traverseNode = (node, fn) => {
    fn(node);
    return Array.from(node.childNodes).forEach((n) => traverseNode(n, fn));
};

export const processHTML = async (html, upload) => {
    const domBody = new DOMParser().parseFromString(html, 'text/html').body;
    const needUploadImgs = [];
    traverseNode(domBody, (node) => {
        if (node instanceof HTMLImageElement) {
            const src = node.getAttribute('src');
            if (src.startsWith('data:image')) {
                needUploadImgs.push({
                    node,
                    src,
                });
            }
        }
    });
    await Promise.all(
        needUploadImgs.map(async ({ node, src }) => {
            const realSrc = await upload(src);
            node.setAttribute('src', realSrc);
        })
    );
    return domBody;
};
