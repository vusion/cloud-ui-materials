<template>
    <div :class="$style.root">
<<<<<<< HEAD
        <div
            v-if="!inDesigner && !loadingError"
            :class="$style.stage"
            style="width: 100%; height: 100%"
        >
            <div :class="$style.container" ref="amap"></div>

            <!-- 关键改动：改用 v-show 常驻DOM，绑定 infoStyle 控制透明度/指针 -->
            <div
                v-show="selectedPoint && hasInfoWindow"
                ref="infoWindow"
                :class="$style.infoWindow"
                :style="infoStyle"
            >
                <div :class="$style.infoWindowContent">
                    <slot name="item" :item="selectedPoint"></slot>
                    <!-- 改成本地关闭钩子：先淡出再调用原clearSelectedItem -->
                    <a
                        :class="$style.infoWindowClose"
                        @click="onCloseClick"
                    >
                        x
                    </a>
=======
        <div v-if="!inDesigner && !loadingError" style="width: 100%; height: 100%">
            <div :class="$style.container" ref="amap"></div>

            <!-- v-if 改为 v-show，绑定 style 控制离屏/渐显 -->
            <div v-show="hasInfoWindow && selectedPoint && $scopedSlots.item" ref="infoWindow"
                :class="$style.infoWindow" :style="infoWindowStyle">
                <div :class="$style.infoWindowContent">
                    <slot name="item" :item="selectedPoint"></slot>
                    <a :class="$style.infoWindowClose" @click="onCloseClick">x</a>
>>>>>>> 95011f02 (feat:nav and less)
                </div>
                <div ref="infoWindowArrow" :class="$style.infoWindowArrow"></div>
            </div>
        </div>

        <div v-if="loadingError" :class="$style.containertip">
            地图不可用，请前往「应用配置」页面「自定义参数配置」，配置key和密钥。如果您已经配置Key，请发布预览后重新刷新页面。
        </div>

<<<<<<< HEAD
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
=======
        <img v-if="inDesigner" :src="mapPNG" style="width: 100%; height: 100%; object-fit: cover" />
        <div v-if="inDesigner && hasInfoWindow"
            style="width: 100%; height: 100%; position: absolute; top: 0; right: 0; z-index: 10;">
>>>>>>> 95011f02 (feat:nav and less)
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

