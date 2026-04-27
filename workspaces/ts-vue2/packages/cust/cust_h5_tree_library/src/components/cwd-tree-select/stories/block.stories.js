import Component from '../index';

export default {
  id: 'cwd-tree-select-blocks',
  title: '组件列表/CwdTreeSelect/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `
      <div>
        <div style="background: #fff3e0; padding: 12px; margin-bottom: 16px; border-radius: 4px; border: 1px solid #ffcc02;">
          <h4 style="margin: 0 0 8px 0; color: #f57c00;">⚠️ 重要配置说明</h4>
          <div style="font-size: 13px; line-height: 1.5;">
            <strong>要显示树形结构，必须在IDE中配置以下字段：</strong><br>
            • <strong>值字段：</strong>选择 <code>deptId</code> 字段<br>
            • <strong>文本字段：</strong>选择 <code>name</code> 字段<br>  
            • <strong>父节点字段：</strong>选择 <code>parentDeptId</code> 字段（关键！）<br><br>
            <span style="color: #d32f2f;">如果不配置父节点字段，只会显示平铺列表！</span>
          </div>
        </div>
        <cwd-tree-select :data-source="treeData" placeholder="请选择部门"></cwd-tree-select>
      </div>
    `,
    data() {
      return {
        treeData: [
          // 🚀 用户实际数据格式测试
          {
            "lCAPDepartment": {
              "id": 3214327916045824,
              "createdTime": "2025-09-13T05:35:09.000Z",
              "updatedTime": "2025-09-13T05:35:09.000Z",
              "createdBy": null,
              "updatedBy": null,
              "name": "中铁工业",
              "deptId": "13000000",
              "parentDeptId": "10000000", // 父节点不存在，但不是空值，应该被识别为孤儿节点并提升为根节点
              "orgType": 1,
              "mdOrgAssociationID": 33471,
              "departFullName": "//中国中铁股份有限公司/中铁高新工业股份有限公司",
              "orgLevel": 2,
              "realType": null,
              "preUnit": null,
              "nextUnit": null
            }
          },
          {
            "lCAPDepartment": {
              "id": 3214327916045825,
              "createdTime": "2025-09-13T05:35:09.000Z",
              "updatedTime": "2025-09-13T05:35:09.000Z",
              "createdBy": null,
              "updatedBy": null,
              "name": "中铁工业本部",
              "deptId": "13000001",
              "parentDeptId": "13000000", // 父节点存在
              "orgType": 1,
              "mdOrgAssociationID": 33472,
              "departFullName": "//中国中铁股份有限公司/中铁高新工业股份有限公司/中铁高新工业股份有限公司本部",
              "orgLevel": 3,
              "realType": null,
              "preUnit": null,
              "nextUnit": null
            }
          },
          {
            "lCAPDepartment": {
              "id": 3214327916045826,
              "createdTime": "2025-09-13T05:35:09.000Z",
              "updatedTime": "2025-09-13T05:35:09.000Z",
              "createdBy": null,
              "updatedBy": null,
              "name": "中铁山桥",
              "deptId": "13000002",
              "parentDeptId": "13000000", // 父节点存在
              "orgType": 1,
              "mdOrgAssociationID": 33473,
              "departFullName": "//中国中铁股份有限公司/中铁高新工业股份有限公司/中铁山桥集团有限公司",
              "orgLevel": 3,
              "realType": null,
              "preUnit": null,
              "nextUnit": null
            }
          },
          {
            "lCAPDepartment": {
              "id": 3214327916045827,
              "createdTime": "2025-09-13T05:35:09.000Z",
              "updatedTime": "2025-09-13T05:35:09.000Z",
              "createdBy": null,
              "updatedBy": null,
              "name": "公司领导及高管",
              "deptId": "13000026",
              "parentDeptId": "13000001", // 父节点存在
              "orgType": 3,
              "mdOrgAssociationID": 33474,
              "departFullName": "//中国中铁股份有限公司/中铁高新工业股份有限公司/中铁高新工业股份有限公司本部/公司领导及高管",
              "orgLevel": 4,
              "realType": null,
              "preUnit": null,
              "nextUnit": null
            }
          },
          {
            "lCAPDepartment": {
              "id": 3214327916045841,
              "createdTime": "2025-09-13T05:35:09.000Z",
              "updatedTime": "2025-09-13T05:35:09.000Z",
              "createdBy": null,
              "updatedBy": null,
              "name": "技术专家",
              "deptId": "13000046",
              "parentDeptId": "13000001", // 父节点存在
              "orgType": 3,
              "mdOrgAssociationID": 33488,
              "departFullName": "//中国中铁股份有限公司/中铁高新工业股份有限公司/中铁高新工业股份有限公司本部/技术专家",
              "orgLevel": 4,
              "realType": null,
              "preUnit": null,
              "nextUnit": null
            }
          }
        ]
      };
    }
  }),
};