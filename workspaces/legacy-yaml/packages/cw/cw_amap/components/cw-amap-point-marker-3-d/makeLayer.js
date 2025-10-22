export function makeLayerStore(textureMap, loca) {
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
    layers.unshift(makeZMarkerLayerForText(textureMap, loca, emptySource));

    return {
        updateGeo,
        queryFeature,
        destroy,
        scale,
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

    function scale(v) {
        layers.forEach((layer) => layer.scale(v));
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
        scale,
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

    function scale(scale) {
        layer.setStyle({
            size: function(i, feat) {
                if (feat.properties.type === type)
                    return [90 / scale, 90 / scale];
                return [0, 0]; // 不符合的不显示
            },
            unit: 'meter',
            duration: 2000,
            animate: true,
            texture: texture,
        });
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
            return `<div class="hsj" style="width: 120px; cursor: pointer; height: 120px; background: url(${
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
        scale,
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

    function scale(scale) {
        layer.setStyle({
            size: [60 / scale, 60 / scale],
            content: (i, feat) => {
                return `<div class="hsj" style="width: 120px; cursor: pointer; height: 120px; background: url(${
                    textureMap[feat.properties.type].bottom
                });"></div>`;
            },
            unit: 'meter',
            rotation: 0,
            alwaysFront: true,
            altitude: 15,
        });
    }
}

function makeZMarkerLayerForText(textureMap, loca, emptySource) {
    let layer = new Loca.ZMarkerLayer({
        zIndex: 120,
        depth: false,
        loca,
    });
    layer.setSource(emptySource);
    layer.setStyle({
        content: (i, feat) => {
            const props = feat.properties;
            return `<div style="width: 490px; height: 228px; padding: 0 0;"><p style="text-align:center; height:80px; line-height:80px;font-size:40px;border-radius: 15px; text-align:center; margin:0; padding:5px;">${props.textContent}</p></div>`;
        },
        unit: 'meter',
        rotation: 0,
        alwaysFront: true,
        size: [250, 100],
        altitude: 0,
    });
    return {
        updateGeo,
        queryFeature,
        destroy,
        scale,
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

    function scale(scale) {
        layer.setStyle({
            size: [250 / scale, 100 / scale],
            content: (i, feat) => {
                const props = feat.properties;
                return `<div style="width: 490px; height: 228px; padding: 0 0;"><p style="text-align:center; height:80px; line-height:80px;font-size:40px;border-radius: 15px; text-align:center; margin:0; padding:5px;">${props.textContent}</p></div>`;
            },
            unit: 'meter',
            rotation: 0,
            alwaysFront: true,
            altitude: 0,
        });
    }
}
