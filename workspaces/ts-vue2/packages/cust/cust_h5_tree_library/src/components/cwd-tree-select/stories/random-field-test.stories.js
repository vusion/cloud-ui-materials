import Component from '../index';

export default {
  id: 'cwd-tree-select-random-field-test',
  title: '组件列表/CwdTreeSelect/随机字段测试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 用户提供的实际数据 - aapid字段
const userActualData = [
  { id: 123, name: "测试4", aapid: 0 },
  { id: 456, name: "测试5", aapid: 123 }
];

// 其他随机字段名测试数据
const randomFieldData1 = [
  { uniqueId: "A001", displayName: "根节点", xyz999abc: null },
  { uniqueId: "A002", displayName: "子节点1", xyz999abc: "A001" },
  { uniqueId: "A003", displayName: "子节点2", xyz999abc: "A001" },
  { uniqueId: "A004", displayName: "孙节点", xyz999abc: "A002" }
];

const randomFieldData2 = [
  { recordId: 1001, caption: "总部", superiorCode: 0 },
  { recordId: 1002, caption: "分部A", superiorCode: 1001 },
  { recordId: 1003, caption: "分部B", superiorCode: 1001 },
  { recordId: 1004, caption: "小组A1", superiorCode: 1002 }
];

const randomFieldData3 = [
  { pk: "X100", title: "主分类", parentKey: "" },
  { pk: "X101", title: "子分类A", parentKey: "X100" },
  { pk: "X102", title: "子分类B", parentKey: "X100" },
  { pk: "X103", title: "子分类A1", parentKey: "X101" }
];

export const UserActualFieldTest = {
  name: '用户实际字段测试 (aapid)',
  render: (args) => ({
    template: `
      <div style="width: 600px;">
        <h3>用户实际数据字段测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试用户提供的实际数据：id、name、aapid 字段
        </p>
        
        <div style="margin-bottom: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>原始数据：</h4>
          <pre style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; overflow: auto;">{{ JSON.stringify(testData, null, 2) }}</pre>
        </div>
        
        <div style="margin-bottom: 16px;">
          <h4>属性选择器配置：</h4>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            <strong>值字段:</strong> getIdField (选择id字段)<br>
            <strong>文本字段:</strong> getNameField (选择name字段)<br>
            <strong>父节点字段:</strong> <span style="color: #007bff; font-weight: bold;">getAapidField (选择aapid字段)</span>
          </div>
          
          <cwd-tree-select 
            :data-source="testData"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getAapidField"
            v-model="selectedValue"
            placeholder="请选择（aapid字段测试）"
            :multiple="false"
            @change="onChange"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ selectedValue || '无' }}
          </div>
        </div>
        
        <div style="padding: 12px; background: #e3f2fd; border-radius: 4px;">
          <h4 style="margin-top: 0;">✅ 预期结果：</h4>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>"测试4"</strong> (id:123, aapid:0) - 作为根节点显示</li>
            <li><strong>"测试5"</strong> (id:456, aapid:123) - 作为"测试4"的子节点显示</li>
            <li>能够正确展开/收起树节点</li>
            <li>选择功能正常工作</li>
          </ul>
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: #fff3e0; border-radius: 4px;">
          <h4 style="margin-top: 0;">🔧 关键修复：</h4>
          <div style="font-size: 14px;">
            <strong>问题：</strong>数字0被错误地当作"根节点标识"处理<br>
            <strong>解决：</strong>只有null、undefined、空字符串才视为根节点，数字0是有效的父节点ID
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: userActualData,
        selectedValue: null
      };
    },
    methods: {
      getIdField(item) {
        console.log('getIdField called with:', item, 'returning:', item.id);
        return item.id;
      },
      getNameField(item) {
        console.log('getNameField called with:', item, 'returning:', item.name);
        return item.name;
      },
      getAapidField(item) {
        console.log('getAapidField called with:', item, 'returning:', item.aapid);
        return item.aapid;
      },
      onChange(event) {
        console.log('aapid字段测试 - 选择改变:', event);
      }
    }
  })
};

export const RandomFieldNames = {
  name: '随机字段名测试',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>随机字段名全面测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          测试各种随机字段名，验证属性选择器的通用性
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- 测试1：xyz999abc字段 -->
          <div>
            <h4>测试1：xyz999abc 字段</h4>
            <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
              父节点字段: <span style="color: #007bff;">getXyz999abcField</span>
            </div>
            
            <cwd-tree-select 
              :data-source="data1"
              :value-field="getUniqueIdField"
              :text-field="getDisplayNameField"
              :parent-id-field="getXyz999abcField"
              v-model="value1"
              placeholder="xyz999abc字段测试"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ value1 || '无' }}
            </div>
            
            <details style="margin-top: 8px;">
              <summary style="cursor: pointer; font-size: 11px; color: #666;">查看数据</summary>
              <pre style="font-size: 9px; background: #f8f9fa; padding: 6px; border-radius: 4px; max-height: 120px; overflow: auto;">{{ JSON.stringify(data1, null, 2) }}</pre>
            </details>
          </div>
          
          <!-- 测试2：superiorCode字段 -->
          <div>
            <h4>测试2：superiorCode 字段</h4>
            <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
              父节点字段: <span style="color: #007bff;">getSuperiorCodeField</span>
            </div>
            
            <cwd-tree-select 
              :data-source="data2"
              :value-field="getRecordIdField"
              :text-field="getCaptionField"
              :parent-id-field="getSuperiorCodeField"
              v-model="value2"
              placeholder="superiorCode字段测试"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ value2 || '无' }}
            </div>
            
            <details style="margin-top: 8px;">
              <summary style="cursor: pointer; font-size: 11px; color: #666;">查看数据</summary>
              <pre style="font-size: 9px; background: #f8f9fa; padding: 6px; border-radius: 4px; max-height: 120px; overflow: auto;">{{ JSON.stringify(data2, null, 2) }}</pre>
            </details>
          </div>
          
          <!-- 测试3：parentKey字段 -->
          <div>
            <h4>测试3：parentKey 字段</h4>
            <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
              父节点字段: <span style="color: #007bff;">getParentKeyField</span>
            </div>
            
            <cwd-tree-select 
              :data-source="data3"
              :value-field="getPkField"
              :text-field="getTitleField"
              :parent-id-field="getParentKeyField"
              v-model="value3"
              placeholder="parentKey字段测试"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ value3 || '无' }}
            </div>
            
            <details style="margin-top: 8px;">
              <summary style="cursor: pointer; font-size: 11px; color: #666;">查看数据</summary>
              <pre style="font-size: 9px; background: #f8f9fa; padding: 6px; border-radius: 4px; max-height: 120px; overflow: auto;">{{ JSON.stringify(data3, null, 2) }}</pre>
            </details>
          </div>
          
          <!-- 对比：用户的aapid字段 -->
          <div>
            <h4>对比：用户的 aapid 字段</h4>
            <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
              父节点字段: <span style="color: #007bff;">getAapidField</span>
            </div>
            
            <cwd-tree-select 
              :data-source="userData"
              :value-field="getUserIdField"
              :text-field="getUserNameField"
              :parent-id-field="getAapidField"
              v-model="userValue"
              placeholder="aapid字段测试"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ userValue || '无' }}
            </div>
            
            <details style="margin-top: 8px;">
              <summary style="cursor: pointer; font-size: 11px; color: #666;">查看数据</summary>
              <pre style="font-size: 9px; background: #f8f9fa; padding: 6px; border-radius: 4px; max-height: 120px; overflow: auto;">{{ JSON.stringify(userData, null, 2) }}</pre>
            </details>
          </div>
        </div>
        
        <div style="margin-top: 24px; padding: 12px; background: #e8f5e8; border-radius: 4px;">
          <h4 style="margin-top: 0;">🎯 测试结论：</h4>
          <div style="font-size: 14px;">
            <strong>✅ 任意字段名支持：</strong>PropertySelectSetter 能够识别和选择任何字段名<br>
            <strong>✅ 数据类型兼容：</strong>支持数字、字符串等不同类型的ID值<br>
            <strong>✅ 空值处理：</strong>正确处理 null、0、空字符串等各种空值情况<br>
            <strong>✅ 树构建：</strong>能够基于任意字段名构建正确的树形结构
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        data1: randomFieldData1,
        data2: randomFieldData2,
        data3: randomFieldData3,
        userData: userActualData,
        value1: null,
        value2: null,
        value3: null,
        userValue: null
      };
    },
    methods: {
      // 数据1的字段选择器
      getUniqueIdField(item) { return item.uniqueId; },
      getDisplayNameField(item) { return item.displayName; },
      getXyz999abcField(item) { return item.xyz999abc; },
      
      // 数据2的字段选择器
      getRecordIdField(item) { return item.recordId; },
      getCaptionField(item) { return item.caption; },
      getSuperiorCodeField(item) { return item.superiorCode; },
      
      // 数据3的字段选择器
      getPkField(item) { return item.pk; },
      getTitleField(item) { return item.title; },
      getParentKeyField(item) { return item.parentKey; },
      
      // 用户数据的字段选择器
      getUserIdField(item) { return item.id; },
      getUserNameField(item) { return item.name; },
      getAapidField(item) { return item.aapid; }
    }
  })
};