import Component from '../index';

export default {
  id: 'cwd-tree-select-lowcode',
  title: '组件列表/CwdTreeSelect/低代码演示',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
  },
};

const treeData = [
  // 根节点
  { value: '1', text: '前端开发', parentId: null },
  { value: '2', text: '后端开发', parentId: null },
  { value: '3', text: '移动开发', parentId: null },
  
  // 前端开发的子节点
  { value: '1-1', text: 'Vue.js', parentId: '1' },
  { value: '1-2', text: 'React', parentId: '1' },
  { value: '1-3', text: 'Angular', parentId: '1' },
  
  // Vue.js 的子节点
  { value: '1-1-1', text: 'Vue 2', parentId: '1-1' },
  { value: '1-1-2', text: 'Vue 3', parentId: '1-1' },
  
  // React 的子节点
  { value: '1-2-1', text: 'React 16', parentId: '1-2' },
  { value: '1-2-2', text: 'React 18', parentId: '1-2' },
  
  // 后端开发的子节点
  { value: '2-1', text: 'Node.js', parentId: '2' },
  { value: '2-2', text: 'Java', parentId: '2' },
  { value: '2-3', text: 'Python', parentId: '2' },
  
  // 移动开发的子节点
  { value: '3-1', text: 'iOS', parentId: '3' },
  { value: '3-2', text: 'Android', parentId: '3' },
  { value: '3-3', text: 'Flutter', parentId: '3' }
];

export const LowCodeBasic = {
  name: '低代码基础用法',
  render: (args) => ({
    props: Object.keys(args),
    template: `
      <div style="width: 400px;">
        <h3>低代码开发平台使用示例</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          在低代码平台中，你可以通过拖拽组件到插槽中来自定义下拉面板内容
        </p>
        
        <h4>基础树选择器（默认模式）</h4>
        <cwd-tree-select 
          v-bind="$props"
          :data-source="treeData"
          @change="onChange"
        />
        
        <h4 style="margin-top: 20px;">带自定义头部的树选择器</h4>
        <cwd-tree-select 
          v-bind="$props"
          :data-source="treeData"
          @change="onChange"
        >
          <template #header>
            <!-- 模拟低代码平台中拖拽的组件 -->
            <div style="padding: 12px; background: #f8f9fa; border-bottom: 1px solid #e9ecef;">
              <div style="font-weight: bold; color: #495057; font-size: 14px; margin-bottom: 8px;">
                🏷️ 技术栈选择
              </div>
              <div style="font-size: 12px; color: #6c757d;">
                请选择您熟悉的技术栈，可以多选
              </div>
            </div>
          </template>
        </cwd-tree-select>
        
        <h4 style="margin-top: 20px;">带自定义底部的树选择器</h4>
        <cwd-tree-select 
          v-bind="$props"
          :data-source="treeData"
          @change="onChange"
        >
          <template #footer>
            <!-- 模拟低代码平台中拖拽的组件 -->
            <div style="padding: 12px; background: #f8f9fa; border-top: 1px solid #e9ecef; text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                已选择 {{ selectedCount }} 项
              </div>
              <div style="display: flex; gap: 8px; justify-content: center;">
                <button 
                  @click="selectAll" 
                  style="padding: 4px 12px; border: 1px solid #007bff; background: #007bff; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;"
                >
                  全选
                </button>
                <button 
                  @click="clearAll"
                  style="padding: 4px 12px; border: 1px solid #dc3545; background: #dc3545; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;"
                >
                  清空
                </button>
              </div>
            </div>
          </template>
        </cwd-tree-select>
        
        <div style="margin-top: 20px; padding: 12px; background: #e7f3ff; border-radius: 4px; font-size: 12px;">
          <strong>💡 低代码开发提示:</strong><br>
          1. 在低代码平台中，可以直接拖拽文本、按钮、布局等组件到插槽中<br>
          2. 支持配置组件的样式、事件和数据绑定<br>
          3. 实时预览效果，所见即所得
        </div>
      </div>
    `,
    data() {
      return {
        treeData,
        selectedCount: 0
      };
    },
    methods: {
      onChange(event) {
        this.selectedCount = event.values ? event.values.length : (event.value ? 1 : 0);
        console.log('选择改变:', event);
      },
      selectAll() {
        console.log('全选操作');
      },
      clearAll() {
        console.log('清空操作');
      }
    }
  }),
  args: {
    placeholder: '请选择技术栈',
    multiple: true,
    searchable: true,
    clearable: true,
  },
};

