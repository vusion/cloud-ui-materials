import {
    TextRun,
    UnderlineType,
    ShadingType,
    AlignmentType,
    convertInchesToTwip,
} from 'docx';

export const traverse = (node) => {};

const is = (type) => (node) => {
    return node.type === type;
};

const caseMath = (cases) => {
    return (...args) => {
        for (const [condition, action] of cases) {
            if (condition(...args)) return action(...args);
        }
    };
};

const alignMap = {
    right: AlignmentType.END,
    center: AlignmentType.CENTER,
    justify: AlignmentType.JUSTIFIED,
    left: AlignmentType.START,
};

const createParse = (cases) => {
    const _parser = caseMath(cases);
    return (node, editor) => {
        const editorEl = editor.toDOMNode(editor);
        // const style = window.getComputedStyle(editorEl);
        // const [paddingLeft, paddingRight] = [
        //     'padding-left',
        //     'padding-right',
        // ].map((key) =>
        //     parseInt(style.getPropertyValue(key).replace('px', 0), 10)
        // );
        const editorWidth = editorEl.clientWidth - 40;
        const parser = (node) =>
            _parser(node, parser, {
                getAlignment,
                getHexColor,
                pxToTwip,
                getBlockQuoteCssConfig,
                getTableCssConfig,
                getDom,
                editorWidth,
            });
        return parser(node);

        function getAlignment(align) {
            return alignMap[align];
        }
        function getHexColor(rgbString) {
            if (!/rgb/.test(rgbString)) return rgbString.replace('#', '');
            const [r, g, b] = rgbString.match(/\d+/g);

            // 将每个通道的值转换为十六进制，并拼接成十六进制颜色字符串
            const toHex = (c) => {
                const hex = parseInt(c, 10).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };

            const hexColor = `${toHex(r)}${toHex(g)}${toHex(b)}`;
            return hexColor;
        }
        function pxToTwip(n) {
            // 默认1px 等价于 1pt
            return convertInchesToTwip(n / 96);
        }
        function getBlockQuoteCssConfig() {
            // todo: 基于实际的el计算
            return {
                bgColor: 'f5f2f0',
                selectedBorderColor: 'B4D5FF',
                selectedBorderColorWidth: 8,
                paddingSize: 10,
            };
        }
        function getTableCssConfig() {
            // todo: 基于实际的el计算
            return {
                headerColor: 'f5f2f0',
            };
        }
        function getDom(node) {
            return editor.toDOMNode(node);
        }
    };
};

const parseText = (node, parser, { getHexColor }) => {
    if (typeof node.text !== 'string' || !!node.type) return null;
    return new TextRun(
        Object.assign(
            {
                text: node.text,
                bold: !!node.bold,
                // code: !!node.code,
                italics: !!node.italic,
                strike: !!node.through,
                superScript: !!node.sup,
                subScript: !!node.sub,
            },
            node.underline && {
                underline: {
                    type: UnderlineType.SINGLE,
                    color: getHexColor(node.color || '#000000'),
                },
            },
            node.fontSize && {
                size: node.fontSize.replace('px', 'pt'),
            },
            node.fontFamily && {
                font: node.fontFamily,
            },
            node.color && {
                color: getHexColor(node.color),
            },
            node.bgColor && {
                shading: Object.assign(
                    {
                        type: ShadingType.SOLID,
                    },
                    node.bgColor && {
                        color: getHexColor(node.bgColor),
                    }
                ),
            }
        )
    );
};
const isText = (node) => {
    if (!node.children && !node.type) return true;
    return false;
};

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter((item) => item !== './index.js');
const rules = keys.reduce((acc, key) => {
    const m = context(key);
    const plugin = m.default;
    if (typeof plugin === 'function') {
        const type = /\.\/(\S+)\.js/.exec(key)[1];
        acc.push([is(type), plugin, type]);
        return acc;
    } else {
        return acc.concat(
            Object.entries(plugin).map(([type, fn]) => [is(type), fn, type])
        );
    }
}, []);

rules.push([isText, parseText]); // 转换文本
rules.push([
    () => true,
    (node) => {
        console.warn('Unsupported element:', node);
    },
]);

export const parser = createParse(rules);
