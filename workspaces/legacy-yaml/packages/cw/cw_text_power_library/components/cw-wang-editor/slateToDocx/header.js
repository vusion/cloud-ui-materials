import { HeadingLevel, Style } from 'docx';

const headingMap = {
    header1: HeadingLevel.HEADING_1,
    header2: HeadingLevel.HEADING_2,
    header3: HeadingLevel.HEADING_3,
    header4: HeadingLevel.HEADING_4,
    header5: HeadingLevel.HEADING_5,
};

const parseHead = (node, parser) => {
    const p = parser({ ...node, type: 'paragraph' });
    p.properties.push(new Style(headingMap[node.type]));
    return p;
};
const rule = Array.from({ length: 5 }).reduce((acc, _, i) => {
    acc[`header${i + 1}`] = parseHead;
    return acc;
}, {});
export default rule;
