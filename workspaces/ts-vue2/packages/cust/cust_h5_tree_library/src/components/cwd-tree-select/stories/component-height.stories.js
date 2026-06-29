import Component from '../index';

export default {
  id: 'cwd-tree-select-component-height',
  title: '组件列表/CwdTreeSelect/组件高度',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    height: {
      control: 'number',
    },
    dropdownHeight: {
      control: 'number',
    },
    multiple: {
      control: 'boolean',
    },
    searchable: {
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

export const CustomComponentHeight = {
  name: '自定义组件高度',
  render: (args) => ({
    props: Object.keys(args),
    template: `
      <div style="padding: 20px;">
        <h3>自定义组件输入框高度</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          通过 height 属性控制组件输入框的高度
        </p>
        <div style="width: 400px;">
          <cwd-tree-select 
            v-bind="$props"
            :data-source="treeData"
            @change="onChange"
          />
          <p style="margin-top: 10px; font-size: 12px;">
            当前组件高度: {{ height }}px，下拉面板高度: {{ dropdownHeight }}px
          </p>
        </div>
      </div>
    `,
    data() {
      return {
        treeData
      };
    },
    methods: {
      onChange(event) {
        console.log('选择改变:', event);
      }
    }
  }),
  args: {
    placeholder: '请选择技术栈',
    multiple: true,
    searchable: true,
    clearable: true,
    height: 60,
    dropdownHeight: 200,
  },
};

export const HeightComparison = {
  name: '不同高度对比',
  render: (args) => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px;">
        <div>
          <h4>小高度 (32px)</h4>
          <cwd-tree-select 
            :data-source="treeData"
            placeholder="小高度选择器"
            :multiple="true"
            :height="32"
            :dropdown-height="200"
          />
        </div>
        
        <div>
          <h4>默认高度 (44px)</h4>
          <cwd-tree-select 
            :data-source="treeData"
            placeholder="默认高度选择器"
            :multiple="true"
            :height="44"
            :dropdown-height="200"
          />
        </div>
        
        <div>
          <h4>大高度 (64px)</h4>
          <cwd-tree-select 
            :data-source="treeData"
            placeholder="大高度选择器"
            :multiple="true"
            :height="64"
            :dropdown-height="200"
          />
        </div>
      </div>
    `,
    data() {
      return {
        treeData
      };
    }
  }),
  args: {},
};

export const ResponsiveHeight = {
  name: '响应式高度',
  render: (args) => ({
    template: `
      <div style="padding: 20px;">
        <h3>响应式高度演示</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          动态调整组件高度，观察组件的适应效果
        </p>
        
        <div style="margin-bottom: 20px;">
          <label style="display: inline-block; width: 100px;">组件高度:</label>
          <input 
            type="range" 
            min="32" 
            max="80" 
            step="4"
            v-model.number="componentHeight"
            style="margin: 0 10px;"
          />
          <span>{{ componentHeight }}px</span>
        </div>
        
        <div style="margin-bottom: 20px;">
          <label style="display: inline-block; width: 100px;">下拉高度:</label>
          <input 
            type="range" 
            min="150" 
            max="400" 
            step="25"
            v-model.number="panelHeight"
            style="margin: 0 10px;"
          />
          <span>{{ panelHeight }}px</span>
        </div>
        
        <div style="width: 400px;">
          <cwd-tree-select 
            :data-source="treeData"
            placeholder="响应式高度选择器"
            :multiple="true"
            :height="componentHeight"
            :dropdown-height="panelHeight"
            @change="onChange"
          />
        </div>
        
        <div style="margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 4px; font-size: 12px;">
          <div><strong>当前配置:</strong></div>
          <div>组件高度: {{ componentHeight }}px</div>
          <div>下拉面板高度: {{ panelHeight }}px</div>
        </div>
      </div>
    `,
    data() {
      return {
        treeData,
        componentHeight: 44,
        panelHeight: 200
      };
    },
    methods: {
      onChange(event) {
        console.log('选择改变:', event);
      }
    }
  }),
  args: {},
};

export const ExtremeCases = {
  name: '极端情况测试',
  render: (args) => ({
    template: `
      <div style="padding: 20px;">
        <h3>极端情况测试</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          测试组件在极端高度下的表现
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          <div>
            <h4>超小高度 (24px)</h4>
            <cwd-tree-select 
              :data-source="treeData"
              placeholder="超小高度"
              :height="24"
              :dropdown-height="150"
            />
          </div>
          
          <div>
            <h4>超大高度 (100px)</h4>
            <cwd-tree-select 
              :data-source="treeData"
              placeholder="超大高度"
              :height="100"
              :dropdown-height="300"
            />
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h4>多选模式 - 不同高度</h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div>
              <h5>紧凑模式 (32px)</h5>
              <cwd-tree-select 
                :data-source="treeData"
                placeholder="紧凑多选"
                :multiple="true"
                :height="32"
                :dropdown-height="200"
              />
            </div>
            
            <div>
              <h5>宽松模式 (56px)</h5>
              <cwd-tree-select 
                :data-source="treeData"
                placeholder="宽松多选"
                :multiple="true"
                :height="56"
                :dropdown-height="250"
              />
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        treeData
      };
    }
  }),
  args: {},
};