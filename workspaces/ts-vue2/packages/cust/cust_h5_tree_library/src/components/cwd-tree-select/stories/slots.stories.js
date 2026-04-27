import Component from '../index';

export default {
  id: 'cwd-tree-select-slots',
  title: '组件列表/CwdTreeSelect/插槽演示',
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

export const HeaderFooterSlots = {
  name: '头部和底部插槽',
  render: (args) => ({
    props: Object.keys(args),
    template: `
      <div style="width: 400px;">
        <h3>带头部和底部插槽的树选择器</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          使用 header 和 footer 插槽自定义下拉面板的头部和底部内容
        </p>
        <cwd-tree-select 
          v-bind="$props"
          :data-source="treeData"
          @change="onChange"
        >
          <template #header>
            <div style="padding: 12px; background: #f8f9fa; border-bottom: 1px solid #e9ecef;">
              <div style="font-weight: bold; color: #495057; font-size: 14px; margin-bottom: 8px;">
                🌟 技术栈分类
              </div>
              <div style="font-size: 12px; color: #6c757d;">
                请选择您熟悉的技术栈，支持多选
              </div>
            </div>
          </template>
          
          <template #footer>
            <div style="padding: 12px; background: #f8f9fa; border-top: 1px solid #e9ecef; text-align: center;">
              <button 
                @click="selectAll" 
                style="margin-right: 8px; padding: 4px 12px; border: 1px solid #007bff; background: #007bff; color: white; border-radius: 4px; cursor: pointer;"
              >
                全选
              </button>
              <button 
                @click="clearAll"
                style="padding: 4px 12px; border: 1px solid #dc3545; background: #dc3545; color: white; border-radius: 4px; cursor: pointer;"
              >
                清空
              </button>
            </div>
          </template>
        </cwd-tree-select>
        <p style="margin-top: 10px; font-size: 12px;">
          选中项数: {{ selectedCount }}
        </p>
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
        // 这里可以实现全选逻辑
        console.log('全选');
      },
      clearAll() {
        // 这里可以实现清空逻辑
        console.log('清空');
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

export const CustomEmptyLoading = {
  name: '自定义空状态和加载状态',
  render: (args) => ({
    props: Object.keys(args),
    template: `
      <div style="display: flex; gap: 20px;">
        <div style="width: 300px;">
          <h4>自定义空状态</h4>
          <cwd-tree-select 
            :data-source="emptyData"
            placeholder="空数据演示"
            :searchable="false"
          >
            <template #empty>
              <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
                <div style="font-size: 16px; font-weight: bold; color: #666; margin-bottom: 8px;">
                  暂无可选项
                </div>
                <div style="font-size: 12px; color: #999;">
                  请联系管理员添加选项数据
                </div>
                <button 
                  @click="refreshData"
                  style="margin-top: 12px; padding: 6px 16px; border: 1px solid #007bff; background: white; color: #007bff; border-radius: 4px; cursor: pointer;"
                >
                  刷新数据
                </button>
              </div>
            </template>
          </cwd-tree-select>
        </div>
        
        <div style="width: 300px;">
          <h4>自定义加载状态</h4>
          <cwd-tree-select 
            :data-source="loadingDataSource"
            placeholder="加载中演示"
            :searchable="false"
          >
            <template #loading>
              <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 12px;">⚡</div>
                <div style="font-size: 14px; font-weight: bold; color: #007bff; margin-bottom: 8px;">
                  正在加载数据...
                </div>
                <div style="width: 100px; height: 4px; background: #f0f0f0; border-radius: 2px; margin: 0 auto; overflow: hidden;">
                  <div style="width: 30%; height: 100%; background: #007bff; animation: loading 1.5s ease-in-out infinite;">
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
            // 永不resolve，保持加载状态
          });
        };
      }
    },
    methods: {
      refreshData() {
        console.log('刷新数据');
        this.emptyData = [...treeData];
      }
    }
  }),
  args: {},
};

export const FullCustomPanel = {
  name: '完全自定义面板',
  render: (args) => ({
    props: Object.keys(args),
    template: `
      <div style="width: 400px;">
        <h3>完全自定义下拉面板</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          使用默认插槽完全替换下拉面板内容，实现自定义的选择界面
        </p>
        <cwd-tree-select 
          v-model="selectedValue"
          placeholder="选择你喜欢的颜色"
          :searchable="false"
          :dropdown-height="280"
        >
          <div style="padding: 20px;">
            <h4 style="margin: 0 0 16px 0; color: #333; font-size: 16px;">🎨 选择你喜欢的颜色</h4>
            
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px;">
              <div 
                v-for="color in colors" 
                :key="color.value"
                @click="selectColor(color)"
                :style="{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: color.value, 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  border: selectedValue === color.value ? '3px solid #007bff' : '2px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  padding: '4px',
                  transition: 'all 0.2s'
                }"
                :title="color.name"
              >
                <span style="font-size: 10px; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
                  {{ color.name }}
                </span>
              </div>
            </div>
            
            <div style="border-top: 1px solid #e0e0e0; padding-top: 16px;">
              <div style="font-size: 14px; color: #666; margin-bottom: 8px;">
                当前选择: 
                <span :style="{ color: selectedValue || '#999' }">
                  {{ selectedColorName || '未选择' }}
                </span>
              </div>
              <div style="display: flex; gap: 8px;">
                <button 
                  @click="randomSelect"
                  style="flex: 1; padding: 8px 16px; border: 1px solid #28a745; background: #28a745; color: white; border-radius: 4px; cursor: pointer;"
                >
                  🎲 随机选择
                </button>
                <button 
                  @click="clearSelection"
                  style="flex: 1; padding: 8px 16px; border: 1px solid #dc3545; background: #dc3545; color: white; border-radius: 4px; cursor: pointer;"
                >
                  🗑️ 清除
                </button>
              </div>
            </div>
          </div>
        </cwd-tree-select>
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <strong>当前值:</strong> {{ selectedValue || '未选择' }}<br>
          <strong>颜色名称:</strong> {{ selectedColorName || '无' }}
        </div>
      </div>
    `,
    data() {
      return {
        selectedValue: null,
        colors: [
          { name: '红色', value: '#FF6B6B' },
          { name: '橙色', value: '#FF8E53' },
          { name: '黄色', value: '#FFD93D' },
          { name: '绿色', value: '#6BCF7F' },
          { name: '青色', value: '#4ECDC4' },
          { name: '蓝色', value: '#45B7D1' },
          { name: '紫色', value: '#96CEB4' },
          { name: '粉色', value: '#FECA57' },
          { name: '灰色', value: '#95A5A6' },
          { name: '黑色', value: '#2C3E50' },
          { name: '白色', value: '#ECF0F1' },
          { name: '棕色', value: '#D2B48C' }
        ]
      };
    },
    computed: {
      selectedColorName() {
        const color = this.colors.find(c => c.value === this.selectedValue);
        return color ? color.name : null;
      }
    },
    methods: {
      selectColor(color) {
        this.selectedValue = color.value;
        console.log('选择颜色:', color);
      },
      randomSelect() {
        const randomIndex = Math.floor(Math.random() * this.colors.length);
        this.selectedValue = this.colors[randomIndex].value;
      },
      clearSelection() {
        this.selectedValue = null;
      }
    }
  }),
  args: {},
};

