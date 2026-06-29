import Component from '../index';

export default {
  id: 'cwd-tree-select-field-mapping-debug',
  title: '组件列表/CwdTreeSelect/字段映射调试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 用户实际遇到的问题数据
const userProblemData = [
  { id: 123, name: "测试4", aapid: 0 },
  { id: 456, name: "测试5", aapid: 123 }
];

// 其他字段名测试
const differentFieldData = [
  { uuid: 'A001', title: '根节点A', upper_id: null },
  { uuid: 'A002', title: '子节点A1', upper_id: 'A001' },
  { uuid: 'A003', title: '子节点A2', upper_id: 'A001' },
  { uuid: 'B001', title: '根节点B', upper_id: '' },
  { uuid: 'B002', title: '子节点B1', upper_id: 'B001' }
];

export const FieldMappingDebug = {
  name: '字段映射调试工具',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>字段映射问题调试工具</h3>
        <p style="color: #666; margin-bottom: 24px;">
          <strong style="color: #dc3545;">✅ 已彻底修复：</strong>完全移除自动检测机制，现在选择什么字段名，该字段就作为父节点字段
        </p>
        
        <div style="margin-bottom: 16px; padding: 12px; background: #e8f5e8; border-radius: 4px;">
          <h4 style="margin-top: 0; color: #28a745;">🎯 新工作原理</h4>
          <div style="font-size: 14px;">
            <strong>✅ 只有一种模式：</strong>PropertySelectSetter配置优先<br>
            • 如果配置了父节点字段选择器，完全使用该字段<br>
            • 如果未配置父节点字段选择器，所有数据都显示为平铺结构（无树形层级）<br>
            • <strong style="color: #dc3545;">完全移除预设字段列表和自动检测机制</strong>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 用户实际问题测试 -->
          <div>
            <h4>✅ 用户问题：aapid 字段</h4>
            
            <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
              <strong>数据结构：</strong>
              <pre style="font-size: 10px; margin: 4px 0;">{{ JSON.stringify(userData, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong>配置说明：</strong>
              <div style="font-size: 12px; color: #666;">
                • 值字段: getIdField (选择 id)<br>
                • 文本字段: getNameField (选择 name)<br>
                • <span style="color: #007bff; font-weight: bold;">父节点字段: getAapidField (选择 aapid)</span>
              </div>
            </div>
            
            <cwd-tree-select 
              :data-source="userData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getAapidField"
              v-model="userValue"
              placeholder="aapid字段测试"
              :multiple="false"
              @change="onUserChange"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ userValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
              <strong>✅ 修复后效果:</strong><br>
              "测试4" 作为根节点（aapid=0）<br>
              "测试5" 作为 "测试4" 的子节点（aapid=123）
            </div>
          </div>
          
          <!-- 平铺显示测试 -->
          <div>
            <h4>📋 对比：无配置平铺显示</h4>
            
            <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
              <strong>测试数据：</strong>
              <pre style="font-size: 10px; margin: 4px 0;">{{ JSON.stringify(userData, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong>配置说明：</strong>
              <div style="font-size: 12px; color: #666;">
                • 值字段: getIdField (选择 id)<br>
                • 文本字段: getNameField (选择 name)<br>
                • <span style="color: #dc3545; font-weight: bold;">父节点字段: 未配置</span>
              </div>
            </div>
            
            <cwd-tree-select 
              :data-source="userData"
              :value-field="getIdField"
              :text-field="getNameField"
              v-model="flatValue"
              placeholder="平铺显示测试"
              :multiple="false"
              @change="onFlatChange"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ flatValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 11px;">
              <strong>📋 预期效果:</strong><br>
              所有数据显示为平铺列表，无树形层级结构
            </div>
          </div>
        </div>
        
        <!-- 其他字段名测试 -->
        <div style="margin-top: 24px;">
          <h4>🚀 任意字段名测试</h4>
          <p style="color: #666; margin-bottom: 16px;">
            测试各种奇怪字段名的支持情况
          </p>
          
          <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
            <strong>测试数据：</strong>
            <pre style="font-size: 10px; margin: 4px 0; max-height: 120px; overflow: auto;">{{ JSON.stringify(otherData, null, 2) }}</pre>
          </div>
          
          <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
            <strong>字段映射：</strong> uuid → value, title → text, upper_id → parentId
          </div>
          
          <cwd-tree-select 
            :data-source="otherData"
            :value-field="getUuidField"
            :text-field="getTitleField"
            :parent-id-field="getUpperIdField"
            v-model="otherValue"
            placeholder="任意字段名测试"
            :multiple="false"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ otherValue || '无' }}
          </div>
          
          <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
            <strong>✅ 预期效果:</strong><br>
            根据upper_id字段构建树结构，支持任意字段名
          </div>
        </div>
        
        <!-- 调试信息 -->
        <div style="margin-top: 24px; padding: 12px; background: #e3f2fd; border-radius: 4px;">
          <h4 style="margin-top: 0;">🐛 调试信息查看：</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>打开浏览器开发者工具 Console 面板</li>
            <li>查看带有🔧标记的日志，确认字段映射过程</li>
            <li>查看带有🌳标记的日志，了解树构建过程</li>
            <li>确认是否有"ONLY PropertySelectSetter"的日志</li>
            <li>验证不再有自动检测的相关日志</li>
          </ol>
          
          <div style="margin-top: 12px; padding: 8px; background: rgba(40, 167, 69, 0.1); border-radius: 4px;">
            <strong>🎉 修复确认：</strong> 现在任意字段名都应该能正确工作，不再依赖预设的字段列表！
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        userData: userProblemData,
        otherData: differentFieldData,
        userValue: null,
        flatValue: null,
        otherValue: null
      };
    },
    methods: {
      // 用户数据的字段映射
      getIdField(item) {
        console.log('🔧 getIdField called with:', item, '-> returning:', item.id);
        return item.id;
      },
      getNameField(item) {
        console.log('🔧 getNameField called with:', item, '-> returning:', item.name);
        return item.name;
      },
      getAapidField(item) {
        console.log('🔧 getAapidField called with:', item, '-> returning:', item.aapid);
        return item.aapid;
      },
      
      // 其他数据的字段映射
      getUuidField(item) {
        console.log('🔧 getUuidField called with:', item, '-> returning:', item.uuid);
        return item.uuid;
      },
      getTitleField(item) {
        console.log('🔧 getTitleField called with:', item, '-> returning:', item.title);
        return item.title;
      },
      getUpperIdField(item) {
        console.log('🔧 getUpperIdField called with:', item, '-> returning:', item.upper_id);
        return item.upper_id;
      },
      
      // 事件处理
      onUserChange(event) {
        console.log('👤 aapid字段测试 - 选择改变:', event);
      },
      onFlatChange(event) {
        console.log('📋 平铺显示测试 - 选择改变:', event);
      }
    }
  })
};

export const AnyFieldNameTest = {
  name: '任意字段名批量测试',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>任意字段名批量测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          <strong style="color: #28a745;">✅ 验证修复效果：</strong>测试各种奇怪字段名是否都能正确工作
        </p>
        
        <div v-for="(testCase, index) in testCases" :key="index" style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
          <h5>{{ testCase.title }}</h5>
          
          <div style="margin-bottom: 8px; font-size: 11px; color: #666;">
            父节点字段: <code style="background: #f8f9fa; padding: 2px 4px; border-radius: 2px;">{{ testCase.fieldName }}</code>
          </div>
          
          <div style="margin-bottom: 8px; padding: 6px; background: #f8f9fa; border-radius: 4px; font-size: 10px;">
            <details>
              <summary style="cursor: pointer;">查看测试数据</summary>
              <pre style="margin: 4px 0; max-height: 80px; overflow: auto;">{{ JSON.stringify(testCase.data, null, 2) }}</pre>
            </details>
          </div>
          
          <cwd-tree-select 
            :data-source="testCase.data"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="testCase.parentIdField"
            v-model="testCase.value"
            :placeholder="'测试' + testCase.fieldName + '字段'"
            :multiple="false"
          />
          
          <div style="margin-top: 4px; font-size: 11px; color: #666;">
            选中: {{ testCase.value || '无' }}
          </div>
          
          <div style="margin-top: 8px; padding: 6px; border-radius: 4px; font-size: 10px; background: #e8f5e8;">
            <strong>✅ 预期:</strong> {{ testCase.expectation }}
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 12px; background: #d1ecf1; border-radius: 4px;">
          <h4 style="margin-top: 0;">🎯 测试要点</h4>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>parent123</strong>: 用户反映的问题字段，现在应该正常工作</li>
            <li><strong>weird_field_name</strong>: 包含下划线的奇怪字段名</li>
            <li><strong>f123abc</strong>: 数字+字母混合的字段名</li>
            <li><strong>xyz789</strong>: 完全自定义的字段名</li>
          </ul>
          
          <div style="padding: 8px; background: rgba(40, 167, 69, 0.1); border-radius: 4px; margin-top: 12px;">
            <strong>✅ 成功标准：</strong>所有字段名都应该能形成正确的树结构，不再有任何限制！
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testCases: [
          {
            title: '测试1：parent123字段（用户问题）',
            fieldName: 'parent123',
            data: [
              { id: 1, name: '根1', parent123: null },
              { id: 2, name: '子1', parent123: 1 }
            ],
            value: null,
            parentIdField: (item) => {
              console.log('🔧 Testing parent123 field:', item, '-> result:', item.parent123);
              return item.parent123;
            },
            expectation: '应该形成正确的树结构，根1→子1'
          },
          {
            title: '测试2：weird_field_name字段',
            fieldName: 'weird_field_name',
            data: [
              { id: 'A', name: '节点A', weird_field_name: null },
              { id: 'B', name: '节点B', weird_field_name: 'A' }
            ],
            value: null,
            parentIdField: (item) => {
              console.log('🔧 Testing weird_field_name field:', item, '-> result:', item.weird_field_name);
              return item.weird_field_name;
            },
            expectation: '应该形成正确的树结构，节点A→节点B'
          },
          {
            title: '测试3：f123abc字段',
            fieldName: 'f123abc',
            data: [
              { id: 10, name: '根节点', f123abc: 0 },
              { id: 20, name: '叶节点', f123abc: 10 }
            ],
            value: null,
            parentIdField: (item) => {
              console.log('🔧 Testing f123abc field:', item, '-> result:', item.f123abc);
              return item.f123abc;
            },
            expectation: '数字0应该被正确处理为有效父ID，根节点→叶节点'
          },
          {
            title: '测试4：xyz789字段',
            fieldName: 'xyz789',
            data: [
              { id: 'ROOT', name: '总根节点', xyz789: null },
              { id: 'CHILD1', name: '第一子节点', xyz789: 'ROOT' },
              { id: 'CHILD2', name: '第二子节点', xyz789: 'ROOT' }
            ],
            value: null,
            parentIdField: (item) => {
              console.log('🔧 Testing xyz789 field:', item, '-> result:', item.xyz789);
              return item.xyz789;
            },
            expectation: '完全自定义字段名应该正常工作，1个根节点+2个子节点'
          }
        ]
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      }
    }
  })
};