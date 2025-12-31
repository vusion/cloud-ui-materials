import CustCommunityIconImage from './index.vue';
import CustCommunityIconImageWithMask from './image-with-mask.vue';

const REG = /^(local(?:Img)?):\/\/(\S+)~(.+)$/;
export default {
    name: 'cust-community-icon-image',

    props: {
        src: {
            type: String,
            default:
                'localImg:////test-lcpapp-static.nos-eastchina1.126.net/assets/cloud-ui/1.jpg~linear-gradient(90deg, #5B96CC -2%, rgba(91, 150, 204, 0) 120%)',
        },
        targetStyle: {
            type: Object,
            default: () => ({}),
        },
    },
    render(createElement) {
        const src =
            this.src ||
            'local://wenjianjia~linear-gradient(317deg, #89B1FF 3%, #8FD7FF 100%)';
        const isLocalIconResult = REG.exec(encodeURI(src));

        if (isLocalIconResult) {
            const protocol = isLocalIconResult[1];
            if (protocol === 'local')
                return createElement(CustCommunityIconImage, {
                    props: Object.assign({}, this.$attrs, {
                        icon: isLocalIconResult[2],
                        backgroundImg: decodeURI(isLocalIconResult[3]),
                    }),
                    attrs: {
                        'vusion-node-tag': this.$attrs['vusion-node-tag'],
                        'vusion-node-path': this.$attrs['vusion-node-path'],
                    },
                    on: this.$listeners,
                    slots: this.$slots,
                    scopedSlots: this.$scopedSlots,
                    style: this.targetStyle.icon,
                });
            if (protocol === 'localImg') {
                return createElement(CustCommunityIconImageWithMask, {
                    props: Object.assign({}, this.$attrs, {
                        img: `${isLocalIconResult[2]}`,
                        mask: decodeURI(isLocalIconResult[3]),
                    }),
                    attrs: {
                        'vusion-node-tag': this.$attrs['vusion-node-tag'],
                        'vusion-node-path': this.$attrs['vusion-node-path'],
                    },
                    on: this.$listeners,
                    slots: this.$slots,
                    scopedSlots: this.$scopedSlots,
                    style: this.targetStyle.imgWithMask,
                });
            }
        }
        return createElement('u-image', {
            props: Object.assign({}, this.$attrs, {
                src: this.src,
                fit: 'fill',
            }),
            style: {
                width: '100%',
            },
            attrs: {
                'vusion-node-tag': this.$attrs['vusion-node-tag'],
                'vusion-node-path': this.$attrs['vusion-node-path'],
            },
            on: this.$listeners,
            slots: this.$slots,
            scopedSlots: this.$scopedSlots,
            style: this.targetStyle.img,
        });
    },
};