export const TabsStylePanel = {
  name: '选项卡风格面板',
  render: (args) => ({
    template: `
      <div style="width: 400px;">
        <h3>选项卡风格的选择面板</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          使用插槽实现分类选项卡的选择界面
        </p>
        <cwd-tree-select 
          v-model="selectedValues"
          placeholder="选择技能标签"
          :multiple="true"
          :searchable="false"
          :dropdown-height="320"
        >
          <div>
            <!-- 选项卡头部 -->
            <div style="display: flex; border-bottom: 1px solid #e0e0e0;">
              <div 
                v-for="category in categories"
                :key="category.id"
                @click="activeTab = category.id"
                :style="{ 
                  flex: 1,
                  padding: '12px 8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  borderBottom: activeTab === category.id ? '2px solid #007bff' : '2px solid transparent',
                  background: activeTab === category.id ? '#f8f9fa' : 'white',
                  color: activeTab === category.id ? '#007bff' : '#666'
                }"
              >
                {{ category.name }}
              </div>
            </div>
            
            <!-- 选项卡内容 -->
            <div style="padding: 16px; min-height: 200px;">
              <div v-for="category in categories" :key="category.id">
                <div v-if="activeTab === category.id">
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <div
                      v-for="skill in category.skills"
                      :key="skill"
                      @click="toggleSkill(skill)"
                      :style="{
                        padding: '6px 12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        background: selectedValues.includes(skill) ? '#007bff' : 'white',
                        color: selectedValues.includes(skill) ? 'white' : '#666',
                        transition: 'all 0.2s'
                      }"
                    >
                      {{ skill }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 底部操作区 -->
            <div style="padding: 12px 16px; border-top: 1px solid #e0e0e0; background: #f8f9fa;">
              <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
                已选择 {{ selectedValues.length }} 个技能
              </div>
              <div style="display: flex; gap: 8px;">
                <button 
                  @click="selectAllInCategory"
                  style="flex: 1; padding: 6px 12px; border: 1px solid #28a745; background: #28a745; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;"
                >
                  选择当前分类全部
                </button>
                <button 
                  @click="clearAllSelections"
                  style="flex: 1; padding: 6px 12px; border: 1px solid #dc3545; background: #dc3545; color: white; border-radius: 4px; cursor: pointer; font-size: 12px;"
                >
                  清空所有选择
                </button>
              </div>
            </div>
          </div>
        </cwd-tree-select>
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <strong>选中的技能:</strong><br>
          <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 4px;">
            <span 
              v-for="skill in selectedValues" 
              :key="skill"
              style="padding: 2px 8px; background: #007bff; color: white; border-radius: 12px; font-size: 11px;"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        selectedValues: [],
        activeTab: 'frontend',
        categories: [
          {
            id: 'frontend',
            name: '前端',
            skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular', 'TypeScript', 'Webpack']
          },
          {
            id: 'backend',
            name: '后端',
            skills: ['Node.js', 'Java', 'Python', 'Go', 'PHP', 'C#', 'Ruby', 'Spring Boot']
          },
          {
            id: 'mobile',
            name: '移动端',
            skills: ['Flutter', 'React Native', 'iOS', 'Android', 'Xamarin', 'Ionic', 'Cordova', 'Swift']
          },
          {
            id: 'other',
            name: '其他',
            skills: ['Docker', 'Kubernetes', 'AWS', 'MySQL', 'MongoDB', 'Redis', 'Git', 'Linux']
          }
        ]
      };
    },
    methods: {
      toggleSkill(skill) {
        const index = this.selectedValues.indexOf(skill);
        if (index > -1) {
          this.selectedValues.splice(index, 1);
        } else {
          this.selectedValues.push(skill);
        }
      },
      selectAllInCategory() {
        const currentCategory = this.categories.find(cat => cat.id === this.activeTab);
        if (currentCategory) {
          currentCategory.skills.forEach(skill => {
            if (!this.selectedValues.includes(skill)) {
              this.selectedValues.push(skill);
            }
          });
        }
      },
      clearAllSelections() {
        this.selectedValues = [];
      }
    }
  }),
  args: {},
};