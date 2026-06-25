import Component from '../index';

export default {
  id: 'relation-map-view-examples',
  title: '组件列表/RelationMapView/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<relation-map-view  v-bind="$props"></relation-map-view>',
  }),
  args: {
    dataSource: ()=> [
        {
          title: "销售端",
          rows: [
            // 合同 
            [
              { label: "报价单", value: "xxxxxxxxxxxxxxxx", readonly:true },
              { label: "报价单", value: "xxxxxxxxxxxxxxxx", },
              { label: "销售合同", value: "HC23L07L059" }
            ],
            // 货物 
            [
              { label: "发货单", value: "HC23L07L059-1" }
            ],
            // 资金 
            [
              { label: "销售核销单", value: "HC23L07L059-1-21", highlight: true }
            ],
            // 发票 
            [
              { label: "销售发票申请单", value: "FFPHC23L07L059" }
            ]
          ]
        },
        {
          title: "采购端",
          rows: [
            [
              { label: "采购合同", value: "HC23L07L059" ,links:['HC23L07L059-01']},
              { label: "采购合同", value: "HC23L07L0529", links:['HC23L07L059-02','HC23L07L059-01']}
            ],
            [
              { label: "到货单", value: "HC23L07L059-01" },
              { label: "到货单", value: "HC23L07L059-02" }
            ],
            [
              { label: "采购核销单", value: "JS-HC23L07L059" }
            ],
            [
              { label: "采购发票", value: "2024PI00006" },
              { label: "采购发票", value: "2024PI00034" }
            ]
          ]
        },
        {
          title: "销售退货",
          rows: [
            [],
            [ { label: "退货单", value: "HC23L07L060-02" } ],
            [],
            []
          ]
        },
        {
          title: "采购退货",
          rows: [
            [],
            [ { label: "退货单", value: "HC23L07L060-02" } ],
            [],
            []
          ]
        }
      ]
  },
};