export const LowCodeEmptyStates = {
  name: '低代码空状态自定义',
  render: (args) => ({
    template: `
      <div style="display: flex; gap: 20px;">
        <div style="width: 300px;">
          <h4>自定义空状态（低代码配置）</h4>
          <cwd-tree-select 
            :data-source="emptyData"
            placeholder="空数据演示"
            :searchable="false"
          >
            <template #empty>
              <!-- 模拟在低代码平台中拖拽配置的空状态内容 -->
              <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">📋</div>
                <div style="font-size: 16px; font-weight: bold; color: #666; margin-bottom: 8px;">
                  暂无选项数据
                </div>
                <div style="font-size: 12px; color: #999; margin-bottom: 16px;">
                  请联系管理员配置选项或稍后重试
                </div>
                <button 
                  @click="loadSampleData"
                  style="padding: 8px 16px; border: 1px solid #007bff; background: white; color: #007bff; border-radius: 4px; cursor: pointer; font-size: 12px;"
                >
                  🔄 加载示例数据
                </button>
              </div>
            </template>
          </cwd-tree-select>
        </div>
        
        <div style="width: 300px;">
          <h4>自定义加载状态（低代码配置）</h4>
          <cwd-tree-select 
            :data-source="loadingDataSource"
            placeholder="加载中演示"
            :searchable="false"
          >
            <template #loading>
              <!-- 模拟在低代码平台中拖拽配置的加载状态内容 -->
              <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 12px;">🚀</div>
                <div style="font-size: 14px; font-weight: bold; color: #007bff; margin-bottom: 8px;">
                  数据加载中...
                </div>
                <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
                  正在从服务器获取最新数据
                </div>
                <!-- 模拟进度条 -->
                <div style="width: 120px; height: 4px; background: #f0f0f0; border-radius: 2px; margin: 0 auto; overflow: hidden;">
                  <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #007bff, #00d4ff); animation: progress 2s ease-in-out infinite;">
                  </div>
                </div>
              </div>
            </template>
          </cwd-tree-select>
        </div>
      </div>
    `,
    data() {
      return {
        emptyData: []
      };
    },
    computed: {
      loadingDataSource() {
        return () => {
          return new Promise(() => {
            // 永不resolve，保持加载状态用于演示
          });
        };
      }
    },
    methods: {
      loadSampleData() {
        this.emptyData = [...treeData];
        console.log('加载示例数据');
      }
    }
  }),
  args: {},
};

