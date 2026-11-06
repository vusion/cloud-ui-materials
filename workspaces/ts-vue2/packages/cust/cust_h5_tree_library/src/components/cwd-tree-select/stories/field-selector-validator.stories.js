import Component from '../index';

export default {
  id: 'cwd-tree-select-field-selector-validator',
  title: '组件列表/CwdTreeSelect/字段选择器验证工具',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 用户实际数据
const actualUserData = [
  {
    "lCAPDepartment": {
      "id": 3214327916045824,
      "name": "中铁工业",
      "deptId": "13000000",
      "parentDeptId": "10000000"
    }
  },
  {
    "lCAPDepartment": {
      "id": 3214327916045825,
      "name": "中铁工业本部",
      "deptId": "13000001", 
      "parentDeptId": "13000000"
    }
  },
  {
    "lCAPDepartment": {
      "id": 3214327916045826,
      "name": "中铁山桥",
      "deptId": "13000002",
      "parentDeptId": "13000000"
    }
  }
];

export const FieldSelectorValidator = {
  name: '🔧 字段选择器验证工具',
  render: (args) => ({
    template: `
      <div style="width: 900px;">
        <h2>🔧 PropertySelectSetter 配置验证工具</h2>
        <p style="color: #dc3545; margin-bottom: 24px;">
          <strong>问题诊断：</strong>字段选择器返回undefined，需要检查IDE中的字段配置
        </p>
        
        <!-- 问题分析 -->
        <div style="margin-bottom: 24px; padding: 16px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #721c24;">🚨 问题确认</h3>
          <div style="font-size: 14px; color: #721c24;">
            从您的日志可以看出：
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li><strong>hasParentIdField: true</strong> - 说明配置了父节点字段</li>
              <li><strong>parentId: undefined</strong> - 但字段选择器返回undefined</li>
              <li><strong>所有节点都成为根节点</strong> - 因为undefined被判断为根节点标识符</li>
            </ul>
            
            <div style="margin-top: 12px; padding: 8px; background: rgba(255, 255, 255, 0.7); border-radius: 4px;">
              <strong>结论：</strong>IDE中的父节点字段选择器没有正确工作，需要重新配置。
            </div>
          </div>
        </div>
        
        <!-- 手动验证工具 -->
        <div style="margin-bottom: 24px;">
          <h3>📋 手动验证正确的字段选择器</h3>
          <p style="color: #666; margin-bottom: 16px;">
            以下是正确配置的字段选择器，可以作为参考
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <!-- 正确的配置 -->
            <div style="padding: 12px; border: 1px solid #28a745; border-radius: 6px; background: #d4edda;">
              <h4 style="margin-top: 0; color: #155724;">✅ 正确配置示例</h4>
              <div style="margin-bottom: 8px; font-size: 12px;">
                <strong>字段映射：</strong><br>
                • 值字段: 返回 item.deptId<br>
                • 文本字段: 返回 item.name<br>
                • 父节点字段: 返回 item.parentDeptId
              </div>
              
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getCorrectDeptIdField"
                :text-field="getCorrectNameField"
                :parent-id-field="getCorrectParentDeptIdField"
                v-model="correctValue"
                placeholder="正确的字段配置"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 11px; color: #155724;">
                选中值: {{ correctValue || '无' }}
              </div>
            </div>
            
            <!-- 错误的配置模拟 -->
            <div style="padding: 12px; border: 1px solid #dc3545; border-radius: 6px; background: #f8d7da;">
              <h4 style="margin-top: 0; color: #721c24;">❌ 错误配置模拟</h4>
              <div style="margin-bottom: 8px; font-size: 12px;">
                <strong>字段映射：</strong><br>
                • 值字段: 返回 item.deptId<br>
                • 文本字段: 返回 item.name<br>
                • 父节点字段: 返回 undefined（错误！）
              </div>
              
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getCorrectDeptIdField"
                :text-field="getCorrectNameField"
                :parent-id-field="getBrokenParentField"
                v-model="brokenValue"
                placeholder="错误的字段配置"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 11px; color: #721c24;">
                选中值: {{ brokenValue || '无' }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 数据结构检查 -->
        <div style="margin-bottom: 24px;">
          <h3>🔍 数据结构验证</h3>
          <div style="margin-bottom: 12px; font-size: 12px;">
            <strong>原始数据结构（经过嵌套提取后）：</strong>
          </div>
          
          <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
            <pre style="font-size: 10px; margin: 0; max-height: 200px; overflow: auto;">{{ JSON.stringify(flattenedTestData, null, 2) }}</pre>
          </div>
          
          <div style="font-size: 12px; color: #666;">
            <strong>字段验证：</strong>
            <ul style="margin: 4px 0; padding-left: 16px;">
              <li v-for="(item, index) in flattenedTestData" :key="index" style="margin-bottom: 4px;">
                第{{index+1}}项: 
                <code>deptId="{{ item.deptId }}"</code>, 
                <code>name="{{ item.name }}"</code>, 
                <code>parentDeptId="{{ item.parentDeptId }}"</code>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 解决方案 -->
        <div style="padding: 16px; background: #fff3e0; border: 1px solid #ffcc02; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #f57c00;">💡 解决方案</h3>
          <div style="font-size: 14px;">
            <strong>请按以下步骤重新配置IDE中的字段选择器：</strong>
            <ol style="margin: 12px 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">
                <strong>打开IDE页面编辑器</strong>，选中您的树选择组件
              </li>
              <li style="margin-bottom: 8px;">
                <strong>在右侧属性面板中找到"父节点字段"配置项</strong>
              </li>
              <li style="margin-bottom: 8px;">
                <strong>点击字段选择器下拉框</strong>，确保选择了 <code style="background: #fef9e7; padding: 2px 4px; border-radius: 2px; color: #f57c00;">parentDeptId</code> 字段
              </li>
              <li style="margin-bottom: 8px;">
                <strong>保存配置并刷新页面</strong>，观察控制台日志是否有改善
              </li>
              <li style="margin-bottom: 8px;">
                <strong>验证：</strong>应该看到 <code>"🔗 PropertySelectSetter最终结论-子节点"</code> 的日志
              </li>
            </ol>
            
            <div style="margin-top: 12px; padding: 8px; background: rgba(40, 167, 69, 0.1); border-radius: 4px;">
              <strong>✅ 成功标志：</strong>控制台中应该出现详细的字段访问日志，且parentId不再是undefined
            </div>
          </div>
        </div>
        
        <!-- 进一步调试 -->
        <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 6px;">
          <h4 style="margin-top: 0;">🐛 如果问题仍然存在</h4>
          <div style="font-size: 12px;">
            请检查浏览器控制台中 <code>"🔧 [PropertySelectSetter 详细调试]"</code> 组合日志：
            <ul style="margin: 8px 0; padding-left: 16px;">
              <li><strong>parentIdField类型:</strong> 应该是 "function"</li>
              <li><strong>函数执行结果:</strong> 不应该是 undefined</li>
              <li><strong>数据项字段列表:</strong> 应该包含 parentDeptId</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: actualUserData,
        correctValue: null,
        brokenValue: null
      };
    },
    computed: {
      // 将嵌套数据扁平化，用于展示
      flattenedTestData() {
        return this.testData.map(item => {
          if (item.lCAPDepartment) {
            return item.lCAPDepartment;
          }
          return item;
        });
      }
    },
    methods: {
      // 正确的字段选择器
      getCorrectDeptIdField(item) {
        console.log('✅ [正确配置] getDeptIdField called with:', item, '-> returning:', item.deptId);
        return item.deptId;
      },
      getCorrectNameField(item) {
        console.log('✅ [正确配置] getNameField called with:', item, '-> returning:', item.name);
        return item.name;
      },
      getCorrectParentDeptIdField(item) {
        console.log('✅ [正确配置] getParentDeptIdField called with:', item, '-> returning:', item.parentDeptId);
        return item.parentDeptId;
      },
      
      // 错误的字段选择器（模拟用户的问题）
      getBrokenParentField(item) {
        console.log('❌ [错误配置] getBrokenParentField called with:', item, '-> returning: undefined');
        return undefined; // 模拟返回undefined的情况
      }
    }
  })
};

export const DebugHelper = {
  name: '🔍 调试助手',
  render: (args) => ({
    template: `
      <div style="width: 700px;">
        <h3>🔍 实时调试助手</h3>
        <p style="color: #666; margin-bottom: 16px;">
          实时监控PropertySelectSetter的工作情况
        </p>
        
        <div style="margin-bottom: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4 style="margin-top: 0;">📊 实时统计</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; font-size: 12px;">
            <div>
              <strong>调用次数:</strong> {{ debugStats.callCount }}
            </div>
            <div>
              <strong>返回undefined次数:</strong> {{ debugStats.undefinedCount }}
            </div>
            <div>
              <strong>返回有效值次数:</strong> {{ debugStats.validCount }}
            </div>
          </div>
        </div>
        
        <cwd-tree-select 
          :data-source="debugData"
          :value-field="debugGetDeptIdField"
          :text-field="debugGetNameField"
          :parent-id-field="debugGetParentDeptIdField"
          v-model="debugValue"
          placeholder="调试专用 - 查看控制台"
          :multiple="false"
        />
        
        <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
          <strong>选中值:</strong> {{ debugValue || '无' }}<br>
          <strong>调试提示:</strong> 请查看控制台中带有 "🔧 [PropertySelectSetter 详细调试]" 的日志组
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: #fff3e0; border-radius: 4px;">
          <h4 style="margin-top: 0;">📋 调试检查清单</h4>
          <div style="font-size: 12px;">
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" :checked="debugStats.callCount > 0"> 
              PropertySelectSetter被调用
            </label>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" :checked="debugStats.validCount > 0">
              返回了有效的父节点ID
            </label>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" :checked="debugStats.undefinedCount === 0">
              没有返回undefined
            </label>
            <label style="display: block; margin-bottom: 4px;">
              <input type="checkbox" :checked="debugValue != null">
              组件正常工作
            </label>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        debugData: actualUserData.slice(0, 3), // 使用少量数据进行调试
        debugValue: null,
        debugStats: {
          callCount: 0,
          undefinedCount: 0,
          validCount: 0
        }
      };
    },
    methods: {
      debugGetDeptIdField(item) {
        return item.deptId;
      },
      debugGetNameField(item) {
        return item.name;
      },
      debugGetParentDeptIdField(item) {
        this.debugStats.callCount++;
        
        const result = item.parentDeptId;
        if (result === undefined || result === null) {
          this.debugStats.undefinedCount++;
        } else {
          this.debugStats.validCount++;
        }
        
        console.log('🔧 [调试助手] parentDeptId访问:', {
          item: item.name,
          原始数据: item,
          parentDeptId字段值: result,
          字段类型: typeof result,
          调用统计: { ...this.debugStats }
        });
        
        return result;
      }
    }
  })
};