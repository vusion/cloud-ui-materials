import { Paragraph } from 'docx';

export default (node, parser, options) => {
    const _texts = node.children
        // .map((v) =>
        //     Object.assign({}, node.bgColor && { bgColor: node.bgColor }, v)
        // )
        .map(parser);
    const texts = _texts.filter(Boolean);
    return new Paragraph(
        Object.assign(
            {
                children: texts,
            },
            node.textAlign && {
                alignment: options.getAlignment(node.textAlign),
            },
            node.indent && {
                indent: {
                    start: '32pt', //fixme: 目前node.indent仅能取值2em, 固定为32px，
                },
            }
        )
    );
};
