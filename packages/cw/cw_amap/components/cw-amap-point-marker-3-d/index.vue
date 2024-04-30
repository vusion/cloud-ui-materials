<template>
    <div :class="$style.root">
        <div
            v-if="!inDesigner && !loadingError"
            style="width: 100%; height: 100%"
        >
            <div :class="$style.container" ref="amap"></div>
            <div :class="$style.TDButton" @click="handleTDClick">
                {{ viewMode }}
            </div>
            <div
                v-if="
                    hasInfoWindow &&
                        selectedPoint &&
                        $scopedSlots.item &&
                        !hiddenInfoWindow
                "
                ref="infoWindow"
                :class="$style.infoWindow"
            >
                <div :class="$style.infoWindowContent">
                    <slot name="item" :item="selectedPoint"></slot>
                    <a
                        :class="$style.infoWindowClose"
                        @click="clearSelectedItem"
                    >
                        x
                    </a>
                </div>
                <div
                    ref="infoWindowArrow"
                    :class="$style.infoWindowArrow"
                ></div>
            </div>
        </div>
        <div v-if="loadingError" :class="$style.containertip">
            地图不可用，请前往「应用配置」页面「自定义参数配置」，配置key和密钥。如果您已经配置Key，请发布预览后重新刷新页面。
        </div>
        <img
            v-if="inDesigner"
            :src="mapPNG"
            style="width: 100%; height: 100%; object-fit: cover"
        />
        <div
            v-if="inDesigner && hasInfoWindow"
            style="
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 10;
          "
        >
            <div s-empty="true" vusion-slot-name="item">
                <slot name="item" :item="selectedItem"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { getAMapInstance } from '../../utils/getAMapInstance';
import { createMapMarkerStore } from '../../utils/createMapMarkerStore';
import supportDatasource from '../../mixins/support.datasource';
import infoWindow from '../../mixins/infowindow';
import mapPNG from '../../assets/map.png';
import debounce from 'lodash.debounce';

import { makeLayerStore } from './makeLayer';
import get from 'lodash.get';

