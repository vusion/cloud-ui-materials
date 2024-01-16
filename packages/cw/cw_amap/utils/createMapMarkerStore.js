import get from 'lodash.get';
import merge from 'lodash.merge';

export const createMapMarkerStore = ({
    getMarkerInstance,
    onMarkClick,
    moveDuration = 0,
    fieldMaps = {},
    customPointOptions = {},
}) => {
    const store = new Map();

    return {
        init,
        update,
        removeAll,
    };

    function init(points) {
        removeAll();
        points.forEach((point) => {
            const option = getRealMarkerOptions(point);
            const m = getMarkerInstance(option);
            const id = option.id;
            m.on('click', onMarkClick);
            m.on('touchstart', onMarkClick);
            store.set(id, m);
        });
    }

    function update(newPoints) {
        const { ids: newIDs, map: newIDMap } = newPoints.reduce(
            ({ ids, map }, p) => {
                const option = getRealMarkerOptions(p);
                const id = option.id;
                return {
                    ids: ids.concat(id),
                    map: {
                        ...map,
                        [id]: option,
                    },
                };
            },
            {
                ids: [],
                map: {},
            }
        );
        const newIDSet = new Set(newIDs);
        const oldIDs = Array.from(store.keys());
        const oldIDSet = new Set(oldIDs);
        const allIDSet = new Set(newIDs.concat(oldIDs));

        Array.from(allIDSet.keys()).forEach((id) => {
            const isInOld = oldIDSet.has(id);
            const isInNew = newIDSet.has(id);

            if (isInOld && isInNew) {
                // todo: 目前只更新位置，其余属性视情况增加
                const marker = store.get(id);
                const option = newIDMap[id];
                const { type } = marker.getExtData() || {};
                if (
                    type === option.type &&
                    type !== 'circle' &&
                    moveDuration > 0
                ) {
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
                    marker.setExtData(option.extData);
                } else {
                    // type不相同，移除旧的，新增新的
                    marker.off('click');
                    marker.off('touchstart');
                    marker.setMap(null);
                    store.delete(id);

                    const m = getMarkerInstance(option);
                    m.on('click', onMarkClick);
                    m.on('touchstart', onMarkClick);
                    store.set(id, m);
                }
            } else if (!isInOld) {
                // create
                const option = newIDMap[id];
                const m = getMarkerInstance(option);
                m.on('click', onMarkClick);
                m.on('touchstart', onMarkClick);
                store.set(id, m);
            } else {
                // remove
                const marker = store.get(id);
                marker.off('click');
                marker.off('touchstart');
                marker.setMap(null);
                store.delete(id);
            }
        });
    }

    function removeAll() {
        Array.from(store.entries()).forEach(([_, marker]) => {
            marker.off('click');
            marker.off('touchstart');
            marker.setMap(null);
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
            let ans = { result: customPointOptions };
            customPointOptions(ans); // 由于ide定义的逻辑都是异步函数，但customPointOptions一定要是同步方法，故这里使用另外的方法获取返回值
            customOptions = ans.result;
        }
        return merge({}, point, fieldMapResult, customOptions, {
            extData: {
                ...point,
                ...customOptions,
            },
        });
    }
};
