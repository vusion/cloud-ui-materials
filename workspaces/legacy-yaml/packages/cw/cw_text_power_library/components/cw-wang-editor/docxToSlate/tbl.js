import get from 'lodash.get';

const table = (node, parser, { parseProps }) => {
    const children = Array.from(node.children);
    // const propTag = children.find((v) => v.tagName === 'w:pPr');
    // const props = parseProps(propTag);
    return Object.assign({
        type: 'table',
        children: children
            .filter((v) => v.tagName === 'w:tr')
            .map(parser)
            .filter(Boolean),
        width: 'auto',
    });
};

const tableRow = (node, parser, { parseProps }) => {
    const children = Array.from(node.children);
    const propTag = children.find((v) => v.tagName === 'w:trPr');
    const props = parseProps(propTag);
    const cells = children
        .filter((v) => v.tagName === 'w:tc')
        .map(parser)
        .filter(Boolean);
    if (get(props, ['w:tblHeader'])) {
        cells.forEach((v) => {
            v.isHeader = true;
        });
    }
    return Object.assign({
        type: 'table-row',
        children: cells,
    });
};

const tableCell = (node, parser, { parseProps }) => {
    const _children = Array.from(node.children).map(parser).filter(Boolean);
    // table cell 内部只能存在text和inline element
    const children = _children.reduce((acc, v) => acc.concat(v.children), []);
    return Object.assign({
        type: 'table-cell',
        children,
        width: 'auto',
        rowspan: 1,
        colspan: 1,
    });
};

export default {
    'w:tbl': table,
    'w:tr': tableRow,
    'w:tc': tableCell,
};
