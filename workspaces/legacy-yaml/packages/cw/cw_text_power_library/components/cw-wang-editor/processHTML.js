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
const TABLE_WIDTH_TAGS = ['TD', 'TH', 'COL'];
const TABLE_ALIGN_TAGS = ['TD', 'TH'];
const TEXT_ALIGN_TAGS = ['DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'LI', 'P'];
const TABLE_BOUNDARY_TOLERANCE = 3;

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

const getInlineStyleValue = (element, styleName) => {
    const inlineStyle = element.getAttribute('style') || '';
    const matcher = new RegExp(
        `(?:^|;)\\s*${styleName}\\s*:\\s*([^;]+)`,
        'i'
    );
    const match = inlineStyle.match(matcher);
    return match ? match[1].trim() : '';
};

const parseSizeToPx = (value) => {
    const match = String(value || '')
        .trim()
        .match(/^(\d+(?:\.\d+)?)(pt|px)?$/i);
    if (!match) return '';

    const size = Number(match[1]);
    if (!size) return '';

    const unit = (match[2] || 'px').toLowerCase();
    const px = unit === 'pt' ? size * (4 / 3) : size;
    return String(Math.max(30, Math.round(px)));
};

const getPastedWidth = (element) =>
    parseSizeToPx(getInlineStyleValue(element, 'width')) ||
    parseSizeToPx(element.getAttribute('width'));

const setTableElementWidth = (element, width) => {
    if (!width) return;

    element.setAttribute('width', width);
    element.style.width = `${width}px`;
};

const getTableCells = (table) =>
    Array.from(table.querySelectorAll('td, th')).filter(
        (cell) => cell.closest('table') === table
    );

const getUniqueBoundaries = (values) => {
    const sorted = values.sort((a, b) => a - b);
    return sorted.reduce((result, value) => {
        const previous = result[result.length - 1];
        if (
            previous === undefined ||
            value - previous > TABLE_BOUNDARY_TOLERANCE
        ) {
            result.push(value);
        }
        return result;
    }, []);
};

// Clipboard HTML has enough information to render the original table, but
// wangEditor later rebuilds it from its own columnWidths model. Measure the
// original layout before removing Word styles so that model gets real columns.
const measureTableLayout = (table) => {
    if (typeof document === 'undefined' || !document.body) return null;

    const host = document.createElement('div');
    const clone = table.cloneNode(true);
    host.style.cssText =
        'position:absolute;left:-100000px;top:-100000px;visibility:hidden;display:inline-block;width:max-content;max-width:none;';
    clone.style.maxWidth = 'none';
    host.appendChild(clone);
    document.body.appendChild(host);

    try {
        const tableRect = clone.getBoundingClientRect();
        if (!tableRect.width) return null;

        const cloneCells = getTableCells(clone);
        const boundaries = [tableRect.left, tableRect.right];
        cloneCells.forEach((cell) => {
            const rect = cell.getBoundingClientRect();
            if (rect.width) boundaries.push(rect.left, rect.right);
        });

        const uniqueBoundaries = getUniqueBoundaries(boundaries);
        const columnWidths = uniqueBoundaries
            .slice(1)
            .map((right, index) => Math.round(right - uniqueBoundaries[index]))
            .filter((width) => width > TABLE_BOUNDARY_TOLERANCE);
        const cellWidths = cloneCells.map((cell) => {
            const width = Math.round(cell.getBoundingClientRect().width);
            return width > 1 ? String(width) : '';
        });

        return columnWidths.length && cellWidths.length
            ? { columnWidths, cellWidths }
            : null;
    } finally {
        host.remove();
    }
};

const normalizeTableElement = (element, pastedWidth = '') => {
    const width = TABLE_WIDTH_TAGS.includes(element.tagName)
        ? pastedWidth || getPastedWidth(element)
        : '';
    const textAlign = TABLE_ALIGN_TAGS.includes(element.tagName)
        ? element.style.textAlign
        : '';

    element.removeAttribute('style');
    element.removeAttribute('height');
    element.removeAttribute('width');

    setTableElementWidth(element, width);
    if (textAlign) element.style.textAlign = textAlign;
};

const getTableWidthTargets = (table) => {
    const colgroup = table.querySelector('colgroup');
    const cols = colgroup ? Array.from(colgroup.children) : [];
    if (cols.length) return cols;

    const firstRow = table.querySelector('tr');
    if (!firstRow) return [];

    return Array.from(firstRow.children).filter((child) =>
        TABLE_WIDTH_TAGS.includes(child.tagName)
    );
};

const applyMeasuredTableLayouts = (domBody, tableLayouts) => {
    Array.from(domBody.querySelectorAll('table')).forEach((table) => {
        const layout = tableLayouts.get(table);
        if (!layout) return;

        const oldColgroup = table.querySelector('colgroup');
        if (oldColgroup) oldColgroup.remove();

        const colgroup = document.createElement('colgroup');
        layout.columnWidths.forEach((width) => {
            const col = document.createElement('col');
            setTableElementWidth(col, String(Math.max(30, width)));
            colgroup.appendChild(col);
        });
        table.insertBefore(colgroup, table.firstChild);

        getTableCells(table).forEach((cell, index) => {
            const width = layout.cellWidths[index];
            if (width) setTableElementWidth(cell, width);
        });
    });
};

const fitTableWidths = (domBody, maxTableWidth) => {
    if (!maxTableWidth) return;

    Array.from(domBody.querySelectorAll('table')).forEach((table) => {
        const targets = getTableWidthTargets(table);
        const widths = targets.map((target) =>
            Number(target.getAttribute('width') || 0)
        );
        const totalWidth = widths.reduce((total, width) => total + width, 0);
        if (!totalWidth || totalWidth <= maxTableWidth) return;

        const scale = maxTableWidth / totalWidth;
        targets.forEach((target, index) => {
            const width = Math.max(30, Math.floor(widths[index] * scale));
            setTableElementWidth(target, String(width));
        });

        getTableCells(table).forEach((cell) => {
            const width = Number(cell.getAttribute('width') || 0);
            if (width) {
                setTableElementWidth(
                    cell,
                    String(Math.max(30, Math.floor(width * scale)))
                );
            }
        });
    });
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

    const pastedWidth = TABLE_WIDTH_TAGS.includes(node.tagName)
        ? getPastedWidth(node)
        : '';
    removeAttrs(node, PASTE_ATTRS_TO_REMOVE);
    removeStyleProps(node, PASTE_STYLE_PROPS_TO_REMOVE);
    removeMsoStyleProps(node);

    if (TABLE_TAGS.includes(node.tagName)) {
        normalizeTableElement(node, pastedWidth);
    } else if (TEXT_ALIGN_TAGS.includes(node.tagName)) {
        preserveOnlyTextAlign(node);
    }
};

export const processHTML = async (html, upload, options = {}) => {
    const domBody = new DOMParser().parseFromString(html, 'text/html').body;
    const needUploadImgs = [];
    const nodesToRemove = [];
    const nodesToUnwrap = [];
    const tableLayouts = new WeakMap();
    traverseNode(domBody, (node, parentNode) => {
        if (node instanceof HTMLTableElement) {
            const tableLayout = measureTableLayout(node);
            if (tableLayout) tableLayouts.set(node, tableLayout);
        }
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
    applyMeasuredTableLayouts(domBody, tableLayouts);
    fitTableWidths(domBody, options.maxTableWidth);
    await Promise.all(
        needUploadImgs.map(async ({ node, src }) => {
            const realSrc = await upload(src);
            node.setAttribute('src', realSrc);
        })
    );
    return domBody;
};
