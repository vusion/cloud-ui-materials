export const traverseNode = (node, fn, parentNode) => {
    fn(node, parentNode);
    return Array.from(node.childNodes).forEach((n) =>
        traverseNode(n, fn, node)
    );
};

export const processHTML = async (html, upload) => {
    const domBody = new DOMParser().parseFromString(html, 'text/html').body;
    const needUploadImgs = [];
    traverseNode(domBody, (node, parentNode) => {
        if (node instanceof HTMLImageElement) {
            const src = node.getAttribute('src');
            if (src.startsWith('data:image')) {
                needUploadImgs.push({
                    node,
                    src,
                });
            } else if (parentNode && src.startsWith('file://')) {
                parentNode.removeChild(node);
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
