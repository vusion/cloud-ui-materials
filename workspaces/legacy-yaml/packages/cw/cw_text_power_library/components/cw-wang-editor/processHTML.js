export const traverseNode = (node, fn, parentNode) => {
    fn(node, parentNode);
    return Array.from(node.childNodes).forEach((n) =>
        traverseNode(n, fn, node)
    );
};

const INLINE_STYLE_TAGS_TO_UNWRAP = ['EM', 'FONT', 'I', 'U'];
const PASTE_NODES_TO_REMOVE = ['LINK', 'META', 'STYLE', 'XML'];
const PASTE_STYLE_PROPS_TO_REMOVE = [
    'background',
    'background-color',
    'border',
    'border-bottom',
    'border-color',
    'border-image',
    'border-left',
    'border-right',
    'border-style',
    'border-top',
    'border-width',
    'color',
    'font-style',
    'mso-highlight',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-fill-color',
    '-webkit-text-fill-color',
];
const PASTE_ATTRS_TO_REMOVE = [
    'background',
    'bgcolor',
    'border',
    'bordercolor',
    'cellpadding',
    'cellspacing',
    'class',
    'color',
    'height',
    'text',
    'valign',
];
const TABLE_TAGS = [
    'TABLE',
    'TBODY',
    'THEAD',
    'TFOOT',
    'TR',
    'TD',
    'TH',
    'COL',
];
const TEXT_ALIGN_TAGS = ['DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'LI', 'P'];

const unwrapNode = (node) => {
    const parentNode = node.parentNode;
    if (!parentNode) return;

    while (node.firstChild) {
        parentNode.insertBefore(node.firstChild, node);
    }
    parentNode.removeChild(node);
};

const removeStyleProps = (element, props) => {
    props.forEach((prop) => element.style.removeProperty(prop));
    if (!element.getAttribute('style')) {
        element.removeAttribute('style');
    }
};

const removeMsoStyleProps = (element) => {
    Array.from(element.style).forEach((prop) => {
        if (prop.indexOf('mso-') === 0) {
            element.style.removeProperty(prop);
        }
    });
};

const preserveOnlyTextAlign = (element) => {
    const textAlign = element.style.textAlign;
    element.removeAttribute('style');
    if (textAlign) {
        element.style.textAlign = textAlign;
    }
};

const removeAttrs = (element, attrs) => {
    attrs.forEach((attr) => element.removeAttribute(attr));
};

const normalizePastedElement = (node, nodesToRemove, nodesToUnwrap) => {
    if (!(node instanceof HTMLElement)) return;

    if (PASTE_NODES_TO_REMOVE.includes(node.tagName)) {
        nodesToRemove.push(node);
        return;
    }

    if (INLINE_STYLE_TAGS_TO_UNWRAP.includes(node.tagName)) {
        nodesToUnwrap.push(node);
    }

    removeAttrs(node, PASTE_ATTRS_TO_REMOVE);
    removeStyleProps(node, PASTE_STYLE_PROPS_TO_REMOVE);
    removeMsoStyleProps(node);

    if (TABLE_TAGS.includes(node.tagName)) {
        node.removeAttribute('style');
        node.removeAttribute('height');
        node.removeAttribute('width');
    } else if (TEXT_ALIGN_TAGS.includes(node.tagName)) {
        preserveOnlyTextAlign(node);
    }
};

export const processHTML = async (html, upload) => {
    const domBody = new DOMParser().parseFromString(html, 'text/html').body;
    const needUploadImgs = [];
    const nodesToRemove = [];
    const nodesToUnwrap = [];
    traverseNode(domBody, (node, parentNode) => {
        normalizePastedElement(node, nodesToRemove, nodesToUnwrap);

        if (node instanceof HTMLImageElement) {
            const src = node.getAttribute('src') || '';
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
    nodesToRemove.forEach((node) => {
        if (node.parentNode) node.parentNode.removeChild(node);
    });
    nodesToUnwrap.forEach(unwrapNode);
    await Promise.all(
        needUploadImgs.map(async ({ node, src }) => {
            const realSrc = await upload(src);
            node.setAttribute('src', realSrc);
        })
    );
    return domBody;
};
