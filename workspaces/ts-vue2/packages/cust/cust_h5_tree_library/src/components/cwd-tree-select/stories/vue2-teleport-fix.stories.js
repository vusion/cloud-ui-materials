import Component from '../index';

export default {
  id: 'cwd-tree-select-vue2-teleport-fix',
  title: '组件列表/CwdTreeSelect/Vue2兼容性修复',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

const testData = [
  { id: 1, name: '根节点1', parentId: null },
  { id: 11, name: '子节点1-1', parentId: 1 },
  { id: 12, name: '子节点1-2', parentId: 1 },
  { id: 111, name: '孙节点1-1-1', parentId: 11 },
  { id: 2, name: '根节点2', parentId: null },
  { id: 21, name: '子节点2-1', parentId: 2 },
  { id: 22, name: '子节点2-2', parentId: 2 },
];

export const Vue2TeleportFix = {
  name: 'Vue2 Teleport兼容性修复',
  render: (args) => ({
    template: `
      <div style="width: 100%; min-height: 150vh; padding: 20px;">
        <h3>Vue2 Teleport兼容性修复测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          修复Vue2中不支持teleport导致的弹出层不显示问题
        </p>
        
        <!-- 顶部测试区域 -->
        <div style="margin-bottom: 40px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h4>页面顶部 - 向下弹出测试</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <h5>相对定位（不挂载到body）</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value1"
                placeholder="相对定位测试"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ value1 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>挂载到body（修复后）</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value2"
                placeholder="Body挂载测试"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ value2 || '无' }}
              </div>
            </div>
          </div>
          
          <div style="padding: 12px; background: #e8f5e8; border-radius: 4px;">
            <strong>✅ 预期结果：</strong>两个选择器都应该能正常弹出向下的下拉面板
          </div>
        </div>
        
        <!-- 中间填充 -->
        <div style="height: 600px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px; margin-bottom: 40px;">
          <h3 style="color: #999;">滚动到底部进行向上弹出测试</h3>
        </div>
        
        <!-- 底部测试区域 -->
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
          <h4>页面底部 - 向上弹出测试</h4>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
              <h5>相对定位 + 向上弹出</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value3"
                placeholder="相对定位向上"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ value3 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>Body挂载 + 向上弹出</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value4"
                placeholder="Body挂载向上"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 12px; color: #666;">
                选中: {{ value4 || '无' }}
              </div>
            </div>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h5>强制向上弹出测试</h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h6>相对定位 + 强制向上</h6>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="value5"
                  placeholder="强制向上（相对）"
                  :append-to-body="false"
                  placement="top"
                  :multiple="false"
                />
              </div>
              
              <div>
                <h6>Body挂载 + 强制向上</h6>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="value6"
                  placeholder="强制向上（Body）"
                  :append-to-body="true"
                  placement="top"
                  :multiple="false"
                />
              </div>
            </div>
          </div>
          
          <div style="padding: 12px; background: #e8f5e8; border-radius: 4px;">
            <strong>✅ 预期结果：</strong>所有选择器都应该能正常弹出向上的下拉面板
          </div>
        </div>
        
        <!-- 修复说明 -->
        <div style="margin-top: 30px; padding: 16px; background: #fff3e0; border-radius: 8px;">
          <h4 style="margin-top: 0;">🔧 修复说明：</h4>
          <div style="font-size: 14px;">
            <strong>问题：</strong>Vue2不支持teleport组件，导致弹出层无法正确渲染<br>
            <strong>解决方案：</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>移除teleport组件，使用v-if条件渲染</li>
              <li>appendToBody=false时，使用相对定位</li>
              <li>appendToBody=true时，使用固定定位挂载到body</li>
              <li>保持原有的智能位置计算和样式控制</li>
            </ul>
          </div>
        </div>
        
        <!-- 测试提示 -->
        <div style="margin-top: 20px; padding: 12px; background: #e3f2fd; border-radius: 4px;">
          <h4 style="margin-top: 0;">🧪 测试要点：</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>弹出层显示：</strong>所有配置下弹出层都应该正常显示</li>
            <li><strong>位置计算：</strong>向上/向下弹出方向应该正确</li>
            <li><strong>样式渲染：</strong>弹出层样式应该正确应用</li>
            <li><strong>交互功能：</strong>选择、展开/收起功能正常</li>
            <li><strong>遮挡处理：</strong>appendToBody应该能解决遮挡问题</li>
          </ol>
        </div>
      </div>
    `,
    data() {
      return {
        testData,
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: null,
        value6: null
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
        return item.parentId;
      }
    }
  })
};