import CustCommunityIconImage from './index.vue';

const REG = /^local:\/\/(\S+)~(.+)$/;
export default {
    name: 'cust-community-icon-image',
    inheritAttrs: false,

    props: {
        src: {
            type: String,
            default: 'local://wenjianjia~linear-gradient(317deg, #89B1FF 3%, #8FD7FF 100%)',
        },
    },
    render(createElement) {
        const src = this.src || 'local://wenjianjia~linear-gradient(317deg, #89B1FF 3%, #8FD7FF 100%)';
        const isLocalIconResult = REG.exec(src);
        if (isLocalIconResult) {
            return createElement(CustCommunityIconImage, {
                props: Object.assign({}, this.$attrs, { backgroundImg: isLocalIconResult[2], icon: isLocalIconResult[1] }),
                attrs: {
                    'vusion-node-tag': this.$attrs['vusion-node-tag'],
                    'vusion-node-path': this.$attrs['vusion-node-path'],
                },
                on: this.$listeners,
                slots: this.$slots,
                scopedSlots: this.$scopedSlots,
            });
        }
        return createElement('u-image', {
            props: Object.assign({}, this.$attrs, { src: this.src }),
            attrs: {
                'vusion-node-tag': this.$attrs['vusion-node-tag'],
                'vusion-node-path': this.$attrs['vusion-node-path'],
            },
            on: this.$listeners,
            slots: this.$slots,
            scopedSlots: this.$scopedSlots,
        });
    },
};