export default {
    name: 'cw-amap-point-maker-3-d',
    mixins: [supportDatasource, infoWindow()],
    props: {
        center: {
            type: Array,
            default: () => [116.59008979797363, 39.90058428630659],
        },
        textureMap: {
            type: Object,
            default: () => ({
                blue: {
                    top:
                        'https://a.amap.com/Loca/static/loca-v2/demos/images/scan_blue.png',
                    bottom:
                        'https://a.amap.com/Loca/static/loca-v2/demos/images/triangle_blue.png',
                },
                yellow: {
                    top:
                        'https://a.amap.com/Loca/static/loca-v2/demos/images/scan_yellow.png',
                    bottom:
                        'https://a.amap.com/Loca/static/loca-v2/demos/images/triangle_yellow.png',
                },
            }),
        },
    },

    data() {
        return {
            loadingError: null,
            mapPNG,
        };
    },
    computed: {
        inDesigner() {
            // return true;
            return this.$env.VUE_APP_DESIGNER;
        },
    },
    created() {
        this.watchScaleFn = debounce(
            this.watchScale.bind(this),
            this.debounceTime === undefined ? 10 : this.debounceTime
            // 1000
        );
    },

    mounted() {
        if (this.inDesigner) return;
        this.initAMap();
    },

    destroyed() {
        if (this.scatterLayerStore) {
            this.scatterLayerStore.destroy();
            this.scatterLayerStore = null;
        }
        if (this.geoDataSource) {
            this.geoDataSource.destroy();
            this.geoDataSource = null;
        }
        if (this.mapInstance) {
            this.mapInstance.clearMap();
            this.mapInstance.destroy();
            this.mapInstance = null;
        }
    },

    watch: {
        'currentDataSource.data'() {
            if (!window.Loca || !this.scatterLayerStore) return;
            this.clearSelectedItem();
            this.updateGeoDataSource(this.currentDataSource.data);
            this.scatterLayerStore.updateGeo(this.geoDataSource);
            this.$nextTick(() => {
                this.watchValue();
            });
        },
        center() {
            if (this.mapInstance && this.center.length === 2)
                this.mapInstance.setCenter(this.center);
        },
        scale() {
            this.watchScaleFn();
        },
    },

    methods: {
        initAMap() {
            getAMapInstance().then(
                async () => {
                    const map = new AMap.Map(
                        this.$refs.amap,
                        Object.assign(
                            {
                                zoom: 16.82,
                                pitch: 60,
                                rotation: 205,
                                viewMode: '3D',
                            },
                            Array.isArray(this.center) &&
                                this.center.length === 2 && {
                                    center: this.center,
                                }
                        )
                    );

                    map.addControl(
                        new AMap.ControlBar({
                            position: {
                                bottom: '124px',
                                right: '0px',
                            },
                            showZoomBar: true,
                        })
                    );
                    map.addControl(
                        new AMap.ToolBar({
                            position: {
                                bottom: '15px',
                                right: '30px',
                            },
                        })
                    );

                    this.mapInstance = map;
                    this.$emit('maploaded', {
                        AMap,
                        mapInstance: this.mapInstance,
                    });

                    const loca = new Loca.Container({
                        map,
                    });

                    this.scatterLayerStore = makeLayerStore(
                        this.textureMap,
                        loca
                    );

                    map.on('click', (event) => {
                        const tmp = this.scatterLayerStore.queryFeature([
                            event.pixel.x,
                            event.pixel.y,
                        ]);
                        if (tmp)
                            this.moveMarker(tmp.coordinates, tmp.properties);
                    });
                    // 启动帧
                    loca.animate.start();

                    if (this.currentDataSource.data) {
                        this.updateGeoDataSource(this.currentDataSource.data);
                        this.scatterLayerStore.updateGeo(this.geoDataSource);
                    }
                },
                (e) => {
                    this.loadingError = e.message;
                }
            );
        },

        updateGeoDataSource(data) {
            if (this.geoDataSource) {
                this.geoDataSource.destroy();
            }
            const tmp = data.map((point) => {
                Object.entries({
                    id: this.idField,
                    type: this.typeField,
                    position: this.positionField,
                    textContent: this.textContentField,
                }).reduce((acc, [key, value]) => {
                    acc[key] = get(point, value);
                    return acc;
                }, point);
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: point.position,
                    },
                    properties: point,
                };
            });
            this.geoDataSource = new Loca.GeoJSONSource({
                data: {
                    type: 'FeatureCollection',
                    features: tmp,
                },
            });
        },

        getInner() {
            return {
                mapInstance: this.mapInstance,
                AMap: this.AMap,
            };
        },

        handleTDClick() {
            if (this.viewMode === '3D') {
                this.mapInstance.setPitch(0);
            } else {
                this.mapInstance.setPitch(90);
            }
        },

        watchScale() {
            if (this.scatterLayerStore) {
                this.scatterLayerStore.scale(this.scale);
            }
        },
    },
};
</script>

<style module>
.root {
    width: 100%;
    height: 500px;
    min-width: 100px;
    position: relative;
}

.container {
    width: 100%;
    height: 100%;
}

.containertip {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    color: #fff;
}

.infoWindow {
    position: absolute;
    z-index: 121;
    display: block;
    pointer-events: auto;
    /* overflow: auto; */
}

.infoWindowContent {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    text-align: left;
    background: #fff;
    line-height: 1.4;
    padding: 10px 18px 10px 10px;
}

.infoWindowClose {
    position: absolute;
    right: 0px;
    top: 0px;
    color: #c3c3c3;
    text-decoration: none;
    font: 700 16px/14px Tahoma, Verdana, sans-serif;
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.infoWindowArrow {
    position: absolute;
    width: 8px;
    height: 8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}

.infoWindowArrow[placement='top'] {
    border-top: 8px solid #fff;
}
.infoWindowArrow[placement='bottom'] {
    border-bottom: 8px solid #fff;
    top: 0;
    transform: translateY(-100%);
}

.circleMarker {
    border-radius: 99999px;
    border: 1px solid;
    background: red;
    opacity: 0.4;
}

.root div[s-empty]:empty {
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    text-align: left;
    background: #fff;
    line-height: 1.4;
    padding: 10px 18px 10px 10px;
    text-align: center;
    width: 30%;
    height: 30%;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
}

.root div[s-empty]:empty::before {
    content: '+';
    font-size: 20px;
    line-height: 12px;
    display: inline-block;
    margin-bottom: 2px;
}

.root .TDButton {
    position: absolute;
    bottom: 86px;
    right: 46px;
    transform: translateX(50%);
    border: 1px solid #eee;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    cursor: pointer;
}
</style>
