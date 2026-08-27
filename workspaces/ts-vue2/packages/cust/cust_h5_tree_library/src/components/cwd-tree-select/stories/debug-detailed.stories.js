import Component from '../index';

export default {
  id: 'cwd-tree-select-debug-detailed',
  title: '组件列表/CwdTreeSelect/详细调试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 简单的两级数据，用于问题排查
const simpleTestData = [
  { id: 123, name: "测试4", aapid: 0 },
  { id: 456, name: "测试5", aapid: 123 }
];

export const DetailedDebug = {
  name: '详细调试分析',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>CwdTreeSelect 问题详细调试</h3>
        <p style="color: #dc3545; margin-bottom: 24px;">
          <strong>用户问题：</strong>无论选择什么字段，都是平铺显示，没有树形结构
        </p>
        
        <!-- 问题分析 -->
        <div style="margin-bottom: 24px; padding: 16px; background: #fff3e0; border-radius: 8px;">
          <h4 style="margin-top: 0; color: #f57c00;">🔍 问题分析步骤</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>检查数据源：</strong>确认原始数据结构是否正确</li>
            <li><strong>检查字段映射：</strong>确认PropertySelectSetter是否被正确调用</li>
            <li><strong>检查树构建：</strong>确认buildTreeFromFlatData是否正确执行</li>
            <li><strong>检查渲染：</strong>确认TreeNode组件是否正确显示children</li>
          </ol>
        </div>
        
        <!-- 测试用例 -->
        <div style="margin-bottom: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4 style="margin-top: 0;">📋 测试数据</h4>
          <pre style="font-size: 11px; margin: 4px 0; max-height: 100px; overflow: auto;">{{ JSON.stringify(testData, null, 2) }}</pre>
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            <strong>预期结构：</strong>测试4(id=123) 作为根节点，测试5(id=456) 作为测试4的子节点
          </div>
        </div>
        
        <!-- 配置了aapid字段的测试 -->
        <div style="margin-bottom: 20px;">
          <h4>✅ 配置aapid字段测试</h4>
          <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
            <strong>配置：</strong>值字段=id, 文本字段=name, 父节点字段=aapid
          </div>
          
          <cwd-tree-select 
            :data-source="testData"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getAapidField"
            v-model="selectedValue"
            placeholder="选择aapid字段配置的数据"
            :multiple="false"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ selectedValue || '无' }}
          </div>
          
          <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
            <strong>✅ 预期效果：</strong><br>
            • 测试4 显示为根节点（因为aapid=0，数据中没有id=0的项目）<br>
            • 测试5 显示为 测试4 的子节点（因为aapid=123，指向测试4的id）<br>
            • 应该能看到展开/收起的箭头图标
          </div>
        </div>
        
        <!-- 未配置字段的对比 -->
        <div style="margin-bottom: 20px;">
          <h4>📋 未配置字段对比</h4>
          <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
            <strong>配置：</strong>值字段=id, 文本字段=name, 父节点字段=未配置
          </div>
          
          <cwd-tree-select 
            :data-source="testData"
            :value-field="getIdField"
            :text-field="getNameField"
            v-model="flatValue"
            placeholder="未配置父节点字段"
            :multiple="false"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ flatValue || '无' }}
          </div>
          
          <div style="margin-top: 12px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 11px;">
            <strong>📋 预期效果：</strong><br>
            • 所有数据显示为平铺列表，没有层级关系<br>
            • 不应该有展开/收起图标
          </div>
        </div>
        
        <!-- 调试说明 -->
        <div style="margin-top: 24px; padding: 16px; background: #e3f2fd; border-radius: 8px;">
          <h4 style="margin-top: 0;">🐛 调试方法</h4>
          <div style="font-size: 14px;">
            <div style="margin-bottom: 12px;">
              <strong>1. 打开浏览器Console面板</strong>
              <div style="font-size: 12px; color: #666; margin-left: 16px;">
                F12 → Console，清空控制台后重新选择下拉框
              </div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong>2. 查看关键日志</strong>
              <div style="font-size: 12px; color: #666; margin-left: 16px;">
                • 🔧 标记：字段映射函数调用<br>
                • 🌳 标记：树构建过程<br>
                • 🌱 标记：根节点识别<br>
                • 🌿 标记：子节点添加<br>
                • ❌ 标记：错误或异常情况
              </div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong>3. 关键检查点</strong>
              <div style="font-size: 12px; color: #666; margin-left: 16px;">
                • getAapidField 是否被调用并返回正确值<br>
                • buildTreeFromFlatData 是否构建出正确的树结构<br>
                • TreeNode 是否正确获取和显示 children<br>
                • 是否有任何错误导致回退到平铺显示
              </div>
            </div>
            
            <div style="padding: 8px; background: rgba(220, 53, 69, 0.1); border-radius: 4px;">
              <strong>⚠️ 注意：</strong>如果仍然显示为平铺结构，请将完整的Console日志截图或复制给开发者
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: simpleTestData,
        selectedValue: null,
        flatValue: null
      };
    },
    methods: {
      getIdField(item) {
        console.log('🔧 [Field Mapping] getIdField called with:', item, '-> returning:', item.id);
        return item.id;
      },
      getNameField(item) {
        console.log('🔧 [Field Mapping] getNameField called with:', item, '-> returning:', item.name);
        return item.name;
      },
      getAapidField(item) {
        console.log('🔧 [Field Mapping] getAapidField called with:', item, '-> returning:', item.aapid);
        console.log('🔧 [Field Mapping] aapid field details - value:', item.aapid, 'type:', typeof item.aapid, 'isNull:', item.aapid === null, 'isUndefined:', item.aapid === undefined);
        return item.aapid;
      }
    }
  })
};

