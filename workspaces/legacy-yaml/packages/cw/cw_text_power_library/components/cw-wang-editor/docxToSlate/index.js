import JSZip from 'jszip';
import get from 'lodash.get';

const is = (type) => (node) => {
    return node.tagName === type;
};

const caseMath = (cases) => {
    return (...args) => {
        for (const [condition, action] of cases) {
            if (condition(...args)) return action(...args);
        }
    };
};

const createParse = (cases) => {
    const _parser = caseMath(cases);
    return (node, ops = {}) => {
        const parser = (node) =>
            _parser(node, parser, { ...ops, parseProps, findTarget });
        return parser(node);

        function parseProps(propTag) {
            if (!propTag) return {};
            const remainAttrs = {};
            propTag.getAttributeNames().forEach((name) => {
                remainAttrs[name] = propTag.getAttribute(name);
            });

            Array.from(propTag.children).forEach((tag) => {
                remainAttrs[tag.tagName] = parseProps(tag);
            });
            return remainAttrs;
        }

        function findTarget(tag, targetTagName) {
            if (tag.tagName === targetTagName) return tag;
            const children = Array.from(tag.children);
            for (const t of children) {
                const ans = findTarget(t, targetTagName);
                if (ans) return ans;
            }
            return null;
        }
    };
};

const isText = (node) => {
    if (node.tagName === 'w:r') return true;
    return false;
};

const parseImage = (node, parser, { findTarget, getRel }) => {
    const blip = findTarget(node, 'a:blip');
    const relId = blip.getAttribute('r:embed');
    const src = getRel(relId);
    if (!src) return null;
    return {
        type: 'image',
        alt: '',
        children: [{ text: '' }],
        src,
        style: {},
    };
};

const parseText = (node, _parser, options) => {
    const { parseProps, findTarget } = options;
    // const drawing = findTarget(node, 'w:drawing');
    const children = Array.from(node.children);
    if (children.findIndex((v) => v.tagName === 'w:drawing') > -1)
        return parseImage(node, _parser, options);
    const propTag = children.find((v) => v.tagName === 'w:rPr');
    const props = parseProps(propTag);
    const textTag = findTarget(node, 'w:t');
    if (!textTag) return null;
    return Object.assign(
        {
            text: textTag.textContent,
        },
        props['w:b'] && { bold: true },
        (props['w:i'] || props['w:iCs']) && { italic: true },
        get(props, ['w:strike']) && { through: true },
        get(props, ['w:vertAlign', 'w:val']) === 'superscrpit' && {
            sup: true,
        },
        get(props, ['w:vertAlign', 'w:val']) === 'subscript' && {
            sub: true,
        },
        get(props, ['w:u']) && { underline: true },
        props['w:sz'] && { fontSize: `${props['w:sz']['w:val']}px` },
        get(props, ['w:color', 'w:val']) && {
            color: `#${get(props, ['w:color', 'w:val'])}`,
        },
        get(props, ['w:shd', 'w:color']) && {
            bgColor: `#${get(props, ['w:shd', 'w:color'])}`,
        }
    );
};

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter((item) => item !== './index.js');
const rules = keys.reduce((acc, key) => {
    const m = context(key);
    const plugin = m.default;
    if (typeof plugin === 'function') {
        const type = /\.\/(\S+)\.js/.exec(key)[1];
        acc.push([is(`w:${type}`), plugin, type]);
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

const innerParser = createParse(rules);

export const parser = async (file, uploadImage) => {
    const zip = await JSZip.loadAsync(file);
    const str = await zip.file('word/document.xml').async('string');
    const domparser = new DOMParser();
    const xml = domparser.parseFromString(str, 'text/xml');
    window.hsj = xml;
    const relMap = await prepareRels();
    const nodes = Array.from(xml.children[0].children[0].children).map((v) =>
        innerParser(v, { getRel, uploadImage })
    );

    return nodes.filter(Boolean);

    function getRel(relId) {
        return relMap[relId].target;
    }

    async function prepareRels() {
        const relsContent = await zip
            .file('word/_rels/document.xml.rels')
            .async('string');
        const relsXml = domparser.parseFromString(relsContent, 'text/xml');
        const _relations = Array.from(relsXml.children[0].children).map(
            (tag) => {
                const _type = tag.getAttribute('Type');
                const id = tag.getAttribute('Id');
                const target = tag.getAttribute('Target');
                return {
                    type: _type.split('/').reverse()[0],
                    id,
                    target,
                };
            }
        );
        const relations = await Promise.all(
            _relations.map(async ({ type, id, target }) => {
                if (type === 'image' && target.startsWith('media')) {
                    const src = await new Promise(async (res) => {
                        const arraybuffer = await zip
                            .file(`word/${target}`)
                            .async('arraybuffer');
                        const ext = target.split('.').reverse()[0];
                        const blob = new Blob([arraybuffer], {
                            type: `image/${ext}`,
                        });
                        if (uploadImage) {
                            uploadImage(blob).then((v) => res(v));
                        } else {
                            const reader = new FileReader();
                            reader.onload = (e) => res(e.target.result);
                            reader.readAsDataURL(blob);
                        }
                    });
                    return [
                        id,
                        {
                            type,
                            id,
                            target: src,
                        },
                    ];
                }
                return [
                    id,
                    {
                        type,
                        id,
                        target,
                    },
                ];
            })
        );
        return Object.fromEntries(relations);
    }
};
