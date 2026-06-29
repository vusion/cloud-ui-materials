  <template>
    <div :class="$style.root">
      <!-- 输入框 -->
      <div 
        :class="[$style.input, { 
          [$style.disabled]: disabled,
          [$style.focus]: showDropdown,
          [$style.hasValue]: hasValue 
        }]"
        :style="{ height: height + 'px', minHeight: height + 'px' }"
      >
      <div :class="$style.inputContent" @click.stop="toggleDropdown">
        <!-- 搜索输入框 -->
        <input
          v-if="searchable && showDropdown && !$slots.default"
          ref="searchInput"
          v-model="searchQuery"
          :class="$style.searchInputInline"
          :placeholder="placeholder"
          @input="onSearchInput"
          @click.stop
          @blur="onSearchBlur"
        />
        <!-- 显示内容 -->
        <div v-else-if="!hasValue" :class="$style.placeholder">{{ placeholder }}</div>
        <div v-else :class="$style.selectedText">
          <template v-if="multiple">
            <!-- 显示前 maxTagCount 个标签 -->
            <span 
              v-for="(item, index) in selectedItems.slice(0, maxTagCount)" 
              :key="getItemValue(item)" 
              :class="$style.tag"
            >
              {{ getItemText(item) }}
              <span v-if="!disabled" :class="$style.tagClose" @click.stop="removeItem(item)">×</span>
            </span>
            <!-- 省略标签 -->
            <span 
              v-if="selectedItems.length > maxTagCount" 
              :class="[$style.tag, $style.tagEllipsis]"
              :title="`还有 ${selectedItems.length - maxTagCount} 个选项`"
            >
              +{{ selectedItems.length - maxTagCount }}
            </span>
          </template>
          <template v-else>
            {{ selectedItems.length > 0 ? getItemText(selectedItems[0]) : '' }}
          </template>
        </div>
      </div>
      
      <!-- 右侧图标 -->
      <div :class="$style.suffix">
        <span 
          v-if="clearable && hasValue && !disabled" 
          :class="$style.clearIcon"
          @click.stop="clearSelection"
        >
          ×
        </span>
        <span 
          :class="[$style.arrow, { [$style.expanded]: showDropdown }]"
          v-else
        >
          ▼
        </span>
      </div>
    </div>

    <!-- 下拉面板 - 统一处理 -->
    <div 
      v-if="showDropdown" 
      ref="dropdown"
      :class="dropdownClasses"
      :style="getDropdownStyle()"
    >
      <!-- 如果有默认插槽，则完全使用插槽内容 -->
      <template v-if="$slots.default">
        <slot />
      </template>
      
      <!-- 否则使用默认的面板结构 -->
      <template v-else>
        <!-- 头部插槽 -->
        <div v-if="$slots.header">
          <slot name="header" />
        </div>
        
        <!-- 树结构容器 -->
        <div 
          :class="$style.tree"
          :style="{ maxHeight: getTreeHeight() + 'px' }"
        >
          <!-- 加载状态 -->
          <div v-if="loading" :class="$style.loading">
            <slot name="loading">
              <div :class="$style.loadingDefault">
                <span :class="$style.loadingIcon">⏳</span>
                <span>正在加载...</span>
              </div>
            </slot>
          </div>
          
          <!-- 空状态 -->
          <div v-else-if="filteredData.length === 0" :class="$style.empty">
            <slot name="empty">
              <div :class="$style.emptyDefault">
                <span :class="$style.emptyIcon">📄</span>
                <span>{{ searchQuery ? '未找到匹配项' : '暂无数据' }}</span>
              </div>
            </slot>
          </div>
          
          <!-- 树节点 -->
          <tree-node
            v-else
            v-for="node in filteredData"
            :key="getItemValue(node)"
            :node="node"
            :level="0"
            :selected-values="selectedValues"
            :expanded-nodes="expandedNodes"
            :multiple="multiple"
            :value-field="valueField"
            :text-field="textField"
            :parent-id-field="parentIdField"
            :check-relation="checkRelation"
            @select="onNodeSelect"
            @expand="onNodeExpand"
          />
        </div>
        
        <!-- 底部插槽 -->
        <div v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </template>
    </div>

    <!-- 遮罩层 -->
    <div v-if="showDropdown" :class="maskClasses" @click="closeDropdown"></div>
  </div>
</template>

