import cursorMixin from '../../mixins/cursor-mixin';
const TASK_NODE = ['UserTask', 'AutoTask', 'ApprovalTask', 'InitiateTask', 'SubmitTask', 'CCTask']
export function makeProcessNode(WrappedComponent) {
    return {
        template: `
            <wrapped
                @instancePressStart="onInstancePressStart"
                @instancemousemove="onMousemove"
                @mouseenter="onEnter"
                @mouseleave="onLeave"
                :node="node"
                :isHover="isHover" />
        `,
        mixins: [cursorMixin],
        inject: [
            'setHover',
            'checkIsHover',
            'poppups',
            'closePoppup',
        ],
        components: {
            wrapped: WrappedComponent,
        },
        props: {
            node: Object,
        },
        computed: {
            isHover() {
                return this.checkIsHover(this.node);
            },
            poppupMeta() {
                return this.poppups.poppupMeta;
            },
        },
        methods: {
            onInstancePressStart(event) {
                event.detail.bubbles = false;
                event.detail.preventDefault();
                // const { clientX, clientY, offsetX, offsetY } = event.detail.event;
                // this.resetHelperLineSegment();
                // this.setMovingSource(this.node, [clientX, clientY], [offsetX, offsetY]);
                // this.setGrabingCursor(event);

            },
            onEnter(event) {
                if(TASK_NODE.includes(this.node.type)) {
                    this.openInfo(event);
                }
            },
            onLeave() {
                this.closePoppup();
            },
            onMousemove(event) {
                this.setPointerCursor(event);
                this.setHover(this.node);
            },
            openInfo(event) {
                const { currentTarget } = event;
                const jflow = currentTarget._jflow;
                const p = [currentTarget.width/2 + 8/jflow.scale, 0];
                const gp = currentTarget.calculateToRealWorld(p);
                const { x, y } = jflow.DOMwrapper.getBoundingClientRect();
                const position = {
                    clientX: gp[0] + x,
                    clientY: gp[1] + y,
                }
                if (this.poppupMeta.timer) {
                    clearTimeout(this.poppupMeta.timer);
                }
                if(this.poppupMeta.active) {
                    Object.assign(this.poppupMeta, {
                        type: 'info',
                        ...position,
                        active: true,
                        target: this.node,
                    });
                } else {
                    this.poppupMeta.timer = setTimeout(() => {
                        Object.assign(this.poppupMeta, {
                            type: 'info',
                            ...position,
                            active: true,
                            target: this.node,
                        });
                    }, 500);
                }
            },
        },
    };
}