export default {
    name: 'cw-amap-point-maker-less',
    mixins: [supportDatasource, infoWindow()],
    props: {
        center: {
            type: Array,
            default: () => [120.190941, 30.18635],
        },
        customPointOptions: {
            type: [Function, Object],
            default: () => ({}),
        },
    },
    data() {
        return {
            loadingError: null,
            mapPNG,
<<<<<<< HEAD
            /** 关键新增：控制“先就位后淡入”的样式状态 */
            infoStyle: {
                position: 'absolute',
                left: '-9999px',   // 初始放离屏，避免首帧(0,0)
                top: '-9999px',
                opacity: 0,        // 初始透明
                pointerEvents: 'none',
                transition: 'opacity 160ms ease'
            }
=======

            // —— 防闪烁控制 —— //
            showToken: 0, // 并发令牌，丢弃晚到回调
            infoWindowStyle: {
                visibility: 'hidden', // 首帧完全不可见，避免(0,0)闪现
                opacity: 0,
                left: '-9999px',
                top: '-9999px',
                transition: 'opacity .2s ease',
            },
            _resizeObserver: null,
            _sizeStableTimer: null,
>>>>>>> 95011f02 (feat:nav and less)
        };
    },

    computed: {
        inDesigner() {
            return this.$env.VUE_APP_DESIGNER;
        },
    },
    mounted() {
        if (this.inDesigner) return;
        this.initAMap();
    },
<<<<<<< HEAD
=======

    destroyed() {
        // 清理观察器/定时器
        this._resizeObserver && this._resizeObserver.disconnect();
        clearTimeout(this._sizeStableTimer);

        if (this.pointStore && typeof this.pointStore.destroy === 'function') {
            this.pointStore.destroy();
        }
        this.pointStore = null;
        if (this.mapInstance) {
            this.mapInstance.clearMap();
            this.mapInstance.destroy();
            this.mapInstance = null;
        }
    },

>>>>>>> 95011f02 (feat:nav and less)
    watch: {
        // —— 核心：当选中点变化时，离屏 → 等稳定 → 定位 → 渐显 —— //
        async selectedPoint(val) {
            if (!val) return;
            const token = ++this.showToken;
            this._hideInfoWindow();             // 离屏 & 隐藏
            await this._positionAfterStable(token); // 稳定后定位+显示
        },

        'currentDataSource.data'() {
<<<<<<< HEAD
            this.fadeOutInfoWindowImmediately(); // 避免数据切换时闪
=======
            this._hideInfoWindow();
            this.clearSelectedItem && this.clearSelectedItem();
>>>>>>> 95011f02 (feat:nav and less)
            if (this.pointStore) {
                this.pointStore.update(this.currentDataSource.data);
                this.mapInstance.setFitView();
                this.$nextTick(() => {
                    this.mapInstance.setZoomAndCenter(13, this.center);
                });
            }
        },

        center() {
            if (this.mapInstance) this.mapInstance.setZoomAndCenter(13, this.center);
        },
        /** 关键新增：当选中点或显示状态变化时，执行“先就位后淡入” */
        hasInfoWindow(val) {
            if (val && this.selectedPoint) {
                this.fadeInAfterPosition();
            }
        },
        selectedPoint(val) {
            if (val && this.hasInfoWindow) {
                this.fadeInAfterPosition();
            } else if (!val) {
                this.fadeOutInfoWindowImmediately();
            }
        }
    },
    methods: {
        // ===== 防闪烁工具 =====
        _hideInfoWindow() {
            // 离屏并隐藏，同时清理观察器
            this.infoWindowStyle = {
                ...this.infoWindowStyle,
                visibility: 'hidden',
                opacity: 0,
                left: '-9999px',
                top: '-9999px',
            };
            this._resizeObserver && this._resizeObserver.disconnect();
            clearTimeout(this._sizeStableTimer);
        },
        _showInfoWindow() {
            this.infoWindowStyle = {
                ...this.infoWindowStyle,
                visibility: 'visible',
                opacity: 1,
            };
        },
        async _positionAfterStable(token) {
            // 1) 等 DOM 渲染
            await this.$nextTick();
            // 2) 等地图/布局两帧（双 rAF），确保投影稳定
            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            if (token !== this.showToken) return;

            // 3) 首次定位（只设置 left/top/transform，不改透明度/visibility）
            this.updateInfoWindowPosition && this.updateInfoWindowPosition();

            const el = this.$refs.infoWindow;
            if (!el) return;

            // 4) 等尺寸稳定（插槽可能含图片/异步文本）
            this._resizeObserver && this._resizeObserver.disconnect();
            clearTimeout(this._sizeStableTimer);

            let lastW = el.offsetWidth;
            let lastH = el.offsetHeight;

            const onStable = () => {
                if (token !== this.showToken) return;
                // 最终再定位一次，确保基于稳定尺寸
                this.updateInfoWindowPosition && this.updateInfoWindowPosition();
                this._showInfoWindow();
            };

            // 简单内容：给一个最小窗口
            this._sizeStableTimer = setTimeout(onStable, 80);

            // 富内容：尺寸波动时，稳定 80ms 后再显
            this._resizeObserver = new ResizeObserver(() => {
                clearTimeout(this._sizeStableTimer);
                this._sizeStableTimer = setTimeout(() => {
                    const w = el.offsetWidth;
                    const h = el.offsetHeight;
                    if (w === lastW && h === lastH) {
                        onStable();
                    } else {
                        lastW = w;
                        lastH = h;
                    }
                }, 80);
            });
            this._resizeObserver.observe(el);
        },
        onCloseClick() {
            this._hideInfoWindow();
            this.clearSelectedItem && this.clearSelectedItem();
        },

        // ===== 地图初始化 =====
        initAMap() {
            getAMapInstance(true).then(
                async (AMap) => {
                    this.AMap = AMap;
                    this.mapInstance = new AMap.Map(this.$refs.amap, {
                        center: this.center,
                        zoom: 13,
                        resizeEnable: true,
                    });
<<<<<<< HEAD
                    await new Promise((res) => {
                        this.mapInstance.on('complete', res);
                    });
=======
                    await new Promise((res) => this.mapInstance.on('complete', res));

>>>>>>> 95011f02 (feat:nav and less)
                    this.$emit('maploaded', { AMap, mapInstance: this.mapInstance });

                    this.pointStore = createMapMarkerStore({
                        onMarkClick: (e) => {
                            const extData = e.target.getExtData();
                            this.$emit('click', { ...e, extData });
<<<<<<< HEAD
                            // 原逻辑：内部 mixin 会计算并设置 infoWindow 的 left/top/arrow
=======
>>>>>>> 95011f02 (feat:nav and less)
                            this.moveMarker(extData.position, extData);
                            // 新增：补一手“先就位后淡入”
                            this.fadeInAfterPosition();
                        },
                        getMarkerInstance: (p) => this.getMarkerInstance(p),
                        fieldMaps: {
                            id: this.idField,
                            type: this.typeField,
                            position: this.positionField,
                            textContent: this.textContentField,
                        },
                        customPointOptions: this.customPointOptions,
                        moveDuration: this.needMoveAnimate ? this.moveDuration : 0,
                    });

                    if (this.currentDataSource.data) {
                        this.pointStore.init(this.currentDataSource.data);
                        this.mapInstance.setFitView();
                    }

                    // 地图交互后双 rAF 重新定位，防止刚结束那帧坐标不稳定
                    const safeReposition = () => {
                        const token = this.showToken;
                        requestAnimationFrame(() =>
                            requestAnimationFrame(() => {
                                if (token !== this.showToken) return;
                                if (this.selectedPoint && this.updateInfoWindowPosition) {
                                    this.updateInfoWindowPosition();
                                }
                            })
                        );
                    };
                    this.mapInstance.on('moveend', safeReposition);
                    this.mapInstance.on('zoomend', safeReposition);
                },
                (e) => {
                    this.loadingError = e.message;
                }
            );
        },

        // ===== 各类 marker 工厂 =====
        getMarkerInstance(point) {
            const AMap = this.AMap;
            const { type, text, ...others } = point;
            if (type === 'text') {
                return new AMap.Text({ ...others, map: this.mapInstance });
            }
            if (type === 'circle') {
                const radius = others.radius || 10;
                return new AMap.Marker({
                    ...others,
                    center: others.center || others.position,
                    content: `<div class="${this.$style.circleMarker}" style="width: ${radius}px; height: ${radius}px"></div>`,
                    map: this.mapInstance,
                    offset: [-radius / 2, -radius / 2],
                });
            }
            return new AMap.Marker({ ...others, map: this.mapInstance });
        },

        getInner() {
            return {
                mapInstance: this.mapInstance,
                AMap: this.AMap,
                pointStore: this.pointStore,
            };
        },

        /** —— 闪烁修复核心 —— */

        /** 打开/定位后再淡入 */
        async fadeInAfterPosition() {
            // 先隐藏并禁用点击，等待 mixin/AMap 完成定位（left/top）
            this.infoStyle.opacity = 0;
            this.infoStyle.pointerEvents = 'none';

            // 如果 mixin 还没设置位置，放一个安全兜底（离屏）
            if (!this.$refs.infoWindow || this.infoStyle.left === '-9999px') {
                this.infoStyle.left = '-9999px';
                this.infoStyle.top = '-9999px';
            }

            await this.$nextTick();         // 等DOM更新把定位写进样式
            requestAnimationFrame(() => {   // 再等一帧提交样式
                this.infoStyle.opacity = 1; // 优雅淡入
                this.infoStyle.pointerEvents = 'auto';
            });
        },

        /** 立即淡出并移出可交互（用于数据切换/关窗前态） */
        fadeOutInfoWindowImmediately() {
            this.infoStyle.opacity = 0;
            this.infoStyle.pointerEvents = 'none';
        },

        /** 关闭按钮：先淡出，再调用原有 clearSelectedItem（来自 mixin） */
        onCloseClick() {
            this.fadeOutInfoWindowImmediately();
            setTimeout(() => {
                // 调用 mixin 的原逻辑，重置 selectedPoint/hasInfoWindow 等
                this.clearSelectedItem();
                // 移出可视区域，防止下次打开前出现首帧
                this.infoStyle.left = '-9999px';
                this.infoStyle.top = '-9999px';
            }, 180); // 稍大于 transition 160ms
        },
    },
};
</script>

