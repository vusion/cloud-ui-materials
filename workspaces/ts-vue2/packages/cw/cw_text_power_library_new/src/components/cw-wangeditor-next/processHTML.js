export const traverseNode = (node, fn, parentNode) => {
  fn(node, parentNode);
  return Array.from(node.childNodes).forEach((n) => traverseNode(n, fn, node));
};

const TEXT_STYLE_PROPERTIES = [
  'background',
  'background-color',
  'color',
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'line-height',
  'mso-bidi-font-weight',
  'mso-bidi-font-style',
  'mso-highlight',
  'mso-shading',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
];

const TABLE_SIZE_ATTRIBUTES = ['width', 'height'];
const TABLE_SIZE_STYLE_PROPERTIES = [
  'height',
  'max-width',
  'min-width',
  'width',
];

const isTableElement = (node) =>
  ['TABLE', 'COLGROUP', 'COL', 'TBODY', 'THEAD', 'TFOOT', 'TR', 'TD', 'TH'].includes(
    node.tagName,
  );

const removeStyleProperties = (node, properties) => {
  properties.forEach((property) => {
    node.style.removeProperty(property);
  });
  if (!node.getAttribute('style')) {
    node.removeAttribute('style');
  }
};

const normalizeTableElement = (node) => {
  TABLE_SIZE_ATTRIBUTES.forEach((attr) => node.removeAttribute(attr));
  removeStyleProperties(node, TABLE_SIZE_STYLE_PROPERTIES);

  if (node instanceof HTMLTableElement) {
    node.style.width = '100%';
    node.style.maxWidth = '100%';
    node.style.tableLayout = 'fixed';
  }

  if (node instanceof HTMLTableCellElement) {
    node.style.wordBreak = 'break-word';
    node.style.overflowWrap = 'anywhere';
  }
};

export const processHTML = async (html, upload) => {
  const domBody = new DOMParser().parseFromString(html, 'text/html').body;
  const needUploadImgs = [];
  traverseNode(domBody, (node, parentNode) => {
    if (node instanceof HTMLElement) {
      removeStyleProperties(node, TEXT_STYLE_PROPERTIES);
      if (isTableElement(node)) {
        normalizeTableElement(node);
      }
    }

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
