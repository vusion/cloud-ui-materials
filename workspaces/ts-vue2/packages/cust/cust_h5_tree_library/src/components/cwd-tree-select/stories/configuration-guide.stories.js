import Component from '../index';

export default {
  id: 'cwd-tree-select-configuration-guide',
  title: '组件列表/CwdTreeSelect/配置指南',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 用户实际数据格式
const userRealData = [
  {
    "lCAPDepartment": {
      "id": 3214327916045824,
      "name": "中铁工业",
      "deptId": "13000000",
      "parentDeptId": "10000000" // 父节点不存在，会成为根节点
    }
  },
  {
    "lCAPDepartment": {
      "id": 3214327916045825,
      "name": "中铁工业本部",
      "deptId": "13000001", 
      "parentDeptId": "13000000" // 指向中铁工业
    }
  },
  {
    "lCAPDepartment": {
      "id": 3214327916045826,
      "name": "中铁山桥",
      "deptId": "13000002",
      "parentDeptId": "13000000" // 指向中铁工业
    }
  },
  {
    "lCAPDepartment": {
      "id": 3214327916045827,
      "name": "公司领导及高管",
      "deptId": "13000026",
      "parentDeptId": "13000001" // 指向中铁工业本部
    }
  }
];

export const ConfigurationGuide = {
  name: '📋 配置指南',
  render: (args) => ({
    template: `
      <div style="width: 1000px;">
        <div style="background: #e3f2fd; padding: 20px; margin-bottom: 24px; border-radius: 8px; border-left: 4px solid #2196f3;">
          <h2 style="margin: 0 0 16px 0; color: #1976d2;">🎯 CwdTreeSelect 树形结构配置指南</h2>
          <div style="font-size: 14px; line-height: 1.6; color: #424242;">
            <strong>问题症状：</strong>组件只显示平铺列表，没有树形层级结构<br>
            <strong>解决方案：</strong>在IDE的属性面板中正确配置字段映射
          </div>
        </div>

        <!-- 步骤说明 -->
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
          <div style="background: #f5f5f5; padding: 16px; border-bottom: 1px solid #e0e0e0;">
            <h3 style="margin: 0; color: #333;">⚙️ IDE配置步骤</h3>
          </div>
          <div style="padding: 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
              <div style="padding: 16px; background: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                <h4 style="margin: 0 0 8px 0; color: #28a745;">1️⃣ 值字段配置</h4>
                <div style="font-size: 13px; color: #666;">
                  在属性面板中找到<strong>"值字段"</strong><br>
                  点击选择器，选择：<br>
                  <code style="background: #e9ecef; padding: 2px 4px; border-radius: 3px;">deptId</code>
                </div>
              </div>
              
              <div style="padding: 16px; background: #f8f9fa; border-radius: 6px; border: 1px solid #dee2e6;">
                <h4 style="margin: 0 0 8px 0; color: #007bff;">2️⃣ 文本字段配置</h4>
                <div style="font-size: 13px; color: #666;">
                  在属性面板中找到<strong>"文本字段"</strong><br>
                  点击选择器，选择：<br>
                  <code style="background: #e9ecef; padding: 2px 4px; border-radius: 3px;">name</code>
                </div>
              </div>
              
              <div style="padding: 16px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffeaa7;">
                <h4 style="margin: 0 0 8px 0; color: #d68910;">3️⃣ 父节点字段配置（关键！）</h4>
                <div style="font-size: 13px; color: #666;">
                  在属性面板中找到<strong>"父节点字段"</strong><br>
                  点击选择器，选择：<br>
                  <code style="background: #fef9e7; padding: 2px 4px; border-radius: 3px;">parentDeptId</code>
                </div>
              </div>
            </div>
            
            <div style="margin-top: 16px; padding: 12px; background: #d4edda; border-radius: 4px; border: 1px solid #c3e6cb;">
              <strong style="color: #155724;">✅ 配置完成后的效果：</strong>
              <div style="font-size: 13px; color: #155724; margin-top: 4px;">
                组件会自动根据 parentDeptId 字段构建树形结构，显示正确的父子关系和展开/收起功能
              </div>
            </div>
          </div>
        </div>

        <!-- 对比演示 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 错误配置示例 -->
          <div style="border: 1px solid #f5c6cb; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8d7da; padding: 12px; border-bottom: 1px solid #f5c6cb;">
              <h4 style="margin: 0; color: #721c24;">❌ 错误配置（未配置父节点字段）</h4>
            </div>
            <div style="padding: 16px;">
              <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
                <strong>配置：</strong>只配置了值字段和文本字段，未配置父节点字段
              </div>
              
              <cwd-tree-select 
                :data-source="userData"
                :value-field="getDeptIdField"
                :text-field="getNameField"
                v-model="wrongValue"
                placeholder="错误配置示例"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中值: {{ wrongValue || '无' }}
              </div>
              
              <div style="margin-top: 12px; padding: 8px; background: #f8d7da; border-radius: 4px; font-size: 11px; color: #721c24;">
                <strong>结果：</strong>显示为平铺列表，没有树形结构
              </div>
            </div>
          </div>
          
          <!-- 正确配置示例 -->
          <div style="border: 1px solid #c3e6cb; border-radius: 8px; overflow: hidden;">
            <div style="background: #d4edda; padding: 12px; border-bottom: 1px solid #c3e6cb;">
              <h4 style="margin: 0; color: #155724;">✅ 正确配置（包含父节点字段）</h4>
            </div>
            <div style="padding: 16px;">
              <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
                <strong>配置：</strong>值字段=deptId, 文本字段=name, 父节点字段=parentDeptId
              </div>
              
              <cwd-tree-select 
                :data-source="userData"
                :value-field="getDeptIdField"
                :text-field="getNameField"
                :parent-id-field="getParentDeptIdField"
                v-model="correctValue"
                placeholder="正确配置示例"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中值: {{ correctValue || '无' }}
              </div>
              
              <div style="margin-top: 12px; padding: 8px; background: #d4edda; border-radius: 4px; font-size: 11px; color: #155724;">
                <strong>结果：</strong>显示为树形结构，支持展开/收起
              </div>
            </div>
          </div>
        </div>
        
        <!-- 数据结构说明 -->
        <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #dee2e6;">
          <h4 style="margin: 0 0 12px 0;">📋 数据结构分析</h4>
          <pre style="font-size: 10px; background: white; padding: 12px; border-radius: 4px; overflow: auto; max-height: 200px; border: 1px solid #e0e0e0;">{{ JSON.stringify(userData, null, 2) }}</pre>
          
          <div style="margin-top: 12px; font-size: 13px; color: #666;">
            <strong>预期树结构：</strong><br>
            📁 中铁工业 (deptId: 13000000, parentDeptId: 10000000 - 父节点不存在，成为根节点)<br>
            &nbsp;&nbsp;├── 📁 中铁工业本部 (parentDeptId: 13000000)<br>
            &nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── 📄 公司领导及高管 (parentDeptId: 13000001)<br>
            &nbsp;&nbsp;└── 📄 中铁山桥 (parentDeptId: 13000000)
          </div>
        </div>
        
        <!-- 常见问题 -->
        <div style="margin-top: 24px; padding: 16px; background: #fff8e1; border-radius: 8px; border: 1px solid #ffecb3;">
          <h4 style="margin: 0 0 12px 0; color: #f57c00;">🤔 常见问题排查</h4>
          <div style="font-size: 13px; color: #e65100; line-height: 1.6;">
            <strong>Q: 为什么配置了字段还是显示平铺？</strong><br>
            A: 请检查控制台日志，确保字段选择器函数被正确调用<br><br>
            
            <strong>Q: 如何确认字段配置是否生效？</strong><br>
            A: 打开控制台，应该看到类似 "🔧 [Field Mapping] getParentDeptIdField called" 的日志<br><br>
            
            <strong>Q: 数据是嵌套格式怎么办？</strong><br>
            A: 组件会自动提取嵌套对象（如 lCAPDepartment），无需特殊处理
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        userData: userRealData,
        wrongValue: null,
        correctValue: null
      };
    },
    methods: {
      getDeptIdField(item) {
        console.log('🔧 [Configuration Guide] getDeptIdField called:', item);
        return item.deptId;
      },
      getNameField(item) {
        console.log('🔧 [Configuration Guide] getNameField called:', item);
        return item.name;
      },
      getParentDeptIdField(item) {
        console.log('🔧 [Configuration Guide] getParentDeptIdField called:', item, '-> returning:', item.parentDeptId);
        return item.parentDeptId;
      }
    }
  })
};

export const QuickTest = {
  name: '🚀 快速测试',
  render: (args) => ({
    template: `
      <div style="width: 600px;">
        <h3>快速测试您的配置</h3>
        <p style="color: #666; margin-bottom: 16px;">
          使用以下测试组件验证您的字段配置是否正确
        </p>
        
        <cwd-tree-select 
          :data-source="testData"
          :value-field="getDeptIdField"
          :text-field="getNameField"
          :parent-id-field="getParentDeptIdField"
          v-model="testValue"
          placeholder="快速测试 - 应该显示树形结构"
          :multiple="false"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4 style="margin-top: 0;">测试结果：</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>选中值: {{ testValue || '无' }}</div>
          </div>
          
          <div style="margin-top: 12px; font-size: 12px;">
            <strong>✅ 成功标志：</strong><br>
            • 下拉框中显示 "中铁工业" 作为根节点<br>
            • "中铁工业" 前面有展开箭头 ▶<br>
            • 点击箭头可以展开显示子节点<br>
            • 控制台有 "🔧 [Field Mapping]" 相关日志
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: userRealData.slice(0, 4), // 取前4条数据用于测试
        testValue: null
      };
    },
    methods: {
      getDeptIdField(item) {
        return item.deptId;
      },
      getNameField(item) {
        return item.name;
      },
      getParentDeptIdField(item) {
        return item.parentDeptId;
      }
    }
  })
};