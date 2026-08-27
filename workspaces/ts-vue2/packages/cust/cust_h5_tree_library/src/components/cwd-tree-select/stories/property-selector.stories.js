import Component from '../index';

export default {
  id: 'cwd-tree-select-property-selector',
  title: '组件列表/CwdTreeSelect/属性选择器',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 不同的测试数据格式
const departmentData = [
  { code: 'A001', title: '技术部', parentCode: null },
  { code: 'A001-01', title: '前端组', parentCode: 'A001' },
  { code: 'A001-02', title: '后端组', parentCode: 'A001' },
  { code: 'A001-01-01', title: 'Vue小组', parentCode: 'A001-01' },
  { code: 'B001', title: '产品部', parentCode: null },
  { code: 'B001-01', title: 'UI设计组', parentCode: 'B001' },
];

const organizationData = [
  { orgId: 1001, orgName: '总公司', superiorId: 0 },
  { orgId: 1002, orgName: '分公司A', superiorId: 1001 },
  { orgId: 1003, orgName: '分公司B', superiorId: 1001 },
  { orgId: 1004, orgName: '部门A1', superiorId: 1002 },
  { orgId: 1005, orgName: '部门A2', superiorId: 1002 },
  { orgId: 1006, orgName: '部门B1', superiorId: 1003 },
];

const mixedFieldData = [
  { id: 1, name: '根节点1', parent_id: null, fid: null },
  { id: 11, name: '子节点1-1', parent_id: 1, fid: 1 },
  { id: 12, name: '子节点1-2', parent_id: 1, fid: 1 },
  { id: 111, name: '孙节点1-1-1', parent_id: 11, fid: 11 },
  { id: 2, name: '根节点2', parent_id: null, fid: null },
];

export const PropertySelector = {
  name: '属性选择器配置',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>属性选择器配置父节点字段</h3>
        <p style="color: #666; margin-bottom: 24px;">
          在属性面板中通过下拉选择器选择数据字段作为父节点字段，无需手动输入字段名
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 第一个示例：parentCode字段 -->
          <div>
            <h4>示例1：选择 parentCode 字段</h4>
            <div style="margin-bottom: 12px;">
              <strong>字段配置：</strong>
              <div style="font-size: 12px; color: #666;">
                值字段: getCodeField | 文本字段: getTitleField | 父节点字段: <span style="color: #007bff; font-weight: bold;">getParentCodeField</span>
              </div>
            </div>
            
            <cwd-tree-select 
              :data-source="deptData"
              :value-field="getCodeField"
              :text-field="getTitleField"
              :parent-id-field="getParentCodeField"
              v-model="value1"
              placeholder="请选择部门"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ value1 || '无' }}
            </div>
            
            <details style="margin-top: 12px;">
              <summary style="cursor: pointer; font-size: 12px; color: #666;">查看数据结构</summary>
              <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; overflow: auto; max-height: 120px;">{{ JSON.stringify(deptData, null, 2) }}</pre>
            </details>
          </div>
          
          <!-- 第二个示例：superiorId字段 -->
          <div>
            <h4>示例2：选择 superiorId 字段</h4>
            <div style="margin-bottom: 12px;">
              <strong>字段配置：</strong>
              <div style="font-size: 12px; color: #666;">
                值字段: getOrgIdField | 文本字段: getOrgNameField | 父节点字段: <span style="color: #007bff; font-weight: bold;">getSuperiorIdField</span>
              </div>
            </div>
            
            <cwd-tree-select 
              :data-source="orgData"
              :value-field="getOrgIdField"
              :text-field="getOrgNameField"
              :parent-id-field="getSuperiorIdField"
              v-model="value2"
              placeholder="请选择组织"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ value2 || '无' }}
            </div>
            
            <details style="margin-top: 12px;">
              <summary style="cursor: pointer; font-size: 12px; color: #666;">查看数据结构</summary>
              <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; overflow: auto; max-height: 120px;">{{ JSON.stringify(orgData, null, 2) }}</pre>
            </details>
          </div>
        </div>
        
        <!-- 第三个示例：对比不同父节点字段选择 -->
        <div style="margin-top: 24px;">
          <h4>示例3：对比不同父节点字段的效果</h4>
          <p style="color: #666; margin-bottom: 16px;">
            同一数据源，选择不同的父节点字段，构建不同的树结构
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <h5>选择 parent_id 字段</h5>
              <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
                父节点字段: <span style="color: #007bff;">getParentIdField</span>
              </div>
              
              <cwd-tree-select 
                :data-source="mixedData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value3a"
                placeholder="使用parent_id字段"
                :multiple="false"
                style="width: 100%;"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中值: {{ value3a || '无' }}
              </div>
            </div>
            
            <div>
              <h5>选择 fid 字段</h5>
              <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
                父节点字段: <span style="color: #007bff;">getFidField</span>
              </div>
              
              <cwd-tree-select 
                :data-source="mixedData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getFidField"
                v-model="value3b"
                placeholder="使用fid字段"
                :multiple="false"
                style="width: 100%;"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中值: {{ value3b || '无' }}
              </div>
            </div>
          </div>
          
          <details style="margin-top: 12px;">
            <summary style="cursor: pointer; font-size: 12px; color: #666;">查看测试数据结构</summary>
            <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; overflow: auto; max-height: 150px; width: 100%;">{{ JSON.stringify(mixedData, null, 2) }}</pre>
          </details>
        </div>
        
        <div style="margin-top: 24px; padding: 12px; background: #e8f5e8; border-radius: 4px;">
          <h4 style="margin-top: 0;">✅ 属性选择器的优势：</h4>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>🎯 <strong>智能识别</strong>：自动识别数据源中的可用字段</li>
            <li>⚡ <strong>方便快捷</strong>：通过下拉选择器快速选择字段</li>
            <li>🔧 <strong>类型安全</strong>：确保选择的字段在数据中真实存在</li>
            <li>🎨 <strong>用户友好</strong>：无需记住字段名，可视化选择</li>
            <li>📝 <strong>减少错误</strong>：避免手动输入字段名时的拼写错误</li>
            <li>🔄 <strong>动态更新</strong>：数据源字段变化时自动更新可选项</li>
          </ul>
        </div>
      </div>
    `,
    data() {
      return {
        deptData: departmentData,
        orgData: organizationData,
        mixedData: mixedFieldData,
        value1: null,
        value2: null,
        value3a: null,
        value3b: null
      };
    },
    methods: {
      // 部门数据字段选择器
      getCodeField(item) {
        return item.code;
      },
      getTitleField(item) {
        return item.title;
      },
      getParentCodeField(item) {
        return item.parentCode;
      },
      
      // 组织数据字段选择器
      getOrgIdField(item) {
        return item.orgId;
      },
      getOrgNameField(item) {
        return item.orgName;
      },
      getSuperiorIdField(item) {
        return item.superiorId;
      },
      
      // 混合数据字段选择器
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getParentIdField(item) {
        return item.parent_id;
      },
      getFidField(item) {
        return item.fid;
      }
    }
  })
};

export const SelectorVsAutoDetection = {
  name: '选择器 vs 自动检测',
  render: (args) => ({
    template: `
      <div style="width: 700px;">
        <h3>属性选择器 vs 自动检测对比</h3>
        <p style="color: #666; margin-bottom: 24px;">
          对比属性选择器配置和自动检测的效果差异
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- 属性选择器配置 -->
          <div>
            <h4>属性选择器配置</h4>
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>配置：</strong>通过属性面板选择 parent_id 字段
            </div>
            
            <cwd-tree-select 
              :data-source="testData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getParentIdField"
              v-model="selectorValue"
              placeholder="属性选择器配置"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ selectorValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
              <strong>选择器优势：</strong><br>
              精确控制，可视化选择，避免字段名错误
            </div>
          </div>
          
          <!-- 自动检测 -->
          <div>
            <h4>自动检测</h4>
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>配置：</strong>未指定父节点字段，自动检测
            </div>
            
            <cwd-tree-select 
              :data-source="testData"
              :value-field="getIdField"
              :text-field="getNameField"
              v-model="autoValue"
              placeholder="自动检测父节点字段"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ autoValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 11px;">
              <strong>检测规则：</strong><br>
              按优先级查找: parentId > parent_id > pid > parentid > parent > pId > fid
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h4>测试数据：</h4>
          <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; overflow: auto; max-height: 150px;">{{ JSON.stringify(testData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 4px;">
          <h4 style="margin-top: 0;">📋 配置方式对比：</h4>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <thead>
              <tr style="background: rgba(0,0,0,0.05);">
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">配置方式</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">优势</th>
                <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>属性选择器</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">精确控制、可视化操作、类型安全</td>
                <td style="padding: 8px; border: 1px solid #ddd;">自定义字段名、复杂数据结构</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>自动检测</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">零配置、快速上手、适应标准字段</td>
                <td style="padding: 8px; border: 1px solid #ddd;">标准字段命名、快速原型</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    data() {
      return {
        testData: [
          { id: 1, name: '根节点1', parent_id: null, parentId: null },
          { id: 11, name: '子节点1-1', parent_id: 1, parentId: 1 },
          { id: 12, name: '子节点1-2', parent_id: 1, parentId: 1 },
          { id: 111, name: '孙节点1-1-1', parent_id: 11, parentId: 11 },
          { id: 2, name: '根节点2', parent_id: null, parentId: null }
        ],
        selectorValue: null,
        autoValue: null
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getParentIdField(item) {
        return item.parent_id;
      }
    }
  })
};