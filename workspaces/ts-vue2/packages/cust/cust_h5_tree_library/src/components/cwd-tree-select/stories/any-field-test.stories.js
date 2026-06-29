import Component from '../index';

export default {
  id: 'cwd-tree-select-any-field-test',
  title: '组件列表/CwdTreeSelect/任意字段测试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const AnyFieldTest = {
  name: '任意字段作为父节点字段',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>任意字段作为父节点字段测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          <strong style="color: #28a745;">✅ 已彻底修复：</strong>现在完全支持任意字段名作为父节点字段，不再依赖预设列表
        </p>
        
        <div style="margin-bottom: 16px; padding: 12px; background: #e8f5e8; border-radius: 4px;">
          <h4 style="margin-top: 0; color: #28a745;">🎯 修复后的工作原理</h4>
          <div style="font-size: 14px;">
            <strong>✅ 简化逻辑：</strong><br>
            • 配置了父节点字段选择器 → 完全使用该字段构建树结构<br>
            • 未配置父节点字段选择器 → 所有数据显示为平铺列表<br>
            • <strong style="color: #dc3545;">完全移除预设字段和自动检测机制</strong>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 用户实际问题：aapid字段 -->
          <div>
            <h4>✅ 用户的aapid字段</h4>
            
            <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
              <strong>数据结构：</strong>
              <pre style="font-size: 10px; margin: 4px 0;">{{ JSON.stringify(aapidData, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>字段配置：</strong>
              <div>• 值字段: id</div>
              <div>• 文本字段: name</div>
              <div style="color: #007bff; font-weight: bold;">• 父节点字段: aapid（通过属性选择器选择）</div>
            </div>
            
            <cwd-tree-select 
              :data-source="aapidData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getAapidField"
              v-model="aapidValue"
              placeholder="选择aapid字段的数据"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ aapidValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
              <strong>✅ 修复后效果：</strong><br>
              • "测试4" 作为根节点（aapid=0，数据中没有id=0的项）<br>
              • "测试5" 作为 "测试4" 的子节点（aapid=123）
            </div>
          </div>
          
          <!-- 其他奇特字段名测试 -->
          <div>
            <h4>🚀 自定义字段名</h4>
            
            <div style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
              <strong>数据结构：</strong>
              <pre style="font-size: 10px; margin: 4px 0;">{{ JSON.stringify(customData, null, 2) }}</pre>
            </div>
            
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>字段配置：</strong>
              <div>• 值字段: uuid</div>
              <div>• 文本字段: title</div>
              <div style="color: #007bff; font-weight: bold;">• 父节点字段: superior_node_id（通过属性选择器选择）</div>
            </div>
            
            <cwd-tree-select 
              :data-source="customData"
              :value-field="getUuidField"
              :text-field="getTitleField"
              :parent-id-field="getSuperiorField"
              v-model="customValue"
              placeholder="选择自定义字段的数据"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ customValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
              <strong>✅ 预期结果：</strong><br>
              • "根部门" 作为根节点（superior_node_id=null）<br>
              • "研发部" 作为 "根部门" 的子节点
            </div>
          </div>
        </div>
        
        <!-- 平铺显示对比 -->
        <div style="margin-top: 24px;">
          <h4>📋 对比：未配置时的平铺显示</h4>
          <p style="color: #666; margin-bottom: 16px;">
            验证未配置父节点字段时，数据显示为平铺列表
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <h5>aapid数据 - 无配置</h5>
              <div style="margin-bottom: 8px; font-size: 11px; color: #666;">
                不配置父节点字段，应该显示为平铺列表
              </div>
              
              <cwd-tree-select 
                :data-source="aapidData"
                :value-field="getIdField"
                :text-field="getNameField"
                v-model="aapidFlatValue"
                placeholder="aapid平铺显示"
                :multiple="false"
              />
              
              <div style="margin-top: 4px; font-size: 11px; color: #666;">
                选中: {{ aapidFlatValue || '无' }}
              </div>
              
              <div style="margin-top: 8px; padding: 6px; background: #fff3e0; border-radius: 4px; font-size: 10px;">
                <strong>📋 预期：</strong>所有数据显示为平铺列表
              </div>
            </div>
            
            <div>
              <h5>自定义数据 - 无配置</h5>
              <div style="margin-bottom: 8px; font-size: 11px; color: #666;">
                不配置父节点字段，应该显示为平铺列表
              </div>
              
              <cwd-tree-select 
                :data-source="customData"
                :value-field="getUuidField"
                :text-field="getTitleField"
                v-model="customFlatValue"
                placeholder="自定义平铺显示"
                :multiple="false"
              />
              
              <div style="margin-top: 4px; font-size: 11px; color: #666;">
                选中: {{ customFlatValue || '无' }}
              </div>
              
              <div style="margin-top: 8px; padding: 6px; background: #fff3e0; border-radius: 4px; font-size: 10px;">
                <strong>📋 预期：</strong>所有数据显示为平铺列表
              </div>
            </div>
          </div>
        </div>
        
        <!-- 数字0特殊处理测试 -->
        <div style="margin-top: 24px;">
          <h4>🔢 数字0的特殊处理</h4>
          <p style="color: #666; margin-bottom: 16px;">
            验证数字0被正确处理为有效的父节点ID
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <h5>包含0作为有效父ID</h5>
              <div style="margin-bottom: 8px; padding: 6px; background: #f8f9fa; border-radius: 4px; font-size: 10px;">
                <pre>{{ JSON.stringify(zeroData, null, 2) }}</pre>
              </div>
              
              <cwd-tree-select 
                :data-source="zeroData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getManagerIdField"
                v-model="zeroValue"
                placeholder="测试数字0的处理"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ zeroValue || '无' }}
              </div>
              
              <div style="margin-top: 8px; padding: 6px; background: #e8f5e8; border-radius: 4px; font-size: 10px;">
                <strong>✅ 预期：</strong>"CEO"是根节点，"总监"是"CEO"的子节点
              </div>
            </div>
            
            <div>
              <h5>null/undefined作为根节点标识</h5>
              <div style="margin-bottom: 8px; padding: 6px; background: #f8f9fa; border-radius: 4px; font-size: 10px;">
                <pre>{{ JSON.stringify(nullData, null, 2) }}</pre>
              </div>
              
              <cwd-tree-select 
                :data-source="nullData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getManagerIdField"
                v-model="nullValue"
                placeholder="测试null的处理"
                :multiple="false"
              />
              
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ nullValue || '无' }}
              </div>
              
              <div style="margin-top: 8px; padding: 6px; background: #e8f5e8; border-radius: 4px; font-size: 10px;">
                <strong>✅ 预期：</strong>"董事长"是根节点，"经理"是"董事长"的子节点
              </div>
            </div>
          </div>
        </div>
        
        <!-- 调试说明 -->
        <div style="margin-top: 24px; padding: 12px; background: #e3f2fd; border-radius: 4px;">
          <h4 style="margin-top: 0;">🐛 调试方法：</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>打开浏览器开发者工具Console面板</li>
            <li>查看🔧标记的字段映射日志</li>
            <li>查看🌳标记的树构建日志</li>
            <li>确认日志中有"ONLY PropertySelectSetter"字样</li>
            <li>确认不再有任何自动检测相关的日志</li>
          </ol>
          
          <div style="margin-top: 12px; padding: 8px; background: rgba(40, 167, 69, 0.1); border-radius: 4px;">
            <strong>🎉 修复确认：</strong>现在任何字段名都应该能正确工作，完全不再依赖预设字段列表！
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        // 用户实际数据：aapid字段
        aapidData: [
          { id: 123, name: "测试4", aapid: 0 },
          { id: 456, name: "测试5", aapid: 123 }
        ],
        
        // 自定义字段名数据
        customData: [
          { uuid: 'DEPT001', title: '根部门', superior_node_id: null },
          { uuid: 'DEPT002', title: '研发部', superior_node_id: 'DEPT001' },
          { uuid: 'DEPT003', title: '前端组', superior_node_id: 'DEPT002' }
        ],
        
        // 数字0测试数据
        zeroData: [
          { id: 0, name: 'CEO', manager_id: null },
          { id: 1, name: '总监', manager_id: 0 }
        ],
        
        // null测试数据
        nullData: [
          { id: 1, name: '董事长', manager_id: null },
          { id: 2, name: '经理', manager_id: 1 }
        ],
        
        // 各种值
        aapidValue: null,
        customValue: null,
        aapidFlatValue: null,
        customFlatValue: null,
        zeroValue: null,
        nullValue: null
      };
    },
    methods: {
      // 基础字段映射
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      
      // aapid字段映射
      getAapidField(item) {
        console.log('🔧 getAapidField called with:', item, '-> returning:', item.aapid);
        return item.aapid;
      },
      
      // 自定义字段映射
      getUuidField(item) {
        return item.uuid;
      },
      getTitleField(item) {
        return item.title;
      },
      getSuperiorField(item) {
        console.log('🔧 getSuperiorField called with:', item, '-> returning:', item.superior_node_id);
        return item.superior_node_id;
      },
      
      // manager_id字段映射
      getManagerIdField(item) {
        console.log('🔧 getManagerIdField called with:', item, '-> returning:', item.manager_id);
        return item.manager_id;
      }
    }
  })
};

