import poppupWrapper from './poppup-wrapper.vue';
import infoPoppup from './info-poppup.vue';
import callSubProcessPoppup from './callSubProcess-info-poppup.vue';

function getComponent(type, node) {
    switch (type) {
        case 'info':
            if(node && node.type === 'CallSubProcess') {
                return callSubProcessPoppup;
            }
            return infoPoppup;
        default:
            return null;
    }
}
export default {
    functional: true,
    props: {
        meta: Object,
    },
    render(c, context) {
        const { meta } = context.props;
        const key = context.data.key;
        const ref = context.data.ref;
        const targetComponent = getComponent(meta.type, meta.target);
        return c(poppupWrapper, {
            props: {
                meta,
            },
        }, [
            c(targetComponent, {
                key,
                props: context.props,
                on: context.listeners,
                ref,
            }),
        ]);
    },
};
