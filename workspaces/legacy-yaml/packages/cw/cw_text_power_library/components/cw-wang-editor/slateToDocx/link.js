import { ExternalHyperlink } from 'docx';

export default (node, parser, options) => {
    const _texts = node.children.map(parser);
    const texts = _texts.filter(Boolean);
    return new ExternalHyperlink({
        children: texts,
        link: node.url,
    });
};