<style module>

.stage {
position: relative;
width: 100%;
height: 100%;
}

.root {
    width: 100%;
    height: 500px;
    min-width: 100px;
    position: relative;
}
.container { width: 100%; height: 100%; }

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

<<<<<<< HEAD
/* 关键：从首帧就给出定位锚点，避免进入时再切换 transform */
=======
/* 只过渡透明度，避免位置“漂移感” */
>>>>>>> 95011f02 (feat:nav and less)
.infoWindow {
    position: absolute;
    z-index: 121;
    display: block;
    pointer-events: auto;
<<<<<<< HEAD
=======
    transition: opacity .2s ease;
    will-change: transform, opacity;
>>>>>>> 95011f02 (feat:nav and less)
}

.infoWindowContent {
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    border-radius: 2px;
    text-align: left;
    background: #fff;
    line-height: 1.4;
    padding: 10px 18px 10px 10px;
}

.infoWindowContent img {
    /* 若slot内有图片，建议固定宽高或至少这样避免 reflow 抖动 */
    display: block;
    max-width: 100%;
    height: auto;
}

.infoWindowClose {
    position: absolute;
    right: 0;
    top: 0;
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
<<<<<<< HEAD
.infoWindowArrow[placement='top'] { border-top: 8px solid #fff; }
=======

.infoWindowArrow[placement='top'] {
    border-top: 8px solid #fff;
}

>>>>>>> 95011f02 (feat:nav and less)
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
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
</style>
