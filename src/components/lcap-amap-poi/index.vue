<template>
<div :class="$style.root" vusion-disabled-copy>
    <div id="container-map" :class="$style.container">
        <div id="pickerBox">
            <input id="pickerInput" placeholder="输入关键字选取地点">
            <div id="poiInfo"></div>
        </div>
        <div :class="$style.containertipwrap" v-show="show">
            <div :class="$style.containertip">地图不可用，请前往「应用详情」页面「地图配置」，配置key和密钥</div>
        </div>
        <div :class="$style.containertipwrap" v-show="show">
            <div :class="$style.containertip">如果您已经配置Key，请重新打开可视化编辑页面</div>
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
            show: false,
            map: null,
            poiInfo: null,
            poiPicker: null,
        };
    },
    computed: {
    },
    watch: {
        city: {
            handler(val) {
                this.changeCity(val);
            },
            immediate: false,
        },
    },

    mounted() {
        this.initMap();
    },
    created() {
        const config = this.getJSON(window.appInfo && window.appInfo.extendedConfig);
        if (config && config.amapCode) {
            window._AMapSecurityConfig = {
                securityJsCode: config.amapCode,
            };
        } else {
            this.show = true;
            // this.$toast.show('请先配置高德地图的code');
        }
        // window._AMapSecurityConfig = {
        //     securityJsCode: 'aef6b461d527c3fb575e4e66a61c1d24',
        // };
    },
    methods: {
        changeCity(val) {
            window.lcapmap.setCity(val);
            window.poiPicker.setCity(val);
            window.poiPicker.searchByKeyword(val);
            window.poiPicker.suggest('美食');
        },
        initMap() {
            const config = this.getJSON(window.appInfo && window.appInfo.extendedConfig);
            if (!config || !config.amapKey) {
                // this.$toast.show('请先配置高德地图的key');
                this.show = true;
                return;
            }
            AMapLoader.load({
                key: config.amapKey,
                // key: 'cf96f8685c24cfd8f0cfe96336d34927',
                version: '2.0',
                AMapUI: {
                    version: '1.1',
                    plugins: ['misc/PoiPicker'],
                },
            }).then((AMap) => {
                console.log(this.city, 777);
                window.lcapmap = this.map = new AMap.Map('container-map', {
                    city: this.city,
                    lang: 'zh_cn',
                    zoom: 10,
                });
                setTimeout(() => {
                    this.map.setCity(this.city);
                }, 3000);
                // window.lcpAmap = this.map;
                // console.log(this.map, 7777);
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
                this.poiPicker = new window.AMapUI.PoiPicker({
                    city: this.city,
                    input: 'pickerInput',
                });

                // 初始化poiPicker
                poiPickerReady.call(this, this.poiPicker);
            });
        },
        poiPicked() {
            if (!this.poiInfo) {
                this.$toast.show('请先选择POI信息');
                return {};
            }
            return this.poiInfo;
        },
        getJSON(obj) {
            try {
                if (typeof obj === 'string') {
                    return JSON.parse(obj);
                }
                return obj || null;
            } catch (error) {
                return null;
            }
        },
    },
};
</script>

<style module>
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
.containertipwrap {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.5);
    align-items:center;
    justify-content: center;
}

.containertip{
    font-family: PingFang SC;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 14px;
/* identical to box height, or 100% */


color: #FFFFFF;
}
</style>
<style>
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
