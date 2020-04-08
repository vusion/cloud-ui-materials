import Vue from 'vue';
import VueCytoscape from 'vue-cytoscape';
Vue.use(VueCytoscape);

import colors from './colors';
const style = [
    {
        selector: 'node',
        css: {
            label: 'data(id)',
            shape: 'rectangle',
            width: 'label',
            height: 'label',
            padding: 8,
            color: colors['color-base'],
            'font-size': 14,
            'background-color': colors['background-color-base'],
            'border-width': 2,
            'border-color': colors['border-color-base'],
            'text-valign': 'center',
            'text-halign': 'center',
            // 'compound-sizing-wrt-labels': 'include',
        },
    },
    {
        selector: 'node[color="primary"]',
        css: {
            color: 'white',
            'background-color': colors['brand-primary'],
            'border-color': colors['brand-primary'],
        },
    },
    {
        selector: 'node[color="success"]',
        css: {
            color: 'white',
            'background-color': colors['brand-success'],
            'border-color': colors['brand-success'],
        },
    },
    {
        selector: 'node[color="normal"]',
        css: {
            color: 'white',
            'background-color': colors['brand-normal'],
            'border-color': colors['brand-normal'],
        },
    },
    {
        selector: 'node[color="problem"]',
        css: {
            color: 'white',
            'background-color': colors['brand-problem'],
            'border-color': colors['brand-problem'],
        },
    },
    {
        selector: 'node[color="warning"]',
        css: {
            color: 'white',
            'background-color': colors['brand-warning'],
            'border-color': colors['brand-warning'],
        },
    },
    {
        selector: 'node[color="error"]',
        css: {
            color: 'white',
            'background-color': colors['brand-error'],
            'border-color': colors['brand-error'],
        },
    },
    {
        selector: 'node[color="danger"]',
        css: {
            color: 'white',
            'background-color': colors['brand-error'],
            'border-color': colors['brand-error'],
        },
    },
    {
        selector: 'node[color="disabled"]',
        css: {
            color: 'white',
            'background-color': colors['brand-disabled'],
            'border-color': colors['brand-disabled'],
        },
    },
    {
        selector: ':parent',
        css: {
            'text-valign': 'top',
            'text-halign': 'center',
            'background-opacity': 0,
        },
    },
    {
        selector: 'edge',
        css: {
            color: colors['color-base'],
            'font-size': 14,
            width: 2,
            'line-color': colors['color-lighter'],
            'target-arrow-shape': 'triangle',
            'target-arrow-color': colors['color-lighter'],
        },
    },
    {
        selector: 'edge[color="primary"]',
        css: {
            'line-color': colors['brand-primary'],
        },
    },
    {
        selector: 'edge[color="success"]',
        css: {
            'line-color': colors['brand-success'],
        },
    },
    {
        selector: 'edge[color="normal"]',
        css: {
            'line-color': colors['brand-normal'],
        },
    },
    {
        selector: 'edge[color="problem"]',
        css: {
            'line-color': colors['brand-problem'],
        },
    },
    {
        selector: 'edge[color="warning"]',
        css: {
            'line-color': colors['brand-warning'],
        },
    },
    {
        selector: 'edge[color="error"]',
        css: {
            'line-color': colors['brand-error'],
        },
    },
    {
        selector: 'edge[color="danger"]',
        css: {
            'line-color': colors['brand-error'],
        },
    },
    {
        selector: 'edge[color="disabled"]',
        css: {
            'line-color': colors['brand-disabled'],
        },
    },
];

export const URelationsDiagram = {
    name: 'u-relations-diagram',
    props: {
        /**
         * type node = { id: string, label: string, parent: string, color: string }
         * type edge = { id: string, source: string, target: string, color: string }
         *
         * type data = {
         *  nodes: Array<node>,
         *  edges: Array<edge>,
         * }
         */
        data: Object,
        legend: Array,
        layout: { type: [String, Object], default: 'grid' },
        elementStyle: { type: Array, default() { return []; } },
        config: Object,
    },
    data() {
        return {
            elements: this.handleData(this.data),
            currentConfig: Object.assign({
                userZoomingEnabled: false,
                style: [
                    ...style,
                    ...this.elementStyle,
                ],
                minZoom: 0.5,
                maxZoom: 2,
            }, this.config),
            currentLayout: this.handleLayout(this.layout),
            legendConfig: {
                zoomingEnabled: false,
                panningEnabled: false,
                boxSelectionEnabled: false,
                autoungrabify: true,
                // autolock: true,
                autounselectify: true,
                style: [
                    ...style,
                    ...this.elementStyle,
                    {
                        selector: 'node',
                        css: {
                            label: 'data(label)',
                            width: 'label',
                            height: '2',
                            'font-size': 12,
                            padding: 10,
                        },
                    },
                ],
                minZoom: 0.5,
                maxZoom: 2,
            },
            legendElements: this.handleLegend(this.legend),
        };
    },
    watch: {
        data(data) {
            this.elements = this.handleData(data);
        },
        layout(layout) {
            this.currentLayout = this.handleLayout(layout);
            this.runLayout();
        },
    },
    mounted() {
        // 经测试，必须要加 setTimeout
        setTimeout(() => {
            this.runLayout();

            if (!this.legend)
                return;
            const legend = this.$refs.legend.instance;
            legend.layout({
                fit: false,
                name: 'grid',
                rows: 1,
                condense: true,
                padding: 0,
            }).run();
        }, 60);
    },
    methods: {
        handleData(data) {
            if (!data) {
                return [];
            } else {
                const KEYWORDS = ['position', 'selected', 'selectable', 'locked', 'grabbable', 'pannable'];

                const elements = [];
                data.nodes && data.nodes.forEach((node, index) => {
                    const el = Object.assign({}, node);
                    const elData = Object.assign({}, node);

                    Object.keys(el).forEach((key) => {
                        if (KEYWORDS.includes(key))
                            delete elData[key];
                        else
                            delete el[key];
                    });

                    el.data = elData;
                    elements.push(el);
                });
                data.edges && data.edges.forEach((node) => {
                    const el = Object.assign({
                        selectable: false,
                    }, node);
                    const elData = Object.assign({}, node);

                    Object.keys(el).forEach((key) => {
                        if (KEYWORDS.includes(key))
                            delete elData[key];
                        else
                            delete el[key];
                    });

                    el.data = elData;
                    elements.push(el);
                });

                return elements;
            }
        },
        handleLayout(layout) {
            if (typeof layout === 'string')
                return { name: layout };
            else
                return layout;
        },
        runLayout() {
            const cy = this.$refs.cy.instance;
            const layout = cy.layout(this.currentLayout);
            layout.run();
        },
        handleLegend(legend) {
            const elements = [];
            legend && legend.forEach((node, index) => {
                const el = {
                    data: node,
                };
                elements.push(el);
            });

            return elements;
        },
    },
};

export default URelationsDiagram;