export const StepByStepDebug = {
  name: '分步调试验证',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>分步调试验证</h3>
        <p style="color: #666; margin-bottom: 16px;">
          逐步验证每个环节，找出问题所在
        </p>
        
        <!-- 步骤1：数据源验证 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          <h4 style="margin-top: 0;">步骤1：数据源验证</h4>
          <div style="margin-bottom: 8px; font-size: 12px;">
            <strong>原始数据：</strong>
            <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; margin: 4px 0;">{{ JSON.stringify(step1Data, null, 2) }}</pre>
          </div>
          <div style="font-size: 12px; color: #666;">
            <strong>验证要点：</strong>
            <ul style="margin: 4px 0; padding-left: 16px;">
              <li>id=123 的项，aapid=0</li>
              <li>id=456 的项，aapid=123（指向id=123）</li>
              <li>预期：123为根节点，456为123的子节点</li>
            </ul>
          </div>
        </div>
        
        <!-- 步骤2：字段映射验证 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          <h4 style="margin-top: 0;">步骤2：字段映射验证</h4>
          <div style="margin-bottom: 8px; font-size: 12px;">
            <strong>手动测试字段映射函数：</strong>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
            <div style="padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 11px;">
              <strong>项目1：</strong><br>
              • getIdField: {{ getIdField(step1Data[0]) }}<br>
              • getNameField: {{ getNameField(step1Data[0]) }}<br>
              • getAapidField: {{ getAapidField(step1Data[0]) }}
            </div>
            <div style="padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 11px;">
              <strong>项目2：</strong><br>
              • getIdField: {{ getIdField(step1Data[1]) }}<br>
              • getNameField: {{ getNameField(step1Data[1]) }}<br>
              • getAapidField: {{ getAapidField(step1Data[1]) }}
            </div>
          </div>
          <div style="font-size: 12px; color: #666;">
            <strong>预期结果：</strong>所有字段映射函数都应该返回正确的值
          </div>
        </div>
        
        <!-- 步骤3：组件渲染验证 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          <h4 style="margin-top: 0;">步骤3：组件渲染验证</h4>
          
          <cwd-tree-select 
            :data-source="step1Data"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getAapidField"
            v-model="step3Value"
            placeholder="验证组件渲染"
            :multiple="false"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ step3Value || '无' }}
          </div>
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            <strong>检查要点：</strong>
            <ul style="margin: 4px 0; padding-left: 16px;">
              <li>下拉框中是否显示为树形结构</li>
              <li>是否有展开/收起箭头</li>
              <li>Console中是否有正确的调试日志</li>
            </ul>
          </div>
        </div>
        
        <!-- 不同字段名测试 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;">
          <h4 style="margin-top: 0;">步骤4：不同字段名测试</h4>
          
          <div style="margin-bottom: 12px; font-size: 12px;">
            <strong>测试数据（使用parent123字段）：</strong>
            <pre style="font-size: 10px; background: #f8f9fa; padding: 8px; border-radius: 4px; margin: 4px 0;">{{ JSON.stringify(parent123Data, null, 2) }}</pre>
          </div>
          
          <cwd-tree-select 
            :data-source="parent123Data"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getParent123Field"
            v-model="step4Value"
            placeholder="验证parent123字段"
            :multiple="false"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            选中值: {{ step4Value || '无' }}
          </div>
        </div>
        
        <!-- 总结 -->
        <div style="margin-top: 24px; padding: 16px; background: #f8d7da; border-radius: 8px;">
          <h4 style="margin-top: 0; color: #721c24;">🚨 问题总结</h4>
          <div style="font-size: 14px; color: #721c24;">
            如果以上所有测试都显示为平铺结构，说明问题可能在：
            <ol style="margin: 8px 0; padding-left: 20px;">
              <li><strong>PropertySelectSetter没有被正确传递</strong></li>
              <li><strong>树构建逻辑有根本性错误</strong></li>
              <li><strong>TreeNode组件渲染逻辑有问题</strong></li>
            </ol>
            
            <div style="margin-top: 12px; padding: 8px; background: rgba(255, 255, 255, 0.3); border-radius: 4px;">
              <strong>请务必检查Console中的完整日志，并将问题相关的错误信息提供给开发者。</strong>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        step1Data: [
          { id: 123, name: "测试4", aapid: 0 },
          { id: 456, name: "测试5", aapid: 123 }
        ],
        parent123Data: [
          { id: 1, name: "根节点", parent123: null },
          { id: 2, name: "子节点", parent123: 1 }
        ],
        step3Value: null,
        step4Value: null
      };
    },
    methods: {
      getIdField(item) {
        const result = item.id;
        console.log('🔧 [Manual Test] getIdField:', item, '->', result);
        return result;
      },
      getNameField(item) {
        const result = item.name;
        console.log('🔧 [Manual Test] getNameField:', item, '->', result);
        return result;
      },
      getAapidField(item) {
        const result = item.aapid;
        console.log('🔧 [Manual Test] getAapidField:', item, '->', result);
        return result;
      },
      getParent123Field(item) {
        const result = item.parent123;
        console.log('🔧 [Manual Test] getParent123Field:', item, '->', result);
        return result;
      }
    }
  })
};