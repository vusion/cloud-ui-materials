export const addTreeLevel = function (data) {
    const arrayTreeAddLevel = (
        array,
        levelName = 'curIndex',
        childrenName = 'children',
    ) => {
        if (!Array.isArray(array))
            return [];
        const recursive = (array, level = 0) => {
            level++;
            return array.map((v, index) => {
                v[levelName] = level;
                const child = v[childrenName];
                if (child && child.length)
                    recursive(child, level);
                return v;
            });
        };
        return recursive(array);
    };
    arrayTreeAddLevel(data);
    return data;
};

export const listToTree = function (data, options) {
    const { valueField, parentField, childrenField } = options;

    // Map记录一下
    const nodes = {}; // Record<id, { entity }>
    data.forEach((item) => {
        const id = this.$at(item, valueField);
        if (id) {
            nodes[id] = item;
        }
    });

    const tree = [];
    data.forEach((item) => {
        const parentId = this.$at(item, parentField);
        const parent = nodes[parentId];
        // 没有parentId 或者 parent不存在的不处理
        if (!parentId || !parent) {
            tree.push(item);
        } else {
            if (!this.$at(parent, childrenField)) {
                this.$setAt(parent, childrenField, []);
            }

            this.$at(parent, childrenField).push(item);
        }
    });

    return tree;
};

export const normalizeDataSource = function (dataSource) {
    const final = {
        data: [],
        load: undefined,
    };

    function createLoad(rawLoad) {
        return async function (params = {}) {
            const res = await rawLoad(params);
            if (Array.isArray(res)) {
                final.data = res;
            } else if (Object.prototype.toString.call(res) === '[object Object]' && Array.isArray(res.list)) {
                final.data = res.list;
            } else if (Object.prototype.toString.call(res) === '[object Object]' && res.content) {
                final.data = res.content;
            } else {
                final.data = res;
            }
        };
    }

    if (Array.isArray(dataSource)) {
        final.data = dataSource;
    } else if (
        dataSource instanceof Object
    && dataSource.hasOwnProperty('list')
    && Array.isArray(dataSource.list)
    ) {
        final.data = dataSource.list;
    } else if (typeof dataSource === 'function') {
        final.load = createLoad(dataSource);
    }

    return final;
};
