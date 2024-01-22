// import get from 'lodash.get';
import merge from 'lodash.merge';

export const createMapMarkerStore = ({
    getMarkerInstance,
    onMarkClick,
    moveDuration = 0,
    fieldMaps: _fieldMaps = {},
    customPointOptions = {},
    batchInsert,
}) => {
    const store = new Map();
    const fieldMaps = Object.entries(_fieldMaps).reduce(
        (acc, [k, v]) => ({
            ...acc,
            [k]: v.split('.'),
        }),
        {}
    );

    return {
        init,
        update,
        removeAll,
    };

    function init(points) {
        removeAll();
        const all = points.map((point) => {
            const option = getRealMarkerOptions(point);
            const m = getMarkerInstance(option);
            const id = option.id;
            m.on('click', onMarkClick);
            m.on('touchstart', onMarkClick);
            store.set(id, m);
            return m;
        });
        if (batchInsert && all.length > 0) batchInsert(all);
    }

    function update(newPoints) {
        const newIDs = [];
        const newIDMap = {};
        newPoints.forEach((p) => {
            const option = getRealMarkerOptions(p);
            const id = option.id;
            newIDs.push(id);
            newIDMap[id] = option;
        });
        const newIDSet = new Set(newIDs);
        const oldIDs = Array.from(store.keys());
        const oldIDSet = new Set(oldIDs);
        const allIDSet = new Set(newIDs.concat(oldIDs));

        const newAdded = [];

        Array.from(allIDSet.keys()).forEach((id) => {
            const isInOld = oldIDSet.has(id);
            const isInNew = newIDSet.has(id);

            if (isInOld && isInNew) {
                // todo: 目前只更新位置和文本标注，其余属性视情况增加
                const marker = store.get(id);
                const option = newIDMap[id];
                const {
                    type,
                    textContent: oldTextContent,
                    labelContent: oldLabelContent,
                } = marker.getExtData() || {};
                if (type === option.type && moveDuration > 0) {
                    const oldPosition = marker.getPosition();
                    if (
                        (oldPosition &&
                            option.position &&
                            oldPosition.Lng !== option.position[0]) ||
                        (oldPosition &&
                            option.position &&
                            oldPosition.Lat !== option.position[1])
                    ) {
                        marker.moveTo(option.position, {
                            duration: moveDuration,
                            autoRotation: false,
                        });
                    }
                    if (oldTextContent !== option.extData.textContent) {
                        marker.setText(option.text);
                    }
                    if (oldLabelContent !== option.extData.labelContent) {
                        marker.setLabel(option.label);
                    }
                    marker.setExtData(option.extData);
                } else {
                    // type不相同，移除旧的，新增新的
                    marker.off('click');
                    marker.off('touchstart');
                    marker.remove();
                    store.delete(id);

                    const m = getMarkerInstance(option);
                    newAdded.push(m);
                    m.on('click', onMarkClick);
                    m.on('touchstart', onMarkClick);
                    store.set(id, m);
                }
            } else if (!isInOld) {
                // create
                const option = newIDMap[id];
                const m = getMarkerInstance(option);
                newAdded.push(m);
                m.on('click', onMarkClick);
                m.on('touchstart', onMarkClick);
                store.set(id, m);
            } else {
                // remove
                const marker = store.get(id);
                marker.off('click');
                marker.off('touchstart');
                marker.remove();
                store.delete(id);
            }
        });

        if (batchInsert && newAdded.length > 0) batchInsert(newAdded);
    }

    function removeAll() {
        Array.from(store.entries()).forEach(([_, marker]) => {
            marker.off('click');
            marker.off('touchstart');
            marker.remove();
        });
        store.clear();
    }

    function getRealMarkerOptions(point) {
        const fieldMapResult = Object.entries(fieldMaps).reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: get(point, value),
            }),
            {}
        );
        let customOptions = customPointOptions;
        if (typeof customPointOptions === 'function') {
            let ans = { result: customPointOptions, point };
            customPointOptions(ans); // 由于ide定义的逻辑都是异步函数，但customPointOptions一定要是同步方法，故这里使用另外的方法获取返回值
            customOptions = ans.result;
        }
        const tmp = merge(
            {},
            point,
            fieldMapResult,
            customOptions,
            fieldMapResult.textContent
                ? {
                      text: {
                          content: fieldMapResult.textContent,
                      },
                  }
                : {},
            fieldMapResult.labelContent
                ? {
                      label: {
                          content: fieldMapResult.labelContent,
                      },
                  }
                : {}
        );
        tmp.extData = tmp;
        return tmp;
    }
};

function get(obj, path) {
    let ans = obj;
    for (let i = 0; i < path.length && ans; ++i) {
        ans = ans[path[i]];
    }
    return ans;
}
