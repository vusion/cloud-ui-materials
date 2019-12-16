import { MEmitter } from 'cloud-ui.vusion';

export default {
    name: 's-sidebar',
    mixins: [MEmitter],
    props: {
        config: Array,
        isSub: { type: Boolean, default: false },
    },
    computed: {
        rootName() {
            return this.isSub ? 'div' : 'u-sidebar';
        },
    },
    methods: {
        openParent($event) {
            if ($event.expanded) {
                this.$contact('u-sidebar-group', (parentVM) => {
                    parentVM.toggle(true);
                });
            }
        },
    },
};