export const LowCodeCompleteExample = {
  name: '低代码完整示例',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>完整的低代码自定义示例</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          这个示例展示了如何在低代码平台中使用所有插槽来构建一个完整的选择器界面
        </p>
        
        <cwd-tree-select 
          v-model="selectedValues"
          placeholder="请选择你的技能"
          :multiple="true"
          :searchable="true"
          :dropdown-height="400"
          @change="onChange"
        >
          <!-- 头部插槽：标题和说明 -->
          <template #header>
            <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">
                🎯 技能评估
              </div>
              <div style="font-size: 12px; opacity: 0.9;">
                请选择您掌握的技术技能，支持多选
              </div>
            </div>
          </template>
          
          <!-- 底部插槽：统计和操作 -->
          <template #footer>
            <div style="padding: 12px 16px; background: #f8f9fa; border-top: 1px solid #e9ecef;">
              <!-- 统计信息 -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="font-size: 12px; color: #666;">
                  已选择 <strong style="color: #007bff;">{{ selectedCount }}</strong> 项技能
                </div>
                <div style="font-size: 11px; color: #999;">
                  {{ getSkillLevel() }}
                </div>
              </div>
              
              <!-- 操作按钮 -->
              <div style="display: flex; gap: 8px;">
                <button 
                  @click="selectRecommended" 
                  style="flex: 1; padding: 6px 12px; border: 1px solid #28a745; background: #28a745; color: white; border-radius: 4px; cursor: pointer; font-size: 11px;"
                >
                  ⭐ 选择推荐技能
                </button>
                <button 
                  @click="selectAll"
                  style="flex: 1; padding: 6px 12px; border: 1px solid #17a2b8; background: #17a2b8; color: white; border-radius: 4px; cursor: pointer; font-size: 11px;"
                >
                  📋 全选
                </button>
                <button 
                  @click="clearAll"
                  style="flex: 1; padding: 6px 12px; border: 1px solid #dc3545; background: #dc3545; color: white; border-radius: 4px; cursor: pointer; font-size: 11px;"
                >
                  🗑️ 清空
                </button>
              </div>
              
              <!-- 快捷选择 -->
              <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e9ecef;">
                <div style="font-size: 11px; color: #666; margin-bottom: 6px;">快捷选择:</div>
                <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                  <span 
                    v-for="tag in quickTags"
                    :key="tag"
                    @click="toggleQuickTag(tag)"
                    :style="{
                      padding: '2px 8px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '10px',
                      background: selectedValues.includes(tag) ? '#007bff' : 'white',
                      color: selectedValues.includes(tag) ? 'white' : '#666',
                      transition: 'all 0.2s'
                    }"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </cwd-tree-select>
        
        <!-- 结果展示 -->
        <div style="margin-top: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
          <div style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #333;">
            🎉 选择结果:
          </div>
          <div v-if="selectedCount === 0" style="color: #999; font-size: 12px;">
            还没有选择任何技能
          </div>
          <div v-else style="display: flex; flex-wrap: wrap; gap: 4px;">
            <span 
              v-for="skill in selectedSkillNames" 
              :key="skill"
              style="padding: 4px 8px; background: #007bff; color: white; border-radius: 12px; font-size: 11px;"
            >
              {{ skill }}
            </span>
          </div>
          <div style="margin-top: 8px; font-size: 11px; color: #666;">
            技能等级: {{ getSkillLevel() }} | 完成度: {{ getCompletionRate() }}%
          </div>
        </div>
        
        <!-- 低代码提示 -->
        <div style="margin-top: 16px; padding: 12px; background: #e8f5e8; border-left: 4px solid #28a745; border-radius: 0 4px 4px 0;">
          <div style="font-size: 12px; color: #155724; font-weight: bold; margin-bottom: 4px;">
            💡 低代码开发说明
          </div>
          <div style="font-size: 11px; color: #155724; line-height: 1.4;">
            • 头部插槽：拖入文本、图片等组件来设计标题区域<br>
            • 底部插槽：拖入按钮、统计组件来添加操作功能<br>
            • 支持数据绑定、事件配置和样式自定义<br>
            • 实时预览，快速构建专业的选择器界面
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        selectedValues: [],
        quickTags: ['Vue.js', 'React', 'Node.js', 'Python', 'JavaScript'],
        allSkills: [
          'Vue.js', 'React', 'Angular', 'Vue 2', 'Vue 3',
          'React 16', 'React 18', 'Node.js', 'Java', 'Python',
          'iOS', 'Android', 'Flutter'
        ]
      };
    },
    computed: {
      selectedCount() {
        return this.selectedValues.length;
      },
      selectedSkillNames() {
        return this.selectedValues;
      }
    },
    methods: {
      onChange(event) {
        this.selectedValues = event.values || [];
        console.log('技能选择变化:', event);
      },
      selectAll() {
        this.selectedValues = [...this.allSkills];
      },
      clearAll() {
        this.selectedValues = [];
      },
      selectRecommended() {
        this.selectedValues = ['Vue.js', 'JavaScript', 'Node.js', 'Python'];
      },
      toggleQuickTag(tag) {
        const index = this.selectedValues.indexOf(tag);
        if (index > -1) {
          this.selectedValues.splice(index, 1);
        } else {
          this.selectedValues.push(tag);
        }
      },
      getSkillLevel() {
        const count = this.selectedCount;
        if (count === 0) return '未评估';
        if (count <= 3) return '初级开发者';
        if (count <= 6) return '中级开发者';
        if (count <= 9) return '高级开发者';
        return '全栈大师';
      },
      getCompletionRate() {
        return Math.round((this.selectedCount / this.allSkills.length) * 100);
      }
    }
  }),
  args: {},
};