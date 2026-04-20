import {
    ShadingType,
    Table,
    TableCell,
    TableLayoutType,
    TableRow,
    WidthType,
} from 'docx';

const parseTable = (node, parser, { getDom, editorWidth }) => {
    const _tableRows = node.children.map(parser);
    const tableRows = _tableRows.filter(Boolean);
    const headCellEls = node.children[0].children.map(getDom);
    const columnWidths = getColWidth(headCellEls, editorWidth);

    return new Table({
        rows: tableRows,

        layout: TableLayoutType.FIXED,
        columns: columnWidths.length,
        columnWidths,
    });
};
const parseTableRow = (node, parser) => {
    const tableCells = node.children.map(parser);
    const isHeader = !!node.children[0].isHeader;
    return new TableRow({
        children: tableCells,
        tableHeader: isHeader,
    });
};
const parseTableCell = (node, parser, { getTableCssConfig }) => {
    // const elements = node.children.map(parser);
    const { headerColor } = getTableCssConfig();
    return new TableCell(
        Object.assign(
            {
                children: [
                    parser({
                        type: 'paragraph',
                        children: node.children,
                        textAlign:
                            node.textAlign ||
                            (node.isHeader ? 'center' : 'left'), //表格默认居中
                    }),
                ],
                // width: { size: `${Math.floor(100 / 7)}%` },
                margin: {
                    top: '3pt',
                    right: '5pt',
                    bottom: '3pt',
                    left: '5pt',
                },
            },
            node.isHeader && {
                shading: Object.assign({
                    type: ShadingType.SOLID,
                    color: headerColor,
                }),
            }
        )
    );
};

const getColWidth = (headCellEls, editorWidth) => {
    return headCellEls.map((el) =>
        Math.floor((el.clientWidth / editorWidth) * 9638)
    ); // // total page width is 9638 DXA for A4 portrait
};

export default {
    table: parseTable,
    'table-row': parseTableRow,
    'table-cell': parseTableCell,
};
