import get from 'lodash.get';
import { computePosition, offset, shift, flip, arrow } from '@floating-ui/dom';

export default ({ listenMove = true, listenZoom = true } = {}) => ({
    props: {
        needMoveAnimate: {
            type: Boolean,
            default: () => true,
        },
        moveDuration: {
            type: Number,
            default: () => 100,
        },
        hasInfoWindow: {
            type: Boolean,
            default: () => true,
        },
        value: {
            type: [String, Number],
            default: () => null,
        },
    },
    watch: {
        value() {
            this.watchValue();
        },
    },
    data() {
        return {
            selectedPoint: null,
            infoWindowMarker: null,
            hiddenInfoWindow: false,
            viewMode: '3D',
        };
    },
    created() {
        this.$on('maploaded', ({ AMap, mapInstance }) => {
            this.infoWindowMarker = new AMap.Marker({
                position: this.center,
                content: `<div style="width: 2px; height: 2px; background:transparent"></div>`,
                map: this.mapInstance,
                offset: [-1, -1],
            });
            this.infoWindowMarker.on('moveend', () => {
                window.requestAnimationFrame(() => {
                    this.updateInfoWindowPos();
                });
            });
            mapInstance.on('mapmove', () => {
                if (listenMove) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
            mapInstance.on('zoomchange', () => {
                if (listenZoom) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
            mapInstance.on('rotatechange', () => {
                if (listenZoom) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
            mapInstance.on('pitchchange', () => {
                const pitch = this.mapInstance.getPitch();
                if (pitch < 2) {
                    this.viewMode = '2D';
                } else {
                    this.viewMode = '3D';
                }
                if (listenZoom) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
        });
    },
    methods: {
        watchValue() {
            console.log(
                '🚀 ~ file: infowindow.js:68 ~ watchValue ~ watchValue:'
            );
            if (
                this.selectedPoint &&
                get(this.selectedPoint, this.idField) === this.value
            ) {
                return;
            }
            if (this.value != undefined) {
                if (
                    !this.currentDataSource ||
                    !Array.isArray(this.currentDataSource.data)
                ) {
                    return;
                }
                const data = this.currentDataSource.data;
                const idx = data.findIndex((item) => {
                    return get(item, this.idField) === this.value;
                });
                if (!~idx) {
                    console.warn(
                        `当前地图的点状数据源中没有对应id[${this.value}]的点`
                    );
                    this.clearSelectedItem();
                } else {
                    this.moveMarker(
                        this.currentDataSource.data[idx].position,
                        this.currentDataSource.data[idx]
                    );
                }
            } else {
                this.clearSelectedItem();
            }
        },
        moveMarker(position, selectedPoint) {
            this.selectedPoint = selectedPoint;
            this.$emit('update:value', get(selectedPoint, this.idField), this);
            if (this.infoWindowMarker && this.hasInfoWindow) {
                this.infoWindowMarker.moveTo(position, {
                    duration: 0,
                    autoRotation: false,
                });
                this.mapInstance.setCenter(position);
            }
        },
        updateInfoWindowPos() {
            if (!this.infoWindowMarker || !this.infoWindowMarker.dom) {
                return;
            }

            const style = window.getComputedStyle(this.infoWindowMarker.dom);
            const top = parseFloat(style.getPropertyValue('top').slice(0, -2));
            const left = parseFloat(
                style.getPropertyValue('left').slice(0, -2)
            );
            const display = style.getPropertyValue('display');
            if (top <= 0 || left <= 0 || display === 'none') {
                // this.clearSelectedItem();
                this.hiddenInfoWindow = true;
                return;
            }
            this.hiddenInfoWindow = false;

            if (!this.$refs.infoWindow || !this.$refs.infoWindowArrow) return;
            computePosition(this.infoWindowMarker.dom, this.$refs.infoWindow, {
                placement: 'top',
                middleware: [
                    offset(60),
                    shift(),
                    flip(),
                    // arrow({ element: this.$refs.infoWindowArrow }),
                ],
            }).then(({ x, y, placement, middlewareData }) => {
                const targetDiv = this.$refs.infoWindow;
                const arrowDiv = this.$refs.infoWindowArrow;
                if (!targetDiv || !arrowDiv) return;
                targetDiv.style.left = `${x}px`;
                targetDiv.style.top = `${y}px`;

                // Object.assign(arrowDiv.style, {
                //     left: x != null ? `${middlewareData.arrow.x}px` : '',
                //     top: y != null ? `${middlewareData.arrow.y}px` : '',
                // });
                // arrowDiv.setAttribute('placement', placement);
            });
        },

        clearSelectedItem() {
            this.selectedPoint = null;
            this.$emit('update:value', null, this);
        },
    },
});