export const ComparisonTest = {
  name: '配置vs未配置对比',
  render: (args) => ({
    template: `
      <div style="width: 800px;">
        <h3>配置vs未配置对比测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          对比配置父节点字段和未配置父节点字段的不同效果
        </p>
        
        <div style="margin-bottom: 16px; padding: 8px; background: #f8f9fa; border-radius: 4px;">
          <strong>测试数据：</strong>
          <pre style="font-size: 10px; margin: 4px 0;">{{ JSON.stringify(testData, null, 2) }}</pre>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <!-- 未配置父节点字段 -->
          <div>
            <h4>📋 未配置父节点字段</h4>
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>配置：</strong>不指定父节点字段
            </div>
            
            <cwd-tree-select 
              :data-source="testData"
              :value-field="getIdField"
              :text-field="getNameField"
              v-model="noConfigValue"
              placeholder="未配置父节点字段"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ noConfigValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 11px;">
              <strong>📋 效果：</strong>所有数据显示为平铺列表，无树形结构
            </div>
          </div>
          
          <!-- 配置了父节点字段 -->
          <div>
            <h4>🌳 配置了父节点字段</h4>
            <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
              <strong>配置：</strong>通过属性选择器指定custom_parent字段
            </div>
            
            <cwd-tree-select 
              :data-source="testData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getCustomParentField"
              v-model="configuredValue"
              placeholder="配置了父节点字段"
              :multiple="false"
            />
            
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中值: {{ configuredValue || '无' }}
            </div>
            
            <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 11px;">
              <strong>🌳 效果：</strong>根据custom_parent字段构建树形结构
            </div>
          </div>
        </div>
        
        <!-- 结果分析 -->
        <div style="margin-top: 24px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <h4 style="margin-top: 0;">🔍 结果分析：</h4>
          <div style="font-size: 14px;">
            <div style="margin-bottom: 12px;">
              <strong>未配置模式：</strong>
              <div style="font-size: 12px; color: #666; margin-left: 16px;">
                • 所有数据都作为根节点显示<br>
                • 显示为平铺列表，没有任何层级关系<br>
                • 不会进行任何字段的自动检测
              </div>
            </div>
            
            <div style="margin-bottom: 12px;">
              <strong>配置模式：</strong>
              <div style="font-size: 12px; color: #666; margin-left: 16px;">
                • 完全使用PropertySelectSetter配置的字段<br>
                • 根据字段值构建正确的树形结构<br>
                • 不会回退到任何自动检测逻辑
              </div>
            </div>
            
            <div style="padding: 8px; background: rgba(40, 167, 69, 0.1); border-radius: 4px;">
              <strong>💡 核心改进：</strong>逻辑更加简单清晰，用户选择什么字段，就用什么字段，不再有任何预设和自动检测！
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData: [
          { 
            id: 'A', 
            name: '节点A', 
            custom_parent: null       // 自定义字段：A是根节点
          },
          { 
            id: 'B', 
            name: '节点B', 
            custom_parent: 'A'        // 自定义字段：B的父节点是A
          },
          { 
            id: 'C', 
            name: '节点C', 
            custom_parent: 'A'        // 自定义字段：C的父节点是A
          }
        ],
        noConfigValue: null,
        configuredValue: null
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getCustomParentField(item) {
        console.log('🔧 getCustomParentField called with:', item, '-> returning:', item.custom_parent);
        return item.custom_parent;
      }
    }
  })
};