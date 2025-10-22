<template>
  <div>
    <!-- 打印按钮 -->
    <div class="print-controls">
      <button @click="() => handlePrint('preview')" class="preview-btn">1. 预览打印</button>
      <button @click="() => handlePrint('direct')" class="print-btn">2. 直接打印</button>
      <button @click="() => handlePrint('select')" class="select-btn">3. 选择打印机</button>
      <button @click="() => handlePrint('maintain')" class="maintain-btn">4. 打印维护</button>
      <button @click="() => handlePrint('design')" class="design-btn">5. 打印设计</button>
    </div>
    <lodop-print ref="lodopPrintRef">
      <div class="print-demo">
        <!-- 打印内容区域 -->
        <div class="print-content" id="printArea">
          <!-- 文档标题 -->
          <div class="document-header">
            <h1>业务申请表</h1>
            <div class="doc-info">
              <span>文档编号：{{ documentInfo.number }}</span>
              <span>申请日期：{{ documentInfo.date }}</span>
            </div>
          </div>
          <!-- 申请人信息表单 -->
          <div class="form-section">
            <h2>申请人信息</h2>
            <table class="info-table">
              <tr>
                <td class="label">姓名：</td>
                <td class="value">{{ applicantInfo.name }}</td>
                <td class="label">性别：</td>
                <td class="value">{{ applicantInfo.gender }}</td>
              </tr>
              <tr>
                <td class="label">身份证号：</td>
                <td class="value">{{ applicantInfo.idCard }}</td>
                <td class="label">联系电话：</td>
                <td class="value">{{ applicantInfo.phone }}</td>
              </tr>
              <tr>
                <td class="label">电子邮箱：</td>
                <td class="value">{{ applicantInfo.email }}</td>
                <td class="label">职业：</td>
                <td class="value">{{ applicantInfo.occupation }}</td>
              </tr>
              <tr>
                <td class="label">联系地址：</td>
                <td class="value" colspan="3">{{ applicantInfo.address }}</td>
              </tr>
            </table>
          </div>

          <!-- 申请项目列表 -->
          <div class="form-section">
            <h2>申请项目清单</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>项目名称</th>
                  <th>项目类型</th>
                  <th>申请数量</th>
                  <th>单价（元）</th>
                  <th>小计（元）</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in projectList" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price.toFixed(2) }}</td>
                  <td>{{ (item.quantity * item.price).toFixed(2) }}</td>
                  <td>{{ item.remark }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" class="total-label">合计金额：</td>
                  <td class="total-amount">{{ totalAmount.toFixed(2) }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- 审批信息 -->
          <div class="form-section">
            <h2>审批信息</h2>
            <div class="approval-section">
              <div class="approval-item">
                <div class="approval-role">申请人签字：</div>
                <div class="signature-box">{{ applicantInfo.name }}</div>
                <div class="approval-date">日期：{{ documentInfo.date }}</div>
              </div>

              <div class="approval-item">
                <div class="approval-role">部门负责人：</div>
                <div class="signature-box"></div>
                <div class="approval-date">日期：__________</div>
              </div>

              <div class="approval-item">
                <div class="approval-role">财务审核：</div>
                <div class="signature-box"></div>
                <div class="approval-date">日期：__________</div>
              </div>

              <div class="approval-item">
                <div class="approval-role">总经理审批：</div>
                <div class="signature-box"></div>
                <div class="approval-date">日期：__________</div>
              </div>
            </div>
          </div>

          <!-- 备注说明 -->
          <div class="form-section">
            <h2>备注说明</h2>
            <div class="remark-box">
              <p>1. 本申请表一式三份，申请人、财务部、行政部各执一份；</p>
              <p>2. 申请人需如实填写相关信息，如有虚假信息，后果自负；</p>
              <p>3. 审批流程：申请人 → 部门负责人 → 财务审核 → 总经理审批；</p>
              <p>4. 申请批准后，请在30个工作日内完成相关手续。</p>
            </div>
          </div>

          <!-- 页脚 -->
          <div class="document-footer">
            <div class="footer-info">
              <span>打印时间：{{ printTime }}</span>
              <span>页码：第 1 页 共 1 页</span>
            </div>
          </div>
        </div>
      </div>
    </lodop-print>
  </div>
</template>

<script>
export default {
  name: 'example-demo1',
  data() {
    return {
      documentInfo: {
        number: 'BA-2024-001',
        date: '2024-03-15',
      },
      applicantInfo: {
        name: '张三',
        gender: '男',
        idCard: '123456789012345678',
        phone: '13812345678',
        email: 'zhangsan@example.com',
        occupation: '软件工程师',
        address: '福建省福州市鼓楼区某某街道123号',
      },
      projectList: [
        {
          name: '办公用品采购',
          type: '日常用品',
          quantity: 5,
          price: 120.5,
          remark: '急需',
        },
        {
          name: '培训费用',
          type: '教育培训',
          quantity: 2,
          price: 800.0,
          remark: '技能提升',
        },
        {
          name: '差旅费报销',
          type: '差旅费用',
          quantity: 1,
          price: 1500.0,
          remark: '出差北京',
        },
        {
          name: '设备维修',
          type: '维修费用',
          quantity: 1,
          price: 350.0,
          remark: '打印机维修',
        },
      ],
      printTime: '',
    };
  },
  computed: {
    totalAmount() {
      return this.projectList.reduce((sum, item) => {
        return sum + item.quantity * item.price;
      }, 0);
    },
  },
  mounted() {
    this.updatePrintTime();
  },
  methods: {
    /**
     * 统一的打印处理方法
     * @param {string} mode - 打印模式
     */
    handlePrint(mode = 'preview') {
      this.updatePrintTime();

      try {
        const result = this.$refs.lodopPrintRef?.print?.(mode);
        if (result) {
          console.log(`打印模式 ${mode} 执行成功`);
        } else {
          console.error(`打印模式 ${mode} 执行失败`);
        }
      } catch (error) {
        console.error('打印操作异常:', error);
      }
    },
    updatePrintTime() {
      const now = new Date();
      this.printTime = now.toLocaleString('zh-CN');
    },
  },
};
</script>

<style scoped>
.print-demo {
  padding: 20px;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

.print-controls {
  margin-bottom: 20px;
  text-align: center;
}

.print-btn,
.preview-btn,
.select-btn,
.maintain-btn,
.design-btn {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* 1. 预览打印 - 蓝色 */
.preview-btn {
  background-color: #007bff;
  color: white;
}
.preview-btn:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

/* 2. 直接打印 - 绿色 */
.print-btn {
  background-color: #28a745;
  color: white;
}
.print-btn:hover {
  background-color: #1e7e34;
  transform: translateY(-1px);
}

/* 3. 选择打印机 - 橙色 */
.select-btn {
  background-color: #fd7e14;
  color: white;
}
.select-btn:hover {
  background-color: #e55a00;
  transform: translateY(-1px);
}

.maintain-btn {
  background-color: #6f42c1;
  color: white;
}
.maintain-btn:hover {
  background-color: #5a2d91;
  transform: translateY(-1px);
}

.design-btn {
  background-color: #ffc107;
  color: white;
}
.design-btn:hover {
  background-color: #ffa000;
  transform: translateY(-1px);
}

.print-content {
  background: white;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 800px;
}

.document-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
}

.document-header h1 {
  margin: 0 0 10px 0;
  font-size: 24px;
  font-weight: bold;
}

.doc-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.form-section {
  margin-bottom: 25px;
}

.form-section h2 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
  border-left: 4px solid #007bff;
  padding-left: 10px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.info-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.info-table .label {
  background-color: #f8f9fa;
  font-weight: bold;
  width: 120px;
  text-align: right;
}

.info-table .value {
  background-color: white;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  padding: 10px 8px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 13px;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table .total-label {
  background-color: #e9ecef;
  font-weight: bold;
  text-align: right;
}

.data-table .total-amount {
  background-color: #fff3cd;
  font-weight: bold;
  color: #856404;
}

.approval-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 15px;
}

.approval-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  background-color: #f8f9fa;
  flex: 1;
  min-width: 300px;
  max-width: calc(50% - 10px);
}

.approval-role {
  font-weight: bold;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}

.signature-box {
  flex: 1;
  height: 30px;
  border-bottom: 1px solid #333;
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding-left: 5px;
}

.approval-date {
  font-size: 12px;
  color: #666;
}

.remark-box {
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remark-box p {
  margin: 8px 0;
  font-size: 13px;
  line-height: 1.5;
}

.document-footer {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

/* 打印样式 */
@media print {
  .print-controls {
    display: none;
  }

  .print-content {
    box-shadow: none;
    padding: 0;
  }

  .print-demo {
    padding: 0;
  }
}
</style>
