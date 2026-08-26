import Component from '../index.vue';

export default {
  id: 'cw-print-designer-examples',
  title: '组件列表/CwPrintDesigner/示例',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: { CwPrintDesigner: Component },
    template: `
      <div>
        <el-button @click="handleClick">打印</el-button>
        <cw-print-designer ref="printDesigner" :isShowPrint="true" :showHeader="true" :showFooter="true">
          <template #header>
            <span class="pdf-footer-page">11</span>
            <h1>Here might be a page title</h1>
          </template>
          <template #content>
            <div style="padding: 16px;">
              <h2>商户分组营业时段日报表</h2>
              <p>统计日期：2024-03-12</p>
              <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>金额</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>营业收入</td>
                    <td>97643.57</td>
                  </tr>
                  <tr>
                    <td>营业支出</td>
                    <td>-72769.86</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
          <template #footer>
            <h1>Here might be a page footer</h1>
            <span class="pdf-footer-page">11</span>
          </template>
        </cw-print-designer>
      </div>
    `,
    methods: {
      handleClick() {
        this.$refs.printDesigner.print();
      },
    },
  }),
};