<script>
export default {
  name: 'cwd-tree-select',
  model: {
    prop: 'value',
    event: 'input',
  },
  components: {
    TreeNode: {
      name: 'tree-node',
      props: {
        node: Object,
        level: Number,
        selectedValues: Array,
        expandedNodes: Array,
        multiple: Boolean,
        valueField: Function,
        textField: Function,
        parentIdField: Function,
        checkRelation: Boolean
      },
      template: `
        <div class="tree-node">
          <div 
            :class="['tree-node-content', { 
              'selected': isSelected,
              'has-children': hasChildren 
            }]"
            :style="{ paddingLeft: (level * 20 + 12) + 'px' }"
            @click="handleNodeClick"
          >
            <span 
              v-if="hasChildren"
              :class="['expand-icon', { 'expanded': isExpanded }]"
              @click.stop.prevent="toggleExpand"
            >
              ▶
            </span>
            <span 
              v-if="multiple"
              :class="['checkbox', { 
                'checked': isSelected,
                'indeterminate': isIndeterminate
              }]"
              @click.stop="handleSelect"
            >
              <span v-if="isIndeterminate" class="checkbox-indeterminate">-</span>
              <span v-else-if="isSelected" class="checkbox-checked">✓</span>
            </span>
            <span class="node-text">{{ getNodeText(node) }}</span>
          </div>
          
          <div v-if="isExpanded && hasChildren" class="tree-children">
            <tree-node
              v-for="child in getNodeChildren(node)"
              :key="getNodeValue(child)"
              :node="child"
              :level="level + 1"
              :selected-values="selectedValues"
              :expanded-nodes="expandedNodes"
              :multiple="multiple"
              :value-field="valueField"
              :text-field="textField"
              :parent-id-field="parentIdField"
              :check-relation="checkRelation"
              @select="$emit('select', $event)"
              @expand="$emit('expand', $event)"
            />
          </div>
        </div>
      `,
      computed: {
        isSelected() {
          const value = this.getNodeValue(this.node);
          // 🔧 统一类型进行比较
          const normalizedValue = value != null ? String(value) : null;
          const normalizedSelectedValues = this.selectedValues.map(v => v != null ? String(v) : null);
          return normalizedValue && normalizedSelectedValues.includes(normalizedValue);
        },
        isIndeterminate() {
          if (!this.checkRelation || !this.multiple || !this.hasChildren) {
            return false;
          }
          
          const children = this.getNodeChildren(this.node);
          const selectedChildren = children.filter(child => {
            const childValue = this.getNodeValue(child);
            return this.selectedValues.includes(childValue);
          });
          
          // 部分子节点选中时显示半选状态
          return selectedChildren.length > 0 && selectedChildren.length < children.length;
        },
        isExpanded() {
          const value = this.getNodeValue(this.node);
          if (value == null) return false;
          
          // 🔧 关键修复：直接比较原始值，避免过度转换
          return this.expandedNodes.some(expandedValue => {
            // 支持不同类型的比较：字符串、数字等
            return expandedValue === value || String(expandedValue) === String(value);
          });
        },
        hasChildren() {
          const children = this.getNodeChildren(this.node);
          return children && children.length > 0;
        }
      },
      methods: {
      getNodeValue(node) {
        if (this.valueField && typeof this.valueField === 'function') {
          try {
            return this.valueField(node);
          } catch (error) {
            console.error('❌ TreeNode valueField function error:', error);
          }
        }
        
        // 🔧 关键修复：与主组件保持完全一致的字段优先级
        const valueFields = ['deptId', 'id', 'value', 'key', 'code', 'uuid', 'itemId', '_id'];
        for (const field of valueFields) {
          if (node.hasOwnProperty(field) && node[field] != null && node[field] !== '') {
            return node[field];
          }
        }
        
        // 如果所有标准字段都没有值，尝试使用对象的第一个非null属性作为值
        const keys = Object.keys(node);
        for (const key of keys) {
          const value = node[key];
          if (key !== 'children' && value != null && value !== '' && 
              typeof value !== 'object' && typeof value !== 'function') {
            return value;
          }
        }
        
        return null;
      },
        getNodeText(node) {
          if (this.textField && typeof this.textField === 'function') {
            try {
              const result = this.textField(node);
              if (result != null) {
                return String(result);
              }
            } catch (error) {
              console.warn('❌ TreeNode textField function error:', error);
            }
          }
          
          // 🔧 关键修复：与主组件保持完全一致的字段优先级
          const textFields = ['name', 'title', 'text', 'label', 'caption', 'displayName'];
          for (const field of textFields) {
            if (node.hasOwnProperty(field) && node[field] != null && node[field] !== '') {
              return String(node[field]);
            }
          }
          
          // 如果没有找到文本字段，返回值字段
          const value = this.getNodeValue(node);
          return String(value || '未命名');
        },
        getNodeChildren(node) {
          return node.children || [];
        },
        getNodeParentId(node) {
          // ⭐ 关键修复：TreeNode组件处理PropertySelectSetter的不同传递格式
          if (this.parentIdField) {
            let result = null;
            
            if (typeof this.parentIdField === 'function') {
              // 情况1：函数格式
              try {
                result = this.parentIdField(node);
              } catch (error) {
                console.error('❌ TreeNode parentIdField function error:', error);
                return null;
              }
            } else if (typeof this.parentIdField === 'string') {
              // 情况2：字符串字段名格式
              try {
                // 🔧 关键修复：TreeNode同样处理嵌套字段路径
                if (this.parentIdField.includes('.')) {
                  const pathParts = this.parentIdField.split('.');
                  const finalFieldName = pathParts[pathParts.length - 1];
                  
                  if (node.hasOwnProperty(finalFieldName)) {
                    result = node[finalFieldName];
                  } else {
                    // 按路径逐级访问
                    let current = node;
                    for (const part of pathParts) {
                      if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
                        current = current[part];
                      } else {
                        current = undefined;
                        break;
                      }
                    }
                    result = current;
                  }
                } else {
                  result = node[this.parentIdField];
                }
              } catch (error) {
                console.error('❌ TreeNode error accessing field:', this.parentIdField, error);
                return null;
              }
            } else if (this.parentIdField && typeof this.parentIdField === 'object') {
              // 情况3：对象格式
              if (this.parentIdField.field || this.parentIdField.path) {
                const fieldName = this.parentIdField.field || this.parentIdField.path;
                result = node[fieldName];
              }
            }
            
            // 🔧 关键修复：TreeNode使用与主组件一致的根节点判断逻辑
            const rootIndicators = [null, undefined, '', 'null', 'undefined'];
            if (rootIndicators.includes(result)) {
              return null;
            }
            
            return result;
          }
          
          // 🔧 关键修复：与主组件保持完全一致的父节点字段自动检测
          const parentFields = ['parentDeptId', 'parentId', 'parent_id', 'pid', 'parentKey'];
          for (const field of parentFields) {
            if (node.hasOwnProperty(field)) {
              const value = node[field];
              // 🔧 关键修复：TreeNode使用与主组件一致的根节点判断逻辑
              const rootIndicators = [null, undefined, '', 'null', 'undefined'];
              if (rootIndicators.includes(value)) {
                return null;
              }
              return value;
            }
          }
          
          return null;
        },
        handleNodeClick(event) {
          // 检查是否点击的是展开图标
          if (event.target.closest('.expand-icon')) {
            return;
          }
          // 单选模式下点击节点内容才选中
          this.handleSelect();
        },
        handleSelect() {
          this.$emit('select', this.node);
        },
        toggleExpand(event) {
          event.stopPropagation();
          event.preventDefault();
          
          // 🔧 增强调试信息
          const nodeValue = this.getNodeValue(this.node);
          console.log('TreeNode toggleExpand:', {
            nodeValue,
            node: this.node,
            isCurrentlyExpanded: this.isExpanded
          });
          this.$emit('expand', this.node);
        }
      }
    }
  },
  props: {
    dataSource: {
      type: [Array, Object, Function],
      default: () => []
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    valueField: {
      type: Function,
      default: null
    },
    textField: {
      type: Function,
      default: null
    },
    parentIdField: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checkRelation: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 44
    },
    dropdownHeight: {
      type: Number,
      default: 300
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'auto',
      validator: value => ['auto', 'bottom', 'top'].includes(value)
    },
    searchPlaceholder: {
      type: String,
      default: '请输入关键词搜索'
    },
    maxTagCount: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      showDropdown: false,
      searchQuery: '',
      expandedNodes: [],
      selectedValues: [],
      selectedItems: [],
      loading: false,
      normalizedDataSource: [],
      componentHeight: null,
      actualPlacement: 'bottom', // 实际的弹出方向
      dropdownPosition: { top: 0, left: 0, width: 0 }, // 弹出层位置信息
      // 性能优化：缓存计算结果
      _treeDataCache: null,
      _treeDataCacheKey: '',
      _isUpdatingSelectedItems: false // 防止重复更新标志
    };
  },
  computed: {
    hasValue() {
      return this.selectedValues.length > 0;
    },
    // 🚀 新增：优化下拉框样式类计算
    dropdownClasses() {
      return [
        this.$style.dropdown,
        {
          [this.$style.dropdownFixed]: this.appendToBody,
          [this.$style.dropdownTop]: this.actualPlacement === 'top'
        }
      ];
    },
    // 🚀 新增：优化遮罩层样式类计算
    maskClasses() {
      return [
        this.$style.mask,
        {
          [this.$style.maskFixed]: this.appendToBody
        }
      ];
    },
    treeData() {
      // 🚀 性能优化：使用缓存避免重复构建树结构
      const cacheKey = JSON.stringify({
        data: this.normalizedDataSource,
        parentField: this.parentIdField
      });
      
      if (this._treeDataCache && this._treeDataCacheKey === cacheKey) {
        return this._treeDataCache;
      }
      
      this._treeDataCache = this.buildTreeFromFlatData(this.normalizedDataSource);
      this._treeDataCacheKey = cacheKey;
      return this._treeDataCache;
    },
    filteredData() {
      if (!this.searchQuery) {
        return this.treeData;
      }
      return this.filterNodes(this.treeData, this.searchQuery);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.initSelectedValues(newVal);
      }
    },
    dataSource: {
      handler() {
        this.$nextTick(() => {
          this.loadDataSource();
        });
      },
      immediate: true
    },
    // 监听选中值变化，确保选中项同步更新
    selectedValues: {
      handler(newVal, oldVal) {
        // 防止无限循环：只在值真正改变时更新
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.updateSelectedItems();
        }
      }
    },
    showDropdown: {
      handler(newVal) {
        if (newVal && this.appendToBody) {
          // 🚀 性能优化：使用节流和更安全的事件管理
          this.addEventListeners();
        } else if (!newVal && this.appendToBody) {
          this.removeEventListeners();
        }
      }
    }
  },
  methods: {
    initSelectedValues(value) {
      if (value == null || value === '') {
        this.selectedValues = [];
        this.selectedItems = [];
        return;
      }

      if (this.multiple) {
        // 多选模式：确保值是数组
        this.selectedValues = Array.isArray(value) ? [...value] : [value];
      } else {
        // 单选模式：确保值是数组（内部统一用数组处理）
        this.selectedValues = Array.isArray(value) ? [value[0]] : [value];
      }

      // 🚀 性能优化：使用setTimeout代替$nextTick
      setTimeout(() => {
        this.updateSelectedItems();
      }, 0);
    },

    updateSelectedItems() {
      // 🚀 性能优化：防止重复更新
      if (this._isUpdatingSelectedItems) {
        return;
      }
      
      if (this.selectedValues.length === 0) {
        this.selectedItems = [];
        return;
      }
      
      // 等待数据源加载完成后再查找选中项
      if (this.normalizedDataSource.length === 0) {
        // 数据还没加载完成，使用定时器而不是$nextTick避免调用栈过深
        setTimeout(() => {
          if (this.normalizedDataSource.length > 0) {
            this.updateSelectedItems();
          }
        }, 10);
        return;
      }
      
      this._isUpdatingSelectedItems = true;
      try {
        this.selectedItems = this.findItemsByValues(this.selectedValues);
      } finally {
        this._isUpdatingSelectedItems = false;
      }
    },

    findItemsByValues(values) {
      if (!values || values.length === 0) {
        return [];
      }
      
      const items = [];
      // 统一值类型进行比较
      const normalizedValues = values.map(v => v != null ? String(v) : null).filter(v => v !== null);
      
      const findInNodes = (nodes) => {
        for (const node of nodes) {
          const nodeValue = this.getItemValue(node);
          const normalizedNodeValue = nodeValue != null ? String(nodeValue) : null;
          
          if (normalizedNodeValue && normalizedValues.includes(normalizedNodeValue)) {
            items.push(node);
          }
          
          const children = this.getItemChildren(node);
          if (children && children.length > 0) {
            findInNodes(children);
          }
        }
      };
      
      // 搜索所有数据源，不仅仅是树数据
      findInNodes(this.normalizedDataSource);
      
      return items;
    },

    getItemValue(item) {
      if (!item) return null;
      
      if (this.valueField && typeof this.valueField === 'function') {
        try {
          const result = this.valueField(item);
          if (result != null) {
            return result;
          }
        } catch (error) {
          console.warn('❌ valueField function error:', error);
        }
      }
      
      // 🚀 增强字段查找：根据您的数据结构优化优先级
      const valueFields = ['deptId', 'id', 'value', 'key', 'code', 'uuid', 'itemId', '_id'];
      for (const field of valueFields) {
        if (item.hasOwnProperty(field) && item[field] != null && item[field] !== '') {
          return item[field];
        }
      }
      
      // 如果所有标准字段都没有值，尝试使用对象的第一个非null属性作为值
      const keys = Object.keys(item);
      for (const key of keys) {
        const value = item[key];
        if (key !== 'children' && value != null && value !== '' && 
            typeof value !== 'object' && typeof value !== 'function') {
          return value;
        }
      }
      
      console.warn('❌ 无法找到有效的值字段，数据项:', item);
      return null;
    },

    getItemText(item) {
      if (!item) return '';
      
      if (this.textField && typeof this.textField === 'function') {
        try {
          const result = this.textField(item);
          if (result != null) {
            return String(result);
          }
        } catch (error) {
          console.warn('❌ textField function error:', error);
        }
      }
      
      // 🚀 增强字段查找：根据您的数据结构优化优先级
      const textFields = ['name', 'title', 'text', 'label', 'caption', 'displayName'];
      for (const field of textFields) {
        if (item.hasOwnProperty(field) && item[field] != null && item[field] !== '') {
          return String(item[field]);
        }
      }
      
      // 如果没有找到文本字段，返回值字段
      const value = this.getItemValue(item);
      return String(value || '未命名');
    },

    getItemChildren(item) {
      if (!item) return [];
      return Array.isArray(item.children) ? item.children : [];
    },

    getItemParentId(item) {
      if (!item) return null;
      
      // ⭐ 关键修复：处理PropertySelectSetter的不同传递格式
      if (this.parentIdField) {
        let result = null;
        
        if (typeof this.parentIdField === 'function') {
          // 情况1：直接传递函数（理想情况）
          try {
            result = this.parentIdField(item);
          } catch (error) {
            console.error('❌ PropertySelectSetter function error:', error);
            return null;
          }
        } else if (typeof this.parentIdField === 'string') {
          // 情况2：传递字符串字段名（实际发生的情况）
          try {
            // 🔧 关键修复：处理嵌套字段路径
            if (this.parentIdField.includes('.')) {
              // 有嵌套路径，例如 "lCAPDepartment.parentDeptId"
              const pathParts = this.parentIdField.split('.');
              
              // 先尝试直接访问最后一个字段名（数据已被提取）
              const finalFieldName = pathParts[pathParts.length - 1];
              if (item.hasOwnProperty(finalFieldName)) {
                result = item[finalFieldName];
              } else {
                // 如果直接访问失败，尝试按路径逐级访问
                let current = item;
                for (const part of pathParts) {
                  if (current && typeof current === 'object' && current.hasOwnProperty(part)) {
                    current = current[part];
                  } else {
                    current = undefined;
                    break;
                  }
                }
                result = current;
              }
            } else {
              // 没有嵌套路径，直接访问
              result = item[this.parentIdField];
            }
          } catch (error) {
            console.error('❌ Error accessing field:', this.parentIdField, error);
            return null;
          }
        } else if (this.parentIdField && typeof this.parentIdField === 'object') {
          // 情况3：传递对象（可能包含字段路径）
          if (this.parentIdField.field || this.parentIdField.path) {
            const fieldName = this.parentIdField.field || this.parentIdField.path;
            result = item[fieldName];
          }
        }
        
        // 🔧 关键修复：只有真正的空值才是根节点标识符
        const rootIndicators = [null, undefined, ''];
        if (rootIndicators.includes(result)) {
          return null;
        }
        
        return result;
      }
      
      // 🚀 如果没有配置父节点字段，尝试自动检测常见的父节点字段
      const parentFields = ['parentDeptId', 'parentId', 'parent_id', 'pid', 'parentKey'];
      for (const field of parentFields) {
        if (item.hasOwnProperty(field)) {
          const value = item[field];
          
          // 🔧 关键修复：只有真正的空值才是根节点标识符
          const rootIndicators = [null, undefined, ''];
          if (rootIndicators.includes(value)) {
            return null;
          }
          return value;
        }
      }
      
      // 没有找到父节点字段，默认作为根节点
      return null;
    },

    normalizeDataSource(data) {
      if (Array.isArray(data)) {
        const normalized = data.map((item, index) => {
          if (!item || typeof item !== 'object') {
            return item;
          }
          
          // 🚀 增强嵌套结构处理：递归提取嵌套对象
          let extractedItem = this.extractNestedObject(item);
          
          // 确保字段映射正确
          let finalItem = this.ensureFieldMapping(extractedItem);
          
          return finalItem;
        }).filter(item => item != null); // 过滤掉null/undefined项
        
        return normalized;
      }
      
      if (data && typeof data === 'object' && Array.isArray(data.list)) {
        return this.normalizeDataSource(data.list);
      }
      
      if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
        return this.normalizeDataSource(data.data);
      }
      
      console.warn('❌ 无法识别的数据格式，返回空数组');
      return [];
    },

    // 🚀 新增：提取嵌套对象的递归方法
    extractNestedObject(item) {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return item;
      }
      
      const keys = Object.keys(item);
      
      // 情况1：对象只有一个属性且该属性的值是对象（如您的数据格式）
      if (keys.length === 1) {
        const key = keys[0];
        const value = item[key];
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // 递归提取嵌套对象
          return this.extractNestedObject(value);
        }
      }
      
      // 情况2：对象有多个属性，检查是否有明显的嵌套结构
      const potentialWrapperKeys = ['data', 'item', 'record', 'entity', 'model'];
      for (const wrapperKey of potentialWrapperKeys) {
        if (item[wrapperKey] && typeof item[wrapperKey] === 'object' && !Array.isArray(item[wrapperKey])) {
          return this.extractNestedObject(item[wrapperKey]);
        }
      }
      
      // 情况3：检查动态包装器（如lCAPDepartment等）
      for (const key of keys) {
        const value = item[key];
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          // 检查这个对象是否包含实际数据字段
          const valueKeys = Object.keys(value);
          const dataFields = ['id', 'name', 'title', 'text', 'label', 'deptId', 'value'];
          const hasDataFields = dataFields.some(field => valueKeys.includes(field));
          
          if (hasDataFields) {
            return this.extractNestedObject(value);
          }
        }
      }
      
      // 情况4：没有嵌套，直接返回
      return { ...item };
    },

    // 🚀 新增：确保字段映射的方法
    ensureFieldMapping(item) {
      const normalized = { ...item };
      
      // 字段映射优先级（根据您的数据结构）
      const valueFields = ['deptId', 'id', 'value', 'key', 'code', 'uuid', 'itemId', '_id'];
      const textFields = ['name', 'title', 'text', 'label', 'caption'];
      const parentFields = ['parentDeptId', 'parentId', 'parent_id', 'pid', 'parentKey'];
      
      // 确保有值字段
      if (!this.hasValidField(normalized, valueFields)) {
        for (const field of valueFields) {
          if (normalized[field] != null) {
            if (!normalized.value) normalized.value = normalized[field];
            if (!normalized.id) normalized.id = normalized[field];
            break;
          }
        }
      }
      
      // 确保有文本字段  
      if (!this.hasValidField(normalized, textFields)) {
        for (const field of textFields) {
          if (normalized[field] != null) {
            if (!normalized.text) normalized.text = normalized[field];
            if (!normalized.name) normalized.name = normalized[field];
            break;
          }
        }
      }
      
      return normalized;
    },

    // 🚀 新增：检查是否有有效字段的辅助方法
    hasValidField(item, fields) {
      return fields.some(field => item[field] != null && item[field] !== '');
    },

    async loadDataSource() {
      if (typeof this.dataSource === 'function') {
        this.loading = true;
        try {
          const data = await this.dataSource({});
          this.normalizedDataSource = this.normalizeDataSource(data);
        } catch (error) {
          this.normalizedDataSource = [];
        } finally {
          this.loading = false;
        }
      } else {
        this.normalizedDataSource = this.normalizeDataSource(this.dataSource);
      }
      
      // 🚀 性能优化：清除缓存，使用setTimeout代替$nextTick
      this._treeDataCache = null;
      this._treeDataCacheKey = '';
      
      setTimeout(() => {
        this.updateSelectedItems();
      }, 0);
    },

    buildTreeFromFlatData(flatData) {
      if (!flatData || flatData.length === 0) {
        return [];
      }
      
      // 🚨 关键检查：如果没有配置父节点字段，直接返回平铺结构
      if (!this.parentIdField) {
        console.warn('⚠️ 没有配置父节点字段，返回平铺结构');
        return flatData.map(item => ({ ...item, children: [] }));
      }
      
      const map = {};
      const roots = [];
      const orphanNodes = []; // 存储孤儿节点
      
      // 第一步：创建映射表并规范化数据
      flatData.forEach((item) => {
        const value = this.getItemValue(item);
        const parentId = this.getItemParentId(item);
        
        // 统一转换为字符串进行处理，但保留null表示根节点
        const normalizedValue = value != null ? String(value) : null;
        const normalizedParentId = parentId != null ? String(parentId) : null;
        
        if (normalizedValue != null && normalizedValue !== '') {
          map[normalizedValue] = { 
            ...item, 
            children: [], 
            _normalizedValue: normalizedValue,
            _normalizedParentId: normalizedParentId
          };
        }
      });
      
      // 第二步：构建树形结构
      Object.values(map).forEach(node => {
        const normalizedValue = node._normalizedValue;
        const normalizedParentId = node._normalizedParentId;
        
        // 🔧 关键修复：只有真正为null的才是根节点
        const isRootNode = (
          normalizedParentId === null || 
          normalizedParentId === undefined || 
          normalizedParentId === '' ||
          normalizedParentId === 'null' || // 字符串'null'
          normalizedParentId === 'undefined' // 字符串'undefined'
        );
        
        if (isRootNode) {
          // 这是根节点
          roots.push(node);
        } else {
          // 查找父节点
          const parentNode = map[normalizedParentId];
          if (parentNode) {
            // 找到父节点，添加为子节点
            if (!parentNode.children.find(child => child._normalizedValue === normalizedValue)) {
              parentNode.children.push(node);
            }
          } else {
            // 父节点不存在，这是孤儿节点
            orphanNodes.push(node);
          }
        }
      });
      
      // 第三步：处理孤儿节点 - 将孤儿节点也作为根节点显示
      orphanNodes.forEach(orphan => {
        if (!roots.find(root => root._normalizedValue === orphan._normalizedValue)) {
          roots.push(orphan);
        }
      });
      
      // 第四步：应急处理 - 如果构建失败，使用平铺结构
      const countTreeNodes = (nodes) => {
        let count = 0;
        nodes.forEach(node => {
          count++;
          if (node.children && node.children.length > 0) {
            count += countTreeNodes(node.children);
          }
        });
        return count;
      };
      
      const builtNodesCount = countTreeNodes(roots);
      const totalOriginalNodes = flatData.filter(item => this.getItemValue(item) != null).length;
      
      if (builtNodesCount === 0 && flatData.length > 0) {
        console.warn('⚠️ 树构建失败，回退到平铺结构');
        return flatData
          .filter(item => this.getItemValue(item) != null)
          .map(item => ({ ...item, children: [] }));
      }
      
      return roots;
    },

    filterNodes(nodes, query) {
      // 🚀 性能优化：限制递归深度和节点数量
      const maxDepth = 10; // 最大递归深度
      const maxNodes = 1000; // 最大处理节点数
      let processedNodes = 0;
      
      const filterRecursive = (nodes, query, depth = 0) => {
        if (depth > maxDepth || processedNodes > maxNodes) {
          return [];
        }
        
        const filtered = [];
        const lowerQuery = query.toLowerCase();
        
        for (const node of nodes) {
          if (processedNodes > maxNodes) break;
          processedNodes++;
          
          const text = this.getItemText(node).toLowerCase();
          const children = this.getItemChildren(node);
          
          if (text.includes(lowerQuery)) {
            filtered.push(node);
          } else if (children && children.length > 0) {
            const filteredChildren = filterRecursive(children, query, depth + 1);
            if (filteredChildren.length > 0) {
              filtered.push({
                ...node,
                children: filteredChildren
              });
            }
          }
        }
        return filtered;
      };
      
      return filterRecursive(nodes, query);
    },

    toggleDropdown() {
      if (this.disabled) return;
      this.showDropdown = !this.showDropdown;
      
      if (this.showDropdown) {
        this.$nextTick(() => {
          this.calculateDropdownPosition();
          // 如果启用搜索且没有使用默认插槽，聚焦搜索输入框
          if (this.searchable && !this.$slots.default && this.$refs.searchInput) {
            this.$refs.searchInput.focus();
          }
        });
      } else {
        // 关闭时清空搜索
        this.searchQuery = '';
        this.cleanup();
      }
    },

    onSearchBlur() {
      // 移除自动关闭逻辑，防止意外关闭下拉框
    },

    closeDropdown() {
      this.showDropdown = false;
    },

    onNodeSelect(node) {
      const value = this.getItemValue(node);
      
      if (this.multiple) {
        // 🔧 统一类型进行比较
        const normalizedValue = value != null ? String(value) : null;
        const normalizedSelectedValues = this.selectedValues.map(v => v != null ? String(v) : null);
        const index = normalizedSelectedValues.indexOf(normalizedValue);
        const isSelecting = index === -1;
        
        if (!isSelecting) {
          // 找到原数组中对应的项目并移除
          const originalIndex = this.selectedValues.findIndex(v => String(v) === normalizedValue);
          if (originalIndex > -1) {
            this.selectedValues.splice(originalIndex, 1);
          }
        } else {
          this.selectedValues.push(value); // 保持原始类型
        }
        
        // 父子节点关联选中逻辑
        if (this.checkRelation) {
          if (isSelecting) {
            this.selectNodeWithChildren(node);
          } else {
            this.deselectNodeWithChildren(node);
          }
          this.updateParentSelection(node);
        }
        
        // 多选模式不关闭下拉框
      } else {
        // 单选模式下选择后关闭下拉框
        this.selectedValues = [value];
        this.closeDropdown();
      }

      this.updateSelectedItems();
      this.emitChange();
    },

    onNodeExpand(node) {
      const value = this.getItemValue(node);
      
      if (value == null) {
        console.warn('⚠️ Node value is null, cannot expand/collapse');
        return;
      }
      
      // 🔧 简化逻辑：直接查找和操作
      const existingIndex = this.expandedNodes.findIndex(expandedValue => {
        return expandedValue === value || String(expandedValue) === String(value);
      });
      
      const isExpanding = existingIndex === -1;
      
      if (isExpanding) {
        // 展开：添加到展开列表
        this.expandedNodes.push(value);
      } else {
        // 收起：从展开列表移除
        this.expandedNodes.splice(existingIndex, 1);
      }

      // 触发展开事件
      this.$emit('expand', {
        expanded: isExpanding,
        node: node,
        expandedNodes: [...this.expandedNodes] // 传递副本
      });
    },

    removeItem(item) {
      const value = this.getItemValue(item);
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
        this.updateSelectedItems();
        this.emitChange();
      }
    },

    clearSelection() {
      this.selectedValues = [];
      this.selectedItems = [];
      this.emitChange();
      this.$emit('clear', null);
    },

    onSearchInput() {
      this.$emit('search', {
        query: this.searchQuery
      });
    },

    emitChange() {
      const outputValue = this.multiple ? this.selectedValues : this.selectedValues[0] || null;
      
      // 触发 input 事件用于 v-model
      this.$emit('input', outputValue);
      
      // 触发 update:value 事件用于 .sync 修饰符
      this.$emit('update:value', outputValue);
      
      // 通用的选择改变事件
      this.$emit('change', {
        value: outputValue,
        values: this.selectedValues,
        item: this.selectedItems[0] || null,
        items: this.selectedItems
      });

      // 根据模式触发特定事件
      if (this.multiple) {
        // 多选模式：触发多选后事件
        this.$emit('multiple-select', {
          values: this.selectedValues,
          items: this.selectedItems
        });
      } else {
        // 单选模式：触发单选后事件
        this.$emit('single-select', {
          value: this.selectedValues[0] || null,
          item: this.selectedItems[0] || null
        });
      }
    },

    // 公开方法
    clear() {
      this.clearSelection();
    },

    expandAll() {
      const allValues = [];
      const collectValues = (nodes) => {
        for (const node of nodes) {
          const children = this.getItemChildren(node);
          if (children && children.length > 0) {
            const value = this.getItemValue(node);
            if (value != null) {
              allValues.push(value);
            }
            collectValues(children);
          }
        }
      };
      collectValues(this.treeData);
      this.expandedNodes = allValues;
      console.log('✅ Expanded all nodes:', allValues);
    },

    collapseAll() {
      this.expandedNodes = [];
      console.log('✅ Collapsed all nodes');
    },

    async reload() {
      await this.loadDataSource();
    },

    // 选中节点及其所有子节点
    selectNodeWithChildren(node) {
      const value = this.getItemValue(node);
      if (!this.selectedValues.includes(value)) {
        this.selectedValues.push(value);
      }
      
      const children = this.getItemChildren(node);
      if (children && children.length > 0) {
        children.forEach(child => {
          this.selectNodeWithChildren(child);
        });
      }
    },

    // 取消选中节点及其所有子节点
    deselectNodeWithChildren(node) {
      const value = this.getItemValue(node);
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
      
      const children = this.getItemChildren(node);
      if (children && children.length > 0) {
        children.forEach(child => {
          this.deselectNodeWithChildren(child);
        });
      }
    },

    // 更新父节点选中状态
    updateParentSelection(node) {
      const parentId = this.getItemParentId(node);
      if (parentId == null) return;
      
      const parentNode = this.findNodeByValue(parentId);
      if (!parentNode) return;
      
      const parentValue = this.getItemValue(parentNode);
      const siblings = this.getNodeSiblings(node);
      const selectedSiblings = siblings.filter(sibling => {
        const siblingValue = this.getItemValue(sibling);
        return this.selectedValues.includes(siblingValue);
      });
      
      const parentIndex = this.selectedValues.indexOf(parentValue);
      
      if (selectedSiblings.length === siblings.length) {
        // 所有子节点都选中，选中父节点
        if (parentIndex === -1) {
          this.selectedValues.push(parentValue);
        }
      } else {
        // 不是所有子节点都选中，取消选中父节点
        if (parentIndex > -1) {
          this.selectedValues.splice(parentIndex, 1);
        }
      }
      
      // 递归更新祖父节点
      this.updateParentSelection(parentNode);
    },

    // 根据值查找节点
    findNodeByValue(value) {
      const findInNodes = (nodes) => {
        for (const node of nodes) {
          const nodeValue = this.getItemValue(node);
          if (nodeValue === value) {
            return node;
          }
          const children = this.getItemChildren(node);
          if (children && children.length > 0) {
            const found = findInNodes(children);
            if (found) return found;
          }
        }
        return null;
      };
      return findInNodes(this.treeData);
    },

    // 获取节点的兄弟节点（包括自己）
    getNodeSiblings(node) {
      const parentId = this.getItemParentId(node);
      
      if (parentId == null) {
        // 根节点的兄弟节点就是所有根节点
        return this.treeData;
      } else {
        // 子节点的兄弟节点是父节点的所有子节点
        const parentNode = this.findNodeByValue(parentId);
        return parentNode ? this.getItemChildren(parentNode) : [];
      }
    },

    // 计算弹出层位置
    calculateDropdownPosition() {
      if (!this.$el) return;

      const inputRect = this.$el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // 计算可用空间
      const spaceBelow = viewportHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      const dropdownHeight = this.dropdownHeight;

      // 根据配置和可用空间决定弹出方向
      let actualPlacement = this.placement;
      if (this.placement === 'auto') {
        // 自动判断方向：优先向下，空间不足时向上
        // 需要至少150px的空间来显示下拉框，如果下方空间不足，则向上
        const minRequiredSpace = Math.min(dropdownHeight, 150);
        if (spaceBelow >= minRequiredSpace) {
          actualPlacement = 'bottom';
        } else if (spaceAbove >= minRequiredSpace) {
          actualPlacement = 'top';
        } else {
          // 两边空间都不足，选择空间较大的一边
          actualPlacement = spaceAbove > spaceBelow ? 'top' : 'bottom';
        }
      }

      this.actualPlacement = actualPlacement;

      // 计算位置
      let top, left, width, maxHeight;

      if (this.appendToBody) {
        // 挂载到body时使用fixed定位
        left = inputRect.left;
        width = inputRect.width;

        if (actualPlacement === 'top') {
          // 向上弹出：弹框底部贴着输入框顶部
          const availableHeight = Math.max(50, spaceAbove - 10);
          const actualHeight = Math.min(dropdownHeight, availableHeight);
          top = inputRect.top - actualHeight - 4;
          maxHeight = actualHeight;
        } else {
          // 向下弹出：弹框顶部贴着输入框底部
          top = inputRect.bottom + 4;
          maxHeight = Math.min(dropdownHeight, Math.max(50, spaceBelow - 10));
        }

        // 确保不超出视口边界
        if (left + width > viewportWidth) {
          left = viewportWidth - width - 10;
        }
        if (left < 10) {
          left = 10;
          width = Math.min(width, viewportWidth - 20);
        }
      } else {
        // 相对定位
        left = 0;
        width = inputRect.width;

        if (actualPlacement === 'top') {
          // 向上弹出：使用bottom定位
          const availableHeight = Math.max(50, spaceAbove - 10);
          const actualHeight = Math.min(dropdownHeight, availableHeight);
          top = -actualHeight - 4; // 负值，表示向上
          maxHeight = actualHeight;
        } else {
          // 向下弹出：使用top定位
          top = inputRect.height + 4;
          maxHeight = Math.min(dropdownHeight, Math.max(50, spaceBelow - 10));
        }
      }

      this.dropdownPosition = {
        top: Math.round(top),
        left: Math.round(left),
        width: Math.round(width)
      };

      this.componentHeight = Math.max(150, maxHeight);
    },

    // 获取弹出层样式
    getDropdownStyle() {
      const style = {
        maxHeight: this.getDropdownHeight() + 'px'
      };

      if (this.appendToBody) {
        // 挂载到body时使用固定定位
        style.position = 'fixed';
        style.top = this.dropdownPosition.top + 'px';
        style.left = this.dropdownPosition.left + 'px';
        style.width = this.dropdownPosition.width + 'px';
        style.zIndex = '9999';
      } else {
        // 相对定位
        if (this.actualPlacement === 'top') {
          style.bottom = this.height + 4 + 'px';
          style.top = 'auto';
          style.marginBottom = '0px';
          style.marginTop = '0px';
        } else {
          style.top = '100%';
          style.bottom = 'auto';
          style.marginTop = '4px';
          style.marginBottom = '0px';
        }
      }

      return style;
    },

    // 获取动态计算的下拉面板高度
    getDropdownHeight() {
      return this.componentHeight || this.dropdownHeight;
    },

    // 获取动态计算的树容器高度
    getTreeHeight() {
      const dropdownHeight = this.getDropdownHeight();
      // 由于移除了下拉面板中的搜索框，只需要为头部和底部插槽预留少量空间
      return Math.max(150, dropdownHeight - 20);
    },

    // 清理函数
    cleanup() {
      this.removeEventListeners();
    },

    // 🚀 性能优化：节流处理事件
    throttle(func, delay) {
      let timeoutId;
      let lastExecTime = 0;
      return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
          func.apply(this, args);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func.apply(this, args);
            lastExecTime = Date.now();
          }, delay - (currentTime - lastExecTime));
        }
      };
    },

    // 添加事件监听器
    addEventListeners() {
      if (this._scrollHandler || this._resizeHandler) {
        return; // 已经添加过了
      }
      
      this._scrollHandler = this.throttle(this.handleScroll, 16); // 60fps
      this._resizeHandler = this.throttle(this.handleResize, 100);
      
      window.addEventListener('scroll', this._scrollHandler, true);
      window.addEventListener('resize', this._resizeHandler);
    },

    // 移除事件监听器
    removeEventListeners() {
      if (this._scrollHandler) {
        window.removeEventListener('scroll', this._scrollHandler, true);
        this._scrollHandler = null;
      }
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler);
        this._resizeHandler = null;
      }
    },

    // 处理滚动事件
    handleScroll() {
      if (this.showDropdown && this.appendToBody) {
        this.calculateDropdownPosition();
      }
    },

    // 处理窗口大小改变事件
    handleResize() {
      if (this.showDropdown) {
        this.calculateDropdownPosition();
      }
    },

    // 清理body挂载
    cleanupBodyMount() {
      // 简化清理逻辑
      if (this.bodyContainer && this.bodyContainer.parentNode) {
        this.bodyContainer.parentNode.removeChild(this.bodyContainer);
      }
    }
  }
};
</script>

