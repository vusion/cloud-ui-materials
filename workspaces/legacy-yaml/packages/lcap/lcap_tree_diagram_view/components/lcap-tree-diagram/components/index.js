import LcapTree from './tree.vue';

export function install(Vue) {
    if (install.installed) {
        return;
    }

    install.installed = true;

    Vue.component(LcapTree.name, LcapTree);
}

LcapTree.install = install;

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(LcapTree);
}

export default LcapTree;
