import { NumberProperties, Style } from 'docx';

export default {
    'list-item': (node, parser) => {
        const p = parser({ ...node, type: 'paragraph' });

        p.properties.push(new Style('ListParagraph'));

        if (!node.ordered) {
            p.properties.push(new NumberProperties(1, node.level || 0));
            // p.properties.numberingReferences.push({
            //     reference: 'weditor-unorder-bullet',
            //     instance: 0,
            // });
            // p.properties.push(
            //     new NumberProperties(
            //         `weditor-unorder-bullet-0`,
            //         node.level || 0
            //     )
            // );
        } else {
            p.properties.push(new NumberProperties(2, node.level || 0));
            // p.properties.numberingReferences.push({
            //     reference: 'weditor-order-numbering',
            //     instance: 0,
            // });
            // p.properties.push(
            //     new NumberProperties(
            //         `weditor-order-numbering-0`,
            //         node.level || 0
            //     )
            // );
        }

        return p;
    },
};
