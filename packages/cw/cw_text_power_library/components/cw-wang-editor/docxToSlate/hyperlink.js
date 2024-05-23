export default (node, parser, { getRel }) => {
    const children = Array.from(node.children);
    const cs = children
        .filter((v) => v.tagName !== 'w:pPr')
        .map(parser)
        .filter(Boolean);
    if (cs.length === 0) {
        cs.push({ text: '' });
    }
    return Object.assign({
        type: 'link',
        children: cs,
        url: getRel(node.getAttribute('r:id')),
    });
};
