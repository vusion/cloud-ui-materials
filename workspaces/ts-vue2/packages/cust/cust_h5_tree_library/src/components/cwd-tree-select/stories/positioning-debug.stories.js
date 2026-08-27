import Component from '../index';

export default {
  id: 'cwd-tree-select-positioning-debug',
  title: '组件列表/CwdTreeSelect/位置调试',
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
];

export const PositioningDebug = {
  name: '位置调试工具',
  render: (args) => ({
    template: `
      <div style="width: 100%; min-height: 200vh; padding: 20px;">
        <h3>弹出层位置调试工具</h3>
        <p style="color: #666; margin-bottom: 24px;">
          详细调试自动位置计算逻辑，查看Console输出
        </p>
        
        <!-- 顶部测试区 -->
        <div style="margin-bottom: 50px; padding: 20px; border: 2px solid #007bff; border-radius: 8px; background: #f8f9fa;">
          <h4 style="color: #007bff;">🔝 页面顶部区域测试</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 16px;">
            预期：下方空间充足，应该向下弹出
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h5>相对定位 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="topValue1"
                placeholder="点击测试（相对-自动）"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
                @change="onTopChange1"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ topValue1 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>Body挂载 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="topValue2"
                placeholder="点击测试（Body-自动）"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
                @change="onTopChange2"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ topValue2 || '无' }}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: #d4edda; border-radius: 4px; font-size: 12px;">
            <strong>✅ 预期结果：</strong>两个选择器都应该向下弹出，Console中显示 "bottom" 方向
          </div>
        </div>
        
        <!-- 中间填充区域 -->
        <div style="height: 1000px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; margin-bottom: 50px; color: white;">
          <div style="text-align: center;">
            <h2>📏 中间填充区域</h2>
            <p style="font-size: 18px; margin-top: 16px;">滚动到底部测试向上弹出</p>
            <div style="margin-top: 20px; padding: 12px; background: rgba(255,255,255,0.2); border-radius: 6px;">
              当前视口高度: {{ viewportHeight }}px<br>
              滚动位置: {{ scrollTop }}px
            </div>
          </div>
        </div>
        
        <!-- 底部测试区 -->
        <div style="padding: 20px; border: 2px solid #dc3545; border-radius: 8px; background: #fff; margin-bottom: 100px;">
          <h4 style="color: #dc3545;">🔻 页面底部区域测试</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 16px;">
            预期：下方空间不足，应该向上弹出
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h5>相对定位 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="bottomValue1"
                placeholder="点击测试（相对-自动）"
                :append-to-body="false"
                placement="auto"
                :multiple="false"
                @change="onBottomChange1"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ bottomValue1 || '无' }}
              </div>
            </div>
            
            <div>
              <h5>Body挂载 + 自动方向</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="bottomValue2"
                placeholder="点击测试（Body-自动）"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
                @change="onBottomChange2"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ bottomValue2 || '无' }}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: #f8d7da; border-radius: 4px; font-size: 12px;">
            <strong>✅ 预期结果：</strong>两个选择器都应该向上弹出，Console中显示 "top" 方向
          </div>
        </div>
        
        <!-- 强制方向测试 -->
        <div style="padding: 20px; border: 2px solid #28a745; border-radius: 8px; background: #f8f9fa; margin-bottom: 100px;">
          <h4 style="color: #28a745;">🎯 强制方向测试</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 16px;">
            测试强制指定弹出方向是否生效
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h5>强制向上弹出 (placement="top")</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="forceTopValue"
                placeholder="强制向上"
                :append-to-body="true"
                placement="top"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ forceTopValue || '无' }}
              </div>
            </div>
            
            <div>
              <h5>强制向下弹出 (placement="bottom")</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="forceBottomValue"
                placeholder="强制向下"
                :append-to-body="true"
                placement="bottom"
                :multiple="false"
              />
              <div style="margin-top: 8px; font-size: 11px; color: #666;">
                选中: {{ forceBottomValue || '无' }}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 16px; padding: 12px; background: #d1ecf1; border-radius: 4px; font-size: 12px;">
            <strong>✅ 预期结果：</strong>左边向上弹，右边向下弹，无论位置如何
          </div>
        </div>
        
        <!-- 调试信息面板 -->
        <div style="position: fixed; top: 10px; right: 10px; width: 300px; padding: 12px; background: rgba(0,0,0,0.8); color: white; border-radius: 6px; font-size: 11px; z-index: 10000;">
          <h5 style="margin-top: 0; color: #ffc107;">🐛 实时调试信息</h5>
          <div>视口高度: {{ viewportHeight }}px</div>
          <div>滚动位置: {{ scrollTop }}px</div>
          <div>滚动百分比: {{ scrollPercentage }}%</div>
          <div style="margin-top: 8px; font-size: 10px; color: #adb5bd;">
            打开浏览器Console查看详细位置计算日志
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        testData,
        topValue1: null,
        topValue2: null,
        bottomValue1: null,
        bottomValue2: null,
        forceTopValue: null,
        forceBottomValue: null,
        viewportHeight: 0,
        scrollTop: 0
      };
    },
    computed: {
      scrollPercentage() {
        const maxScroll = document.documentElement.scrollHeight - this.viewportHeight;
        return maxScroll > 0 ? Math.round((this.scrollTop / maxScroll) * 100) : 0;
      }
    },
    mounted() {
      this.updateViewportInfo();
      window.addEventListener('scroll', this.updateViewportInfo);
      window.addEventListener('resize', this.updateViewportInfo);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.updateViewportInfo);
      window.removeEventListener('resize', this.updateViewportInfo);
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
      },
      updateViewportInfo() {
        this.viewportHeight = window.innerHeight;
        this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      onTopChange1(event) {
        console.log('🔝 顶部区域-相对定位 选择改变:', event);
      },
      onTopChange2(event) {
        console.log('🔝 顶部区域-Body挂载 选择改变:', event);
      },
      onBottomChange1(event) {
        console.log('🔻 底部区域-相对定位 选择改变:', event);
      },
      onBottomChange2(event) {
        console.log('🔻 底部区域-Body挂载 选择改变:', event);
      }
    }
  })
};

export const EdgeCaseTest = {
  name: '边界情况测试',
  render: (args) => ({
    template: `
      <div style="width: 100%; padding: 20px;">
        <h3>边界情况测试</h3>
        <p style="color: #666; margin-bottom: 24px;">
          测试各种边界情况下的弹出层位置
        </p>
        
        <!-- 小空间测试 -->
        <div style="margin-bottom: 40px;">
          <h4>小空间测试</h4>
          <div style="height: 200px; overflow: hidden; border: 1px solid #ddd; border-radius: 8px; position: relative;">
            <!-- 顶部位置 -->
            <div style="position: absolute; top: 20px; left: 20px;">
              <h5>顶部位置（空间很小）</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="smallSpaceTop"
                placeholder="小空间-顶部"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
            </div>
            
            <!-- 中部位置 -->
            <div style="position: absolute; top: 90px; left: 20px;">
              <h5>中部位置</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="smallSpaceMiddle"
                placeholder="小空间-中部"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
            </div>
            
            <!-- 底部位置 -->
            <div style="position: absolute; bottom: 20px; left: 20px;">
              <h5>底部位置（空间很小）</h5>
              <cwd-tree-select 
                :data-source="testData"
                :value-field="getIdField"
                :text-field="getNameField"
                :parent-id-field="getParentIdField"
                v-model="smallSpaceBottom"
                placeholder="小空间-底部"
                :append-to-body="true"
                placement="auto"
                :multiple="false"
              />
            </div>
          </div>
        </div>
        
        <!-- 窄宽度测试 -->
        <div style="margin-bottom: 40px;">
          <h4>窄宽度测试</h4>
          <div style="width: 200px; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <cwd-tree-select 
              :data-source="testData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getParentIdField"
              v-model="narrowWidth"
              placeholder="窄宽度测试"
              :append-to-body="true"
              placement="auto"
              :multiple="false"
            />
          </div>
        </div>
        
        <!-- 大数据量测试 -->
        <div style="margin-bottom: 40px;">
          <h4>大数据量测试</h4>
          <cwd-tree-select 
            :data-source="largeData"
            :value-field="getIdField"
            :text-field="getNameField"
            :parent-id-field="getParentIdField"
            v-model="largeDataValue"
            placeholder="大数据量测试"
            :append-to-body="true"
            placement="auto"
            :dropdown-height="400"
            :multiple="false"
          />
        </div>
        
        <div style="padding: 16px; background: #fff3e0; border-radius: 8px;">
          <h4 style="margin-top: 0;">🧪 测试要点：</h4>
          <ul style="margin: 8px 0; padding-left: 20px; font-size: 14px;">
            <li><strong>小空间适应：</strong>在空间受限时能否正确调整方向和高度</li>
            <li><strong>边界检测：</strong>是否能防止弹出层超出视口</li>
            <li><strong>自适应高度：</strong>是否能根据可用空间调整最大高度</li>
            <li><strong>性能表现：</strong>大数据量时位置计算是否流畅</li>
          </ul>
        </div>
      </div>
    `,
    data() {
      return {
        testData,
        smallSpaceTop: null,
        smallSpaceMiddle: null,
        smallSpaceBottom: null,
        narrowWidth: null,
        largeDataValue: null,
        largeData: this.generateLargeData()
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
      },
      generateLargeData() {
        const data = [];
        for (let i = 1; i <= 100; i++) {
          data.push({
            id: i,
            name: `节点 ${i}`,
            parentId: i <= 10 ? null : Math.floor((i - 1) / 10) + 1
          });
        }
        return data;
      }
    }
  })
};