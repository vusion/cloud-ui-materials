import poppupWrapper from './poppup-wrapper.vue';
import infoPoppup from './info-poppup.vue';

function getComponent(type) {
    switch (type) {
        case 'info':
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
        const targetComponent = getComponent(meta.type);
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
