<script>
import Vue from 'vue';
import SEmpty from './s-empty.vue';

export default {
    components: {
        SEmpty,
    },
    functional: true,
    name: 'cust-community-transition',
    props: {
        name: {
            type: String,
            default: 'horization-slide',
        },
    },
    render(h, context) {
        const isDev = Vue.prototype.$env && Vue.prototype.$env.VUE_APP_DESIGNER;
        const { data, props, slots } = context;
        let children = [];
        const defaults = slots().default;
        if (Array.isArray(defaults) && defaults.length > 0) {
            children = defaults.map((vnode) => {
                if (
                    vnode.data &&
                    vnode.data.ref != undefined &&
                    vnode.data.key === undefined &&
                    vnode.key === undefined
                ) {
                    vnode.data.key = vnode.data.ref;
                    vnode.key = vnode.data.ref;
                }
                return vnode;
            });
        } else if (isDev && data.attrs && data.attrs['vusion-node-path']) {
            children = [h(SEmpty, { key: '__internal_s_empty' })];
        }
        return h(
            !isDev ? 'transition-group' : 'div',
            {
                ...data,
                props: {
                    name: props.name,
                    tag: 'div',
                },
                attrs: {
                    ...data.attrs,
                    'vusion-slot-name': 'default',
                },
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    ...data.style,
                },
                on: data.on,
            },
            children
        );
    },
};
</script>

<style>
.horization-slide-enter-active {
    animation: var(
        --horization-slide-enter-animation,
        slideIn var(--slide-timeout, 1s)
    );
}
.horization-slide-leave-active {
    animation: var(
        --horization-slide-leave-animation,
        slideOut var(--slide-timeout, 1s)
    );
}
@keyframes slideIn {
    0% {
        transform: translateX(50%);
        opacity: 0;
    }
    100% {
        transform: translateX(-50%);
        opacity: 1;
    }
}

@keyframes slideOut {
    0% {
        transform: translateX(50%);
        opacity: 1;
    }
    100% {
        transform: translateX(-50%);
        opacity: 0;
    }
}
</style>
