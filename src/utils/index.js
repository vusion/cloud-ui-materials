export const addTreeLevel = function (data) {
  const arrayTreeAddLevel = (
    array,
    levelName = 'curIndex',
    childrenName = 'children',
  ) => {
    if (!Array.isArray(array)) return [];
    const recursive = (array, level = 0) => {
      level++;
      return array.map((v, index) => {
        v[levelName] = level;
        const child = v[childrenName];
        if (child && child.length) recursive(child, level);
        return v;
      });
    };
    return recursive(array);
  };
  arrayTreeAddLevel(data);
  return data;
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
      } else if (
        Object.prototype.toString.call(res) === '[object Object]' &&
        Array.isArray(res.list)
      ) {
        final.data = res.list;
      } else if (
        Object.prototype.toString.call(res) === '[object Object]' &&
        res.content
      ) {
        final.data = res.content;
      } else {
        final.data = res;
      }
    };
  }

  if (Array.isArray(dataSource)) {
    final.data = dataSource;
  } else if (
    Object.prototype.toString.call(dataSource) === '[object Object]' &&
    Array.isArray(dataSource.list)
  ) {
    final.data = dataSource.list;
  } else if (
    Object.prototype.toString.call(dataSource) === '[object Object]' &&
    dataSource.content
  ) {
    final.data = dataSource.content;
  } else if (typeof dataSource === 'function') {
    final.load = createLoad(dataSource);
  }
  return final;
};
