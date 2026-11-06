import Component from '../index';

export default {
  id: 'cwd-tree-select-debug-tree-building',
  title: '组件列表/CwdTreeSelect/树构建调试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 用户实际问题的测试数据
const problemData1 = [
  { id: 123, name: "测试", fid: 0 },
  { id: 456, name: "测试1", fid: 123 }
];

const problemData2 = [
  { id: 1, name: "根节点1", fid: null },
  { id: 2, name: "子节点1", fid: 1 },
  { id: 3, name: "子节点2", fid: 1 },
  { id: 4, name: "孙节点1", fid: 2 }
];

export const DebugTreeBuilding = {
  name: '树构建调试',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>树构建调试工具</h3>
        <p style="color: #666; margin-bottom: 24px;">
          调试为什么选择了父节点字段后没有形成树层级结构
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 第一个测试：用户的实际数据 -->
          <div>
            <h4>测试1：用户实际数据 (fid字段)</h4>
            <div style="margin-bottom: 12px; font-size: 12px;">
              <strong>数据结构：</strong>
              <pre style="background: #f8f9fa; padding: 8px; border-radius: 4px; font-size: 10px; overflow: auto; max-height: 120px;">{{ JSON.stringify(data1, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>字段配置：</strong> 值字段=getIdField, 文本字段=getNameField, 父节点字段=getFidField
            </div>
            
            <cwd-tree-select 
              :data-source="data1"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getFidField"
              v-model="value1"
              placeholder="请选择（用户数据）"
              :multiple="false"
              @change="onChange1"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ value1 || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 11px;">
              <strong>预期结果：</strong> "测试"(id:123,fid:0) 作为根节点，"测试1"(id:456,fid:123) 作为其子节点
            </div>
          </div>
          
          <!-- 第二个测试：标准数据格式 -->
          <div>
            <h4>测试2：标准数据格式 (fid字段)</h4>
            <div style="margin-bottom: 12px; font-size: 12px;">
              <strong>数据结构：</strong>
              <pre style="background: #f8f9fa; padding: 8px; border-radius: 4px; font-size: 10px; overflow: auto; max-height: 120px;">{{ JSON.stringify(data2, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>字段配置：</strong> 值字段=getIdField, 文本字段=getNameField, 父节点字段=getFidField
            </div>
            
            <cwd-tree-select 
              :data-source="data2"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getFidField"
              v-model="value2"
              placeholder="请选择（标准数据）"
              :multiple="false"
              @change="onChange2"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ value2 || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 11px;">
              <strong>预期结果：</strong> 应该显示正确的多层树结构
            </div>
          </div>
        </div>
        
        <!-- 自动检测对比 -->
        <div style="margin-top: 24px;">
          <h4>对比：自动检测 vs 属性选择器</h4>
          <p style="color: #666; margin-bottom: 16px;">
            对比同一数据源使用自动检测和属性选择器的效果
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <h5>自动检测父节点字段</h5>
              <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
                配置：未指定父节点字段，自动检测
              </div>
              
              <cwd-tree-select 
                :data-source="data1"
                :value-field="getIdField"
                :text-field="getNameField"
                v-model="autoValue"
                placeholder="自动检测"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ autoValue || '无' }}
              </div>
            </div>
            
            <div>
              <h5>属性选择器配置</h5>
              <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
                配置：通过PropertySelectSetter选择fid字段
              </div>
              
              <cwd-tree-select 
                :data-source="data1"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getFidField"
                v-model="selectorValue"
                placeholder="属性选择器"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ selectorValue || '无' }}
              </div>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 24px; padding: 12px; background: #fff3e0; border-radius: 4px;">
          <h4 style="margin-top: 0;">🔍 调试步骤：</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>打开浏览器开发者工具的Console面板</li>
            <li>观察组件日志输出，检查字段选择器是否正确工作</li>
            <li>检查树构建过程中的节点关系映射</li>
            <li>验证父子节点ID的匹配逻辑</li>
            <li>确认数字0是否被正确处理为有效的父节点ID</li>
          </ol>
        </div>
      </div>
    `,
    data() {
      return {
        data1: problemData1,
        data2: problemData2,
        value1: null,
        value2: null,
        autoValue: null,
        selectorValue: null
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
      getFidField(item) {
        console.log('getFidField called with:', item, 'returning:', item.fid);
        return item.fid;
      },
      onChange1(event) {
        console.log('测试1 - 选择改变:', event);
      },
      onChange2(event) {
        console.log('测试2 - 选择改变:', event);
      }
    }
  })
};

export const StepByStepDebug = {
  name: '分步调试流程',
  render: (args) => ({
    template: `
      <div style="width: 600px;">
        <h3>分步调试流程</h3>
        <p style="color: #666; margin-bottom: 16px;">
          手动验证每个步骤是否正常工作
        </p>
        
        <!-- 步骤1：数据源检查 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
          <h4>步骤1：数据源检查</h4>
          <div style="font-size: 12px;">
            <strong>原始数据：</strong>
            <pre style="background: #f8f9fa; padding: 8px; border-radius: 4px; font-size: 10px;">{{ JSON.stringify(testData, null, 2) }}</pre>
          </div>
        </div>
        
        <!-- 步骤2：字段选择器测试 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
          <h4>步骤2：字段选择器测试</h4>
          <div style="font-size: 12px;">
            <div v-for="(item, index) in testData" :key="index" style="margin-bottom: 4px;">
              <strong>数据项 {{ index + 1 }}:</strong>
              值字段={{ getIdField(item) }}, 
              文本字段={{ getNameField(item) }}, 
              父节点字段={{ getFidField(item) }}
            </div>
          </div>
        </div>
        
        <!-- 步骤3：组件渲染 -->
        <div style="margin-bottom: 20px; padding: 12px; border: 1px solid #ddd; border-radius: 4px;">
          <h4>步骤3：组件渲染测试</h4>
          
          <cwd-tree-select 
            :data-source="testData"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getFidField"
            v-model="debugValue"
            placeholder="分步调试测试"
            :multiple="false"
            @change="onDebugChange"
          />
          
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            当前选中值: {{ debugValue || '无' }}
          </div>
        </div>
        
        <!-- 步骤4：预期结果 -->
        <div style="padding: 12px; background: #e8f5e8; border-radius: 4px;">
          <h4 style="margin-top: 0;">步骤4：预期结果验证</h4>
          <div style="font-size: 12px;">
            <strong>应该看到：</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>下拉面板中显示树形结构</li>
              <li>"测试" 作为根节点（因为 fid=0 且数据中没有 id=0 的节点）</li>
              <li>"测试1" 作为 "测试" 的子节点（因为 fid=123 对应父节点id=123）</li>
              <li>可以展开/收起节点</li>
              <li>Console中有详细的调试日志</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: [
          { id: 123, name: "测试", fid: 0 },
          { id: 456, name: "测试1", fid: 123 }
        ],
        debugValue: null
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getFidField(item) {
        return item.fid;
      },
      onDebugChange(event) {
        console.log('分步调试 - 选择改变:', event);
      }
    }
  })
};