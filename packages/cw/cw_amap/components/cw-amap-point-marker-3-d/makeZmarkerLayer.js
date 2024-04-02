export function makeScatterLayerStore(textureMap, loca) {
    const emptySource = new Loca.GeoJSONSource({
        data: {
            type: 'FeatureCollection',
            features: [],
        },
    });
    const layers = Object.entries(textureMap).map(([type, texture]) =>
        makeScatterLayer(type, texture.top, loca, emptySource)
    );
    layers.unshift(makeZMarkerLayer(textureMap, loca, emptySource));

    return {
        updateGeo,
        queryFeature,
        destroy,
    };

    function updateGeo(...args) {
        layers.forEach((layer) => layer.updateGeo(...args));
    }

    function queryFeature(pos) {
        for (const layer of layers) {
            const feature = layer.queryFeature(pos);
            if (feature) return feature;
        }
        return null;
    }

    function destroy() {
        layers.forEach((layer) => layer.destroy());
    }
}

// scatterLayer不支持在texture属性上使用function映射，故有多少类型的点就要映射多少类型layer
function makeScatterLayer(type, texture, loca, emptySource) {
    let layer = new Loca.ScatterLayer({
        zIndex: 110,
        altitude: 15,
        opacity: 1,
        loca,
    });
    layer.setSource(emptySource);
    layer.setStyle({
        unit: 'meter',
        size: function(i, feat) {
            if (feat.properties.type === type) return [90, 90];
            return [0, 0]; // 不符合的不显示
        },
        duration: 2000,
        animate: true,
        texture: texture,
    });

    return {
        updateGeo,
        queryFeature,
        destroy,
    };

    function updateGeo(geo) {
        layer.setSource(geo);
    }

    function queryFeature(pos) {
        const feature = layer.queryFeature(pos);
        if (!feature) return null;
        if (feature.properties.type !== type) return null;
        return feature;
    }

    function destroy() {
        if (layer) layer.destroy();
        layer = null;
    }
}

function makeZMarkerLayer(textureMap, loca, emptySource) {
    let layer = new Loca.ZMarkerLayer({
        zIndex: 119,
        depth: false,
        loca,
    });
    layer.setSource(emptySource);
    layer.setStyle({
        content: (i, feat) => {
            return `<div style="width: 120px; cursor: pointer; height: 120px; background: url(${
                textureMap[feat.properties.type].bottom
            });"></div>`;
        },
        unit: 'meter',
        rotation: 0,
        alwaysFront: true,
        size: [60, 60],
        altitude: 15,
    });
    layer.addAnimate({
        key: 'altitude',
        value: [0, 1],
        random: true,
        transform: 1000,
        delay: 2000,
        yoyo: true,
        repeat: 999999,
    });
    return {
        updateGeo,
        queryFeature,
        destroy,
    };

    function updateGeo(geo) {
        layer.setSource(geo);
    }

    function queryFeature(pos) {
        const feature = layer.queryFeature(pos);
        if (!feature) return null;
        return feature;
    }

    function destroy() {
        if (layer) layer.destroy();
        layer = null;
    }
}
