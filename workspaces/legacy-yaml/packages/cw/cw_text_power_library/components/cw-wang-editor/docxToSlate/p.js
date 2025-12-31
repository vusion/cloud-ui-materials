import get from 'lodash.get';

const alignMap = {
    right: 'right',
    center: 'center',
    both: 'justify',
    left: 'left',
};
export default (node, parser, { parseProps }) => {
    const children = Array.from(node.children);
    const propTag = children.find((v) => v.tagName === 'w:pPr');
    const props = parseProps(propTag);
    const cs = children
        .filter((v) => v.tagName !== 'w:pPr')
        .map(parser)
        .filter(Boolean);
    if (cs.length === 0) {
        cs.push({ text: '' });
    }
    return Object.assign(
        {
            type: 'paragraph',
            children: cs,
        },
        get(props, ['w:jc']) && {
            textAlign: alignMap[get(props, ['w:jc', 'w:val'])],
        },
        /^Heading/.test(get(props, ['w:pStyle', 'w:val'])) && {
            type: get(props, ['w:pStyle', 'w:val']).replace(
                'Heading',
                'header'
            ),
        },
        get(props, ['w:pStyle', 'w:val']) === 'ListParagraph' && {
            type: 'list-item',
            ordered: get(props, ['w:numPr', 'w:numId', 'w:val']) === '2',
            level: parseInt(get(props, ['w:numPr', 'w:ilvl', 'w:val']), 10),
        }
    );
};