<style module>
.root {
  position: relative;
  width: 100%;
}

.input {
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
}

.input:hover {
  border-color: #007bff;
}

.input.focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.input.disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}

.inputContent {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  min-height: 20px;
}

.placeholder {
  color: #999;
  font-size: 14px;
}

.selectedText {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  color: #333;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 12px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tagEllipsis {
  background: #e0e0e0;
  color: #666;
  cursor: help;
}

.tagEllipsis:hover {
  background: #d0d0d0;
}

.tagClose {
  margin-left: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #666;
}

.tagClose:hover {
  color: #333;
}

.suffix {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.clearIcon {
  padding: 4px;
  cursor: pointer;
  color: #999;
  font-size: 16px;
  line-height: 1;
  border-radius: 50%;
  transition: all 0.2s;
}

.clearIcon:hover {
  background: #f0f0f0;
  color: #666;
}

.arrow {
  font-size: 12px;
  color: #999;
  transition: transform 0.2s;
}

.arrow.expanded {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: max-height 0.2s ease;
}

.dropdownFixed {
  position: fixed !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  z-index: 9999 !important;
  margin-top: 0 !important;
}

.dropdownTop {
  top: auto !important;
  bottom: 100% !important;
  margin-top: 0 !important;
  margin-bottom: 4px !important;
}

/* 确保向上弹出的样式正确应用 */
.dropdown.dropdownTop {
  transform-origin: bottom center;
}

.dropdown:not(.dropdownFixed).dropdownTop {
  position: absolute !important;
  bottom: 100% !important;
  top: auto !important;
  margin-bottom: 4px !important;
  margin-top: 0 !important;
}

.searchInputInline {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
}

.searchInputInline::placeholder {
  color: #999;
}

.tree {
  overflow-y: auto;
}

.empty {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.emptyDefault {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.emptyIcon {
  font-size: 32px;
  opacity: 0.6;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.loadingDefault {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.loadingIcon {
  font-size: 24px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.node {
  user-select: none;
}

.nodeContent {
  display: flex;
  align-items: center;
  height: 36px;
  padding-right: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.nodeContent:hover {
  background: #f8f9fa;
}

.nodeContent.selected {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.expandIcon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  font-size: 10px;
  color: #666;
  transition: transform 0.2s;
}

.expandIcon.expanded {
  transform: rotate(90deg);
}

.checkbox {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 10px;
  color: transparent;
  transition: all 0.2s;
}

.checkbox.checked {
  background: #007bff;
  border-color: #007bff;
  color: #fff;
}

.nodeText {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
}

.maskFixed {
  z-index: 9998 !important;
}

/* TreeNode 组件样式 */
:global(.tree-node) {
  user-select: none;
}

:global(.tree-node-content) {
  display: flex;
  align-items: center;
  height: 36px;
  padding-right: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

:global(.tree-node-content:hover) {
  background: #f8f9fa;
}

:global(.tree-node-content.selected) {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

:global(.expand-icon) {
  width: 16px;
  height: 16px;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  font-size: 10px;
  color: #666 !important;
  cursor: pointer !important;
  transition: transform 0.2s;
  user-select: none;
  position: relative;
  flex-shrink: 0; /* 防止被挤压 */
  z-index: 1; /* 确保可点击 */
}

:global(.expand-icon:hover) {
  color: #007bff !important;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 2px;
}

:global(.expand-icon.expanded) {
  transform: rotate(90deg);
}

:global(.expand-icon:active) {
  color: #333 !important;
  background: rgba(0, 123, 255, 0.2);
}

:global(.checkbox) {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-size: 10px;
  color: transparent;
  transition: all 0.2s;
}

:global(.checkbox.checked) {
  background: #007bff;
  border-color: #007bff;
  color: #fff;
}

:global(.checkbox.indeterminate) {
  background: #007bff;
  border-color: #007bff;
  color: #fff;
}

:global(.checkbox-indeterminate) {
  font-size: 12px;
  font-weight: bold;
}

:global(.checkbox-checked) {
  font-size: 10px;
}

:global(.node-text) {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>