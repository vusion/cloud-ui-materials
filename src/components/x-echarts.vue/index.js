import './theme';
import VueEcharts from 'vue-echarts';

export default {
    name: 'x-echarts',
    extends: VueEcharts,
    props: {
        theme: { type: [String, Object], default: 'cloud-ui' },
        autoresize: { type: Boolean, default: true },
    },
};
