import Component from '../index';

export default {
  id: 'cwd-tree-select-tree-debug',
  title: '组件列表/CwdTreeSelect/树结构调试',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

// 测试用的各种数据格式
const standardTreeData = [
  { value: '1', text: '根节点1', parentId: null },
  { value: '1-1', text: '子节点1-1', parentId: '1' },
  { value: '1-2', text: '子节点1-2', parentId: '1' },
  { value: '1-1-1', text: '孙节点1-1-1', parentId: '1-1' },
  { value: '2', text: '根节点2', parentId: null },
  { value: '2-1', text: '子节点2-1', parentId: '2' },
];

const numberIdTreeData = [
  { id: 1, name: '部门1', pid: null },
  { id: 11, name: '部门1-1', pid: 1 },
  { id: 12, name: '部门1-2', pid: 1 },
  { id: 111, name: '部门1-1-1', pid: 11 },
  { id: 2, name: '部门2', pid: null },
  { id: 21, name: '部门2-1', pid: 2 },
];

const mixedTypeTreeData = [
  { value: 1, text: '类型1', parentId: null },
  { value: '1-1', text: '子类型1-1', parentId: 1 },
  { value: '1-2', text: '子类型1-2', parentId: '1' }, // 故意混合字符串和数字
  { value: 2, text: '类型2', parentId: null },
];

const problemTreeData = [
  { value: '1', text: '节点1', parentId: '' }, // 空字符串父ID
  { value: '2', text: '节点2', parentId: null },
  { value: '3', text: '节点3', parentId: '999' }, // 不存在的父节点
  { value: '4', text: '节点4', parentId: 0 }, // 数字0作为父ID
];

// 用户提供的实际数据格式
const userActualTreeData = [
  { id: 123, name: "测试", fid: 0 },
  { id: 456, name: "测试1", fid: 123 }
];

export const StandardTreeStructure = {
  name: '标准树结构测试',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>标准树结构测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试标准的 value/text/parentId 字段格式
        </p>
        
        <cwd-tree-select 
          :data-source="treeData"
          v-model="selectedValue"
          placeholder="请选择节点"
          :multiple="false"
          @change="onChange"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>数据结构分析:</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>原始数据: {{ treeData.length }} 条</div>
            <div>选中值: {{ selectedValue || '无' }}</div>
          </div>
          
          <h4 style="margin-top: 12px;">原始数据:</h4>
          <pre style="font-size: 10px; background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 200px;">{{ JSON.stringify(treeData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 12px;">
          <strong>✅ 预期结果:</strong> 应该显示为两级树结构，根节点1和根节点2各有子节点
        </div>
      </div>
    `,
    data() {
      return {
        treeData: standardTreeData,
        selectedValue: null
      };
    },
    methods: {
      onChange(event) {
        console.log('标准树结构 - 选择改变:', event);
      }
    }
  })
};

export const NumberIdTreeStructure = {
  name: '数字ID树结构测试',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>数字ID树结构测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试 id/name/pid 字段格式，ID为数字类型
        </p>
        
        <cwd-tree-select 
          :data-source="treeData"
          :value-field="getIdField"
          :text-field="getNameField"
          :parent-id-field="getPidField"
          v-model="selectedValue"
          placeholder="请选择部门"
          :multiple="false"
          @change="onChange"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>数据结构分析:</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>原始数据: {{ treeData.length }} 条</div>
            <div>选中值: {{ selectedValue || '无' }}</div>
            <div>字段映射: id→value, name→text, pid→parentId</div>
          </div>
          
          <h4 style="margin-top: 12px;">原始数据:</h4>
          <pre style="font-size: 10px; background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 200px;">{{ JSON.stringify(treeData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 12px;">
          <strong>✅ 预期结果:</strong> 应该正确显示部门层级结构，即使ID是数字类型
        </div>
      </div>
    `,
    data() {
      return {
        treeData: numberIdTreeData,
        selectedValue: null
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getPidField(item) {
        return item.pid;
      },
      onChange(event) {
        console.log('数字ID树结构 - 选择改变:', event);
      }
    }
  })
};

export const MixedTypeTreeStructure = {
  name: '混合类型树结构测试',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>混合类型树结构测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试ID和父ID类型不一致的情况（数字vs字符串）
        </p>
        
        <cwd-tree-select 
          :data-source="treeData"
          v-model="selectedValue"
          placeholder="请选择类型"
          :multiple="false"
          @change="onChange"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>数据结构分析:</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>原始数据: {{ treeData.length }} 条</div>
            <div>选中值: {{ selectedValue || '无' }}</div>
            <div style="color: #e91e63;">注意: 存在类型混合问题</div>
          </div>
          
          <h4 style="margin-top: 12px;">原始数据:</h4>
          <pre style="font-size: 10px; background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 200px;">{{ JSON.stringify(treeData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #fff3e0; border-radius: 4px; font-size: 12px;">
          <strong>⚠️ 预期结果:</strong> 组件应该处理类型不一致问题，统一转换为字符串进行比较
        </div>
      </div>
    `,
    data() {
      return {
        treeData: mixedTypeTreeData,
        selectedValue: null
      };
    },
    methods: {
      onChange(event) {
        console.log('混合类型树结构 - 选择改变:', event);
      }
    }
  })
};

export const ProblemTreeStructure = {
  name: '问题数据树结构测试',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>问题数据树结构测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试各种异常的父ID值（空字符串、不存在的父节点等）
        </p>
        
        <cwd-tree-select 
          :data-source="treeData"
          v-model="selectedValue"
          placeholder="请选择节点"
          :multiple="false"
          @change="onChange"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>数据结构分析:</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>原始数据: {{ treeData.length }} 条</div>
            <div>选中值: {{ selectedValue || '无' }}</div>
            <div style="color: #e91e63;">包含异常父ID值</div>
          </div>
          
          <h4 style="margin-top: 12px;">原始数据:</h4>
          <pre style="font-size: 10px; background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 200px;">{{ JSON.stringify(treeData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #ffebee; border-radius: 4px; font-size: 12px;">
          <strong>🔧 预期结果:</strong> 组件应该容错处理，将无效父ID的节点都显示为根节点
        </div>
      </div>
    `,
    data() {
      return {
        treeData: problemTreeData,
        selectedValue: null
      };
    },
    methods: {
      onChange(event) {
        console.log('问题数据树结构 - 选择改变:', event);
      }
    }
  })
};

export const UserActualDataTest = {
  name: '用户实际数据测试',
  render: (args) => ({
    template: `
      <div style="width: 500px;">
        <h3>用户实际数据测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          测试用户提供的实际数据格式: id/name/fid (fid=0为根节点)
        </p>
        
        <cwd-tree-select 
          :data-source="userData"
          :value-field="getIdField"
          :text-field="getNameField"
          :parent-id-field="getFidField"
          v-model="selectedValue"
          placeholder="请选择测试项"
          :multiple="false"
          @change="onChange"
        />
        
        <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>数据结构分析:</h4>
          <div style="font-size: 12px; font-family: monospace;">
            <div>原始数据: {{ userData.length }} 条</div>
            <div>选中值: {{ selectedValue || '无' }}</div>
            <div>字段映射: id→value, name→text, fid→parentId</div>
            <div style="color: #e91e63;">注意: fid=0 视为根节点</div>
          </div>
          
          <h4 style="margin-top: 12px;">原始数据:</h4>
          <pre style="font-size: 10px; background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 200px;">{{ JSON.stringify(userData, null, 2) }}</pre>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #e3f2fd; border-radius: 4px; font-size: 12px;">
          <strong>✅ 预期结果:</strong> "测试"作为根节点，"测试1"作为其子节点
        </div>
      </div>
    `,
    data() {
      return {
        userData: userActualTreeData,
        selectedValue: null
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
      onChange(event) {
        console.log('用户实际数据 - 选择改变:', event);
      }
    }
  })
};

export const TreeStructureComparison = {
  name: '树结构对比测试',
  render: (args) => ({
    template: `
      <div style="width: 900px;">
        <h3>树结构构建对比测试</h3>
        <p style="color: #666; margin-bottom: 16px;">
          对比不同数据格式的树结构构建效果
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
          <!-- 标准格式 -->
          <div>
            <h4>标准格式 (value/text/parentId)</h4>
            <cwd-tree-select 
              :data-source="standardData"
              v-model="standardValue"
              placeholder="标准格式选择"
              :multiple="false"
            />
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ standardValue || '无' }}
            </div>
          </div>
          
          <!-- 数字ID格式 -->
          <div>
            <h4>数字ID格式 (id/name/pid)</h4>
            <cwd-tree-select 
              :data-source="numberData"
              :value-field="getIdField"
              :text-field="getNameField"
              :parent-id-field="getPidField"
              v-model="numberValue"
              placeholder="数字ID格式选择"
              :multiple="false"
            />
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ numberValue || '无' }}
            </div>
          </div>
          
          <!-- 用户格式 -->
          <div>
            <h4>用户格式 (id/name/fid)</h4>
            <cwd-tree-select 
              :data-source="userData"
              :value-field="getUserIdField"
              :text-field="getUserNameField"
              :parent-id-field="getUserFidField"
              v-model="userValue"
              placeholder="用户格式选择"
              :multiple="false"
            />
            <div style="margin-top: 8px; font-size: 12px; color: #666;">
              选中: {{ userValue || '无' }}
            </div>
          </div>
        </div>
        
        <div style="margin-top: 20px; padding: 12px; background: #f8f9fa; border-radius: 4px;">
          <h4>构建结果分析:</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; font-size: 12px;">
            <div>
              <strong>标准格式数据:</strong>
              <pre style="background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 120px; font-size: 10px;">{{ JSON.stringify(standardData, null, 2) }}</pre>
            </div>
            <div>
              <strong>数字ID格式数据:</strong>
              <pre style="background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 120px; font-size: 10px;">{{ JSON.stringify(numberData, null, 2) }}</pre>
            </div>
            <div>
              <strong>用户格式数据:</strong>
              <pre style="background: white; padding: 8px; border-radius: 4px; overflow: auto; max-height: 120px; font-size: 10px;">{{ JSON.stringify(userData, null, 2) }}</pre>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #e8f5e8; border-radius: 4px; font-size: 12px;">
          <strong>📊 对比目标:</strong> 三种格式都应该构建出正确的树结构，验证字段映射和类型转换的正确性
        </div>
      </div>
    `,
    data() {
      return {
        standardData: standardTreeData,
        numberData: numberIdTreeData,
        userData: userActualTreeData,
        standardValue: null,
        numberValue: null,
        userValue: null
      };
    },
    methods: {
      getIdField(item) {
        return item.id;
      },
      getNameField(item) {
        return item.name;
      },
      getPidField(item) {
        return item.pid;
      },
      getUserIdField(item) {
        return item.id;
      },
      getUserNameField(item) {
        return item.name;
      },
      getFidField(item) {
        return item.fid;
      },
      getPidField(item) {
        return item.pid;
      },
      getUserFidField(item) {
        return item.fid;
      }
    }
  })
};