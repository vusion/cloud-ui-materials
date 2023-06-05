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
