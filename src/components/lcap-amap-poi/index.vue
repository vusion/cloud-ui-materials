<template>
<div class="root">
    <div id="container-map" class="container">
        <div id="pickerBox">
            <input id="pickerInput" placeholder="输入关键字选取地点">
            <div id="poiInfo"></div>
        </div>
    </div>
</div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    name: 'lcap-amap-poi',
    props: {
        city: {
            type: String,
        },
    },
    data() {
        return {
            map: null,
            poiInfo: null,
        };
    },
    computed: {
    },
    watch: {
        city: {
            handler(val) {
                this.initMap();
            },
            immediate: false,
        },
    },

    mounted() {
        this.initMap();
    },
    created() {
        window._AMapSecurityConfig = {
            securityJsCode: 'aef6b461d527c3fb575e4e66a61c1d24',
        };
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: 'cf96f8685c24cfd8f0cfe96336d34927',
                version: '2.0',
                AMapUI: {
                    version: '1.1',
                    plugins: ['misc/PoiPicker'],
                },
            }).then((AMap) => {
                this.map = new AMap.Map('container-map', {
                    city: this.city || '杭州',
                    lang: 'zh_cn',
                    zoom: 10,
                });
                const map = this.map;
                function poiPickerReady(poiPicker) {
                    window.poiPicker = poiPicker;

                    const marker = new AMap.Marker();

                    const infoWindow = new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -20),
                    });

                    poiPicker.on('poiPicked', (poiResult) => {
                        const source = poiResult.source;
                        const poi = poiResult.item;
                        const info = {
                            source,
                            id: poi.id,
                            name: poi.name,
                            location: poi.location.toString(),
                            address: poi.address,
                        };

                        marker.setMap(map);
                        infoWindow.setMap(map);

                        marker.setPosition(poi.location);
                        infoWindow.setPosition(poi.location);

                        infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
                        infoWindow.open(map, marker.getPosition());

                        map.setCenter(marker.getPosition());
                        this.poiInfo = info;
                        // eslint-disable-next-line no-console
                        console.log(this.poiInfo);
                        this.$emit('select', JSON.stringify(info, null, 2));
                    });

                    poiPicker.onCityReady(() => {
                        poiPicker.suggest('美食');
                    });
                }
                const poiPicker = new window.AMapUI.PoiPicker({
                    city: '杭州',
                    input: 'pickerInput',
                });

                // 初始化poiPicker
                poiPickerReady.call(this, poiPicker);
            });
        },
        poiPicked() {
            if (!this.poiInfo) {
                this.$toast.show('请先选择POI信息');
            }
            return this.poiInfo;
        },
    },
};
</script>

<style scoped>
.root {
    width: 100%;
    height: 500px;
}
.container {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0px;
    font-size: 13px;
}
#pickerBox {
    position: absolute;
    z-index: 9999;
    top: 50px;
    right: 30px;
    width: 300px;
}

#pickerInput {
    width: 200px;
    padding: 5px 5px;
}

#poiInfo {
    background: #fff;
}

.amap_lib_placeSearch .poibox.highlight {
    background-color: #CAE1FF;
}

.amap_lib_placeSearch .poi-more {
    display: none!important;
}
</style>
