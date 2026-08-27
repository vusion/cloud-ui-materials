import Component from '../index';

export default {
  id: 'cwd-tree-select-positioning-test',
  title: '组件列表/CwdTreeSelect/位置测试',
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
  { id: 211, name: '孙节点2-1-1', parentId: 21 },
];

export const PositioningTest = {
  name: '弹出层位置测试',
  render: (args) => ({
    template: `
      <div style="width: 100%; min-height: 150vh; padding: 20px;">
        <h3>弹出层位置智能调整测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          测试在不同位置时弹出层的智能定位功能
        </p>
        
        <!-- 页面顶部测试 -->
        <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h4>页面顶部区域 - 向下弹出</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 16px;">
            在页面顶部时，下方有充足空间，弹出层应该向下展开
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
            <div>
              <h5>相对定位 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value1"
                placeholder="相对定位-自动"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
              />
            </div>
            
            <div>
              <h5>挂载到Body + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value2"
                placeholder="Body挂载-自动"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
            </div>
            
            <div>
              <h5>强制向上弹出</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value3"
                placeholder="强制向上"
                :append-to-body="true"
                placement="top"
                :multiple="false"
              />
            </div>
          </div>
        </div>
        
        <!-- 填充空间 -->
        <div style="height: 800px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #999;">中间填充区域 - 滚动到底部测试</h3>
        </div>
        
        <!-- 页面底部测试 -->
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
          <h4>页面底部区域 - 向上弹出</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 16px;">
            在页面底部时，下方空间不足，弹出层应该向上展开
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
            <div>
              <h5>相对定位 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value4"
                placeholder="相对定位-自动"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ value4 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>挂载到Body + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value5"
                placeholder="Body挂载-自动"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ value5 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>强制向下弹出</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="value6"
                placeholder="强制向下"
                :append-to-body="true"
                placement="bottom"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ value6 || '无' }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 配置说明 -->
        <div style="margin-top: 30px; padding: 16px; background: #e8f5e8; border-radius: 8px;">
          <h4 style="margin-top: 0;">📋 配置说明：</h4>
          <div style="font-size: 14px;">
            <strong>🎯 appendToBody:</strong> 是否将弹出层挂载到body元素下<br>
            <strong>• true:</strong> 解决容器遮挡问题，适用于复杂布局<br>
            <strong>• false:</strong> 相对定位，适用于简单场景<br><br>
            
            <strong>🎯 placement:</strong> 弹出方向控制<br>
            <strong>• auto:</strong> 智能判断，优先向下，空间不足时向上<br>
            <strong>• bottom:</strong> 强制向下弹出<br>
            <strong>• top:</strong> 强制向上弹出<br><br>
            
            <strong>🎯 智能定位逻辑:</strong><br>
            <strong>1.</strong> 计算上下可用空间<br>
            <strong>2.</strong> 优先使用下方空间<br>
            <strong>3.</strong> 下方空间不足且上方空间更大时，向上弹出<br>
            <strong>4.</strong> 动态调整最大高度以适应可用空间
          </div>
        </div>
        
        <!-- 测试提示 -->
        <div style="margin-top: 20px; padding: 12px; background: #fff3e0; border-radius: 4px;">
          <h4 style="margin-top: 0;">🧪 测试方法：</h4>
          <ol style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li>在页面顶部打开下拉框，观察是否向下弹出</li>
            <li>滚动到页面底部，打开下拉框，观察是否向上弹出</li>
            <li>对比相对定位和body挂载的区别</li>
            <li>测试强制方向设置是否生效</li>
            <li>滚动页面时，body挂载的弹出层是否跟随移动</li>
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

export const ContainerTest = {
  name: '容器遮挡测试',
  render: (args) => ({
    template: `
      <div style="width: 100%; padding: 20px;">
        <h3>容器遮挡问题测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          测试在有遮挡的容器中使用appendToBody解决显示问题
        </p>
        
        <!-- 普通容器 -->
        <div style="margin-bottom: 40px;">
          <h4>正常容器（无遮挡）</h4>
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h5>相对定位</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="normalValue1"
                  placeholder="相对定位"
                  :append-to-body="false"
                  :multiple="false"
                />
              </div>
              
              <div>
                <h5>挂载到Body</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="normalValue2"
                  placeholder="挂载到Body"
                  :append-to-body="true"
                  :multiple="false"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- 有遮挡的容器 -->
        <div style="margin-bottom: 40px;">
          <h4>有遮挡的容器（overflow: hidden + 固定高度）</h4>
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; overflow: hidden; height: 200px; position: relative;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h5>相对定位 - 会被遮挡</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="hiddenValue1"
                  placeholder="相对定位（会被遮挡）"
                  :append-to-body="false"
                  :multiple="false"
                />
                <div style="margin-top: 8px; font-size: 11px; color: #f56c6c;">
                  ⚠ 弹出层会被容器遮挡
                </div>
              </div>
              
              <div>
                <h5>挂载到Body - 不被遮挡</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="hiddenValue2"
                  placeholder="挂载到Body（不被遮挡）"
                  :append-to-body="true"
                  :multiple="false"
                />
                <div style="margin-top: 8px; font-size: 11px; color: #67c23a;">
                  ✅ 弹出层正常显示
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 滚动容器测试 -->
        <div style="margin-bottom: 40px;">
          <h4>滚动容器测试</h4>
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; height: 300px; overflow-y: auto;">
            <div style="height: 600px; position: relative;">
              <div style="position: absolute; top: 50px;">
                <h5>容器顶部</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="scrollValue1"
                  placeholder="容器顶部位置"
                  :append-to-body="true"
                  :multiple="false"
                />
              </div>
              
              <div style="position: absolute; top: 300px;">
                <h5>容器中部</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="scrollValue2"
                  placeholder="容器中部位置"
                  :append-to-body="true"
                  :multiple="false"
                />
              </div>
              
              <div style="position: absolute; top: 550px;">
                <h5>容器底部</h5>
                <cwd-tree-select 
                  :data-source="testData"
                  :value-field="getIdField"
                  :text-field="getNameField"
                  :parent-id-field="getParentIdField"
                  v-model="scrollValue3"
                  placeholder="容器底部位置"
                  :append-to-body="true"
                  :multiple="false"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div style="padding: 16px; background: #e3f2fd; border-radius: 8px;">
          <h4 style="margin-top: 0;">💡 使用建议：</h4>
          <div style="font-size: 14px;">
            <strong>🎯 何时使用 appendToBody="true"：</strong><br>
            <strong>1.</strong> 父容器设置了 overflow: hidden<br>
            <strong>2.</strong> 在弹框、抽屉等浮层组件内部<br>
            <strong>3.</strong> 复杂的嵌套布局中<br>
            <strong>4.</strong> 需要确保弹出层不被遮挡<br><br>
            
            <strong>🎯 何时使用 appendToBody="false"：</strong><br>
            <strong>1.</strong> 简单的页面布局<br>
            <strong>2.</strong> 没有容器遮挡问题<br>
            <strong>3.</strong> 性能要求较高的场景<br>
            <strong>4.</strong> 希望弹出层跟随页面滚动
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData,
        normalValue1: null,
        normalValue2: null,
        hiddenValue1: null,
        hiddenValue2: null,
        scrollValue1: null,
        scrollValue2: null,
        scrollValue3: null
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