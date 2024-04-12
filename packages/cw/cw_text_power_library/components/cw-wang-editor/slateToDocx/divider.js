import { BorderStyle, Paragraph } from 'docx';

export default (node, parser) => {
    return new Paragraph({
        text: '',
        border: {
            bottom: {
                color: '000000',
                space: 0,
                style: BorderStyle.SINGLE,
                size: 8, // size is 1/8pt
            },
        },
        spacing: {
            before: 200,
            after: 200,
            line: 0,
        },
    });
};
