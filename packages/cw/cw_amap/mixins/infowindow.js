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
    },
    data() {
        return {
            selectedPoint: null,
            infoWindowMarker: null,
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
                this.updateInfoWindowPos();
            });
            mapInstance.on('mapmove', () => {
                if (listenMove) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
            mapInstance.on('zoomchange', () => {
                if (listenZoom) this.updateInfoWindowPos();
                else this.clearSelectedItem();
            });
        });
    },
    methods: {
        moveMarker(position, selectedPoint) {
            if (this.infoWindowMarker && this.hasInfoWindow) {
                this.selectedPoint = selectedPoint;
                this.infoWindowMarker.moveTo(position, {
                    duration: 0,
                    autoRotation: false,
                });
            }
        },
        updateInfoWindowPos() {
            if (
                !this.infoWindowMarker ||
                !this.infoWindowMarker.dom ||
                !this.$refs.infoWindow ||
                !this.$refs.infoWindowArrow
            ) {
                return;
            }
            computePosition(this.infoWindowMarker.dom, this.$refs.infoWindow, {
                middleware: [
                    offset(8),
                    shift(),
                    flip(),
                    arrow({ element: this.$refs.infoWindowArrow }),
                ],
            }).then(({ x, y, placement, middlewareData }) => {
                const targetDiv = this.$refs.infoWindow;
                const arrowDiv = this.$refs.infoWindowArrow;
                if (!targetDiv || !arrowDiv) return;
                targetDiv.style.left = `${x}px`;
                targetDiv.style.top = `${y}px`;

                Object.assign(arrowDiv.style, {
                    left: x != null ? `${middlewareData.arrow.x}px` : '',
                    top: y != null ? `${middlewareData.arrow.y}px` : '',
                });
                arrowDiv.setAttribute('placement', placement);
            });
        },

        clearSelectedItem() {
            this.selectedPoint = null;
        },
    },
});
