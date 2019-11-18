const asyncLib = {
    loaded: false,
};

export default {
    components: {
        XEcharts: () => import(/* webpackChunkName: "echarts" */ '@cloud-ui/x-echarts.vue')
            .then((component) => {
                asyncLib.loaded = true;
                return component;
            }),
    },
    data() {
        return {
            asyncLib,
            options: {
                title: {
                    text: '甜圈图示例',
                    x: 'left',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['45%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '24',
                                    fontWeight: 'bold',
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: 'white',
                        },
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' },
                        ],
                    },
                ],
            },
        };
    },
};
