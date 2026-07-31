import { Border, BorderStyle, Shading, ShadingType } from 'docx';

export default (node, parser, options) => {
    const p = parser({ ...node, type: 'paragraph' });
    const {
        bgColor,
        selectedBorderColor,
        selectedBorderColorWidth,
        paddingSize,
    } = options.getBlockQuoteCssConfig();
    p.properties.push(
        new Border({
            left: {
                color: selectedBorderColor,
                space: 0,
                style: BorderStyle.SINGLE,
                size: selectedBorderColorWidth * 8, // size is 1/8pt
            },
            right: {
                color: bgColor,
                space: 0,
                style: BorderStyle.SINGLE,
                size: paddingSize * 8, // size is 1/8pt
            },
        })
    );
    p.properties.push(
        new Shading({
            type: ShadingType.SOLID,
            color: bgColor,
        })
    );
    return p;
};
