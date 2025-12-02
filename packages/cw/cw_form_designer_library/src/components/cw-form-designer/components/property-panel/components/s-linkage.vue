<template>
  <div ref="linkageRef" :class="$style.root" :style="{ height: totalHeight }">
    <el-form-item :class="$style.header" label="联动规则" style="margin-bottom: 0">
      <s-others-icon ref="addIcon" name="add2" hover size="small" @click="handleAddRule" />
    </el-form-item>
    <div :class="$style.emptyRules" v-if="isEmptyRules" @click="handleAddRule">点击可添加联动规则</div>
    <div :class="$style.ruleList">
      <div
        :class="$style.ruleItem"
        :ruleItemName="rule.name"
        :active="activeRuleName === rule.name"
        @click="handleEditRule(rule)"
        v-for="rule in currentRules"
        :key="rule.name"
      >
        <el-input :class="$style.ruleTitleInput" readonly :value="getRuleTitle(rule)" />
        <s-others-icon name="remove2" hover size="small" @click.stop="handleDeleteRule(rule)" />
      </div>
    </div>
    <u-virtual-popover
      ref="virtualPopover"
      placement="bottom-end"
      :virtual-ref="triggerElement"
      :close-delay="0"
      :visible-arrow="false"
      popper-class="cw-form-designer-library-virtual-popover"
    >
      <div class="popoverHeader">
        <div>{{ isCreatingRule ? '新增' : '编辑' }}联动规则</div>
        <s-others-icon name="close" hover size="small" @click="handleClosePopover" />
      </div>
      <div class="popoverContent">
        <el-form :model="activeRule" :inline="true" label-position="top" label-width="100px">
          <el-form-item v-for="(value, key) in activeRule" :key="key" :label="labelMap?.[key]" :prop="key">
            <!-- 名称选择器 -->
            <el-select
              v-if="key === 'name'"
              style="width: 100px"
              :disabled="!(isCreatingRule && selectableRuleList.length)"
              v-model="activeRule[key]"
              placeholder="请选择"
              @change="handleSelectChange"
            >
              <el-option v-for="option in selectableRuleList" :key="option.value" :label="option.label" :value="option.value" />
            </el-select>
            <!-- 正则表达式规则，使用输入框 -->
            <el-input v-else-if="key === 'value' && ['pattern'].includes(activeRule.name)" v-model="activeRule[key]" placeholder="请输入" />
            <!-- 最大长度和最小长度规则，使用数字输入框 -->
            <el-input-number
              v-else-if="key === 'value' && ['maxLength', 'minLength'].includes(activeRule.name)"
              v-model="activeRule[key]"
              :min="0"
              :precision="0"
              controls-position="right"
              placeholder="请输入"
            />
            <!-- 必填和手机号不需要输入值 -->
            <div style="width: 130px" v-else-if="key === 'value' && ['required', 'mobile'].includes(activeRule.name)">-</div>
            <!-- 错误提示输入框 -->
            <el-input style="width: 220px" v-else-if="key === 'message'" v-model="activeRule[key]" placeholder="请输入" />
          </el-form-item>
        </el-form>
      </div>
    </u-virtual-popover>
  </div>
</template>

<script>
import UVirtualPopover from './basic/u-virtual-popover.vue';
import { batchOperate } from '@/mini-nasl/utils';
import { setAttrValue } from '../fields';
import { isEqual } from 'lodash';
export default {
  name: 's-linkage',
  components: {
    UVirtualPopover,
  },
  props: {
    selectedNode: {
      type: Object,
    },
    onChange: {
      type: Function,
    },
  },
  data() {
    return {
      popoverVisible: false,
      options: [
        { label: '必填', name: 'required', value: undefined, message: undefined },
        { label: '最大长度', name: 'maxLength', value: undefined, message: undefined },
        { label: '最小长度', name: 'minLength', value: undefined, message: undefined },
        { label: '手机号', name: 'mobile', value: undefined, message: undefined },
        { label: '正则表达式', name: 'pattern', value: undefined, message: undefined },
      ],
      labelMap: {
        name: '规则类型',
        value: '规则值',
        message: '错误提示',
      },
      currentRules: [],
      triggerElement: null,
      rulesAttr: null,
      activeRule: null, // 当前激活的规则（包括：新增和编辑的）
      activeRuleName: null, // 当前激活的规则名称
      selectableRuleList: [],
      isCreatingRule: false, // 标记是否正在创建校验规则
    };
  },
  computed: {
    isEmptyRules() {
      return this.currentRules.length === 0;
    },
    totalHeight() {
      if (this.isEmptyRules) {
        return '70px';
      } else {
        return `${32 + this.currentRules.length * 38}px`;
      }
    },
  },
  created() {
    this.rulesAttr = this.selectedNode?.bindAttrs?.find((it) => it?.name === 'rules');
    this.currentRules = this.getRules();

    const unwatch = this.$watch('currentRules', {
      handler(newVal, oldVal) {
        // console.log('currentRules改变', JSON.stringify(newVal));
        this.updateRulesAttr(); // 监听规则列表变化，更新规则属性
      },
      deep: true,
    });
    this.$once('hook:beforeDestroy', () => {
      unwatch();
    });
  },
  methods: {
    handleSelectChange() {
      // 切换规则类型时，清空输入值和错误提示
      this.activeRule.value = undefined;
      this.activeRule.message = undefined;
    },
    getRules() {
      if (!this.rulesAttr?.rules?.length) return [];
      return this.rulesAttr.rules.map((rule) => this.parseValidationRule(rule)).filter(Boolean);
    },
    parseValidationRule(rule) {
      // 只关心校验规则的核心字段 其他配套数据一般不会记录是否有丢失
      // 如果对应校验规则不生效 和IDE中的nasl字段对比下结构
      try {
        const { calleeName: name, errorMessage } = rule;
        const ruleArgs = rule.arguments; // 避免使用保留字 arguments
        const getArgValue = (argName) => ruleArgs?.find((it) => it.name === argName)?.expression?.value;

        const valueMap = {
          maxLength: () => getArgValue('max'),
          minLength: () => getArgValue('min'),
          pattern: () => getArgValue('re'),
        };

        return {
          label: this.options.find((it) => it.name === name)?.label,
          name,
          value: valueMap[name]?.() ?? undefined,
          message: errorMessage?.value,
        };
      } catch (error) {
        return null;
      }
    },
    getRuleTitle({ label, value, message }) {
      return `"${label}"校验失败时, ${message ? `提示: "${message}"` : '使用默认提示'}`;
    },
    handleAddRule() {
      this.isCreatingRule = true;
      // step1: 如果有临时规则，说明有弹窗在打开，需要主动触发关闭
      if (this.activeRuleName) {
        this.updateActiveRule();
      }
      this.$nextTick(() => {
        // step2: 生成临时规则，并添加到当前规则列表中，触发规则更新，确保添加新规则
        this.getActiveRule();
        // 创建 activeRule 的副本，断开响应式关联，避免修改 activeRule 时触发 currentRules 的 deep watch
        this.currentRules = [...this.currentRules, { ...this.activeRule }];

        // step3: 更新虚拟popiver参照节点，并显示
        this.$nextTick(() => {
          this.triggerElement = this.$refs.linkageRef.querySelector(`[ruleItemName="${this.activeRule.name}"]`);
          this.$refs.virtualPopover.show();
        });
      });
    },
    handleEditRule(rule) {
      this.isCreatingRule = false;
      this.activeRule = { ...rule };
      this.activeRuleName = rule.name;
      this.selectableRuleList = [
        {
          label: rule.label,
          value: rule.name,
        },
      ];
      this.triggerElement = this.$refs.linkageRef.querySelector(`[ruleItemName="${rule.name}"]`);
      this.$refs.virtualPopover.show();
    },
    handleDeleteRule(rule) {
      this.$refs.virtualPopover.hide();
      this.triggerElement = null;
      this.currentRules = this.currentRules.filter((it) => it.name !== rule.name);
    },
    // 更新当前激活的规则，并清空激活状态
    updateActiveRule() {
      const oldRule = this.currentRules.find((it) => it.name === this.activeRuleName);
      const oldRuleIndex = this.currentRules.findIndex((it) => it.name === this.activeRuleName);

      if (oldRuleIndex !== -1 && !isEqual(this.activeRule, oldRule)) {
        // ⚠️：新增规则时，可切换规则类型，需要更新规则的label
        this.activeRule.label = this.options.find((it) => it.name === this.activeRule.name)?.label;
        this.currentRules.splice(oldRuleIndex, 1, { ...this.activeRule });
      }

      this.activeRule = null;
      this.activeRuleName = null;
    },
    handleClosePopover() {
      this.$refs.virtualPopover.hide();
      this.triggerElement = null;
      this.updateActiveRule();
    },
    getActiveRule() {
      const existedNames = this.currentRules.map((it) => it.name);
      const targetRule = this.options.find((it) => !existedNames.includes(it.name));
      if (targetRule) {
        const tempActiveRule = { ...targetRule }; // 断开响应式
        this.activeRule = tempActiveRule;
        this.activeRuleName = tempActiveRule.name;
        this.selectableRuleList = this.options
          .filter((it) => !existedNames.includes(it.name))
          .map((it) => {
            return {
              label: it.label,
              value: it.name,
            };
          });
      } else {
        this.activeRule = null;
        this.activeRuleName = null;
        this.selectableRuleList = [];
        console.error('暂无可选的校验规则!');
      }
    },

    genValidationRule({ name, value, message }) {
      try {
        const baseRule = {
          concept: 'ValidationRule',
          calleeNamespace: 'nasl.validation',
          calleeName: name,
          enableServerValidation: false, // 服务端校验暂时不支持
          errorMessage: {
            concept: 'StringLiteral',
            value: message,
          },
          arguments: [],
        };

        // 根据规则类型生成参数
        switch (name) {
          case 'required':
            break;
          case 'maxLength':
            baseRule.arguments = [
              {
                concept: 'Argument',
                keyword: 'max',
                expression: {
                  concept: 'NumericLiteral',
                  value, // 最大长度
                  typeAnnotation: {
                    concept: 'TypeAnnotation',
                    typeKind: 'primitive',
                    typeNamespace: 'nasl.core',
                    typeName: 'Long',
                  },
                },
              },
            ];
            break;
          case 'minLength':
            baseRule.arguments = [
              {
                concept: 'Argument',
                keyword: 'min',
                expression: {
                  concept: 'NumericLiteral',
                  value, // 最小长度
                  typeAnnotation: {
                    concept: 'TypeAnnotation',
                    typeKind: 'primitive',
                    typeNamespace: 'nasl.core',
                    typeName: 'Long',
                  },
                },
              },
            ];
            break;
          case 'mobile':
            baseRule.arguments = [
              {
                concept: 'Argument',
                keyword: 'locale',
                expression: {
                  concept: 'StringLiteral',
                  value: 'zh-CN',
                },
              },
              {
                concept: 'Argument',
                keyword: 'strict',
                expression: {
                  concept: 'BooleanLiteral',
                  value: 'false',
                },
              },
            ];
            break;
          case 'pattern':
            baseRule.arguments = [
              {
                concept: 'Argument',
                keyword: 're',
                expression: {
                  concept: 'StringLiteral',
                  value, // 正则表达式
                },
              },
              {
                concept: 'Argument',
                keyword: 'strict',
                expression: {
                  concept: 'BooleanLiteral',
                  value: 'true',
                },
              },
              {
                concept: 'Argument',
                keyword: 'matchCase',
                expression: {
                  concept: 'BooleanLiteral',
                  value: 'true',
                },
              },
            ];
            break;
          default:
            throw new Error(`Unsupported rule: ${name}`);
        }

        return baseRule;
      } catch (error) {
        return null;
      }
    },
    async updateRulesAttr() {
      const hasError = await batchOperate(this.selectedNode?.view, `更新校验规则`, async () => {
        const newRules = this.currentRules.map((it) => this.genValidationRule(it));
        if (newRules.length) {
          if (!this.rulesAttr) {
            this.rulesAttr = this.selectedNode.addBindAttribute({ name: 'rules', rules: [] });
          }
          this.rulesAttr.update({
            rules: newRules,
          });
          const hasRequiredRule = this.currentRules.some((it) => it.name === 'required');
          this.setRequiredAttr(hasRequiredRule);
        } else {
          this.rulesAttr.update({
            rules: [],
          });
          this.setRequiredAttr(false);
        }
      });
      return hasError;
    },
    setRequiredAttr(value) {
      setAttrValue({
        node: this.selectedNode,
        key: 'required',
        type: 'static',
        value,
      });
    },
    // ================================ 操作验证规则 ===============================
    // ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓   ↓    ↓    ↓
    // ===========================================================================
    // ===========================================================================
    // ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑    ↑    ↑   ↑
    // ================================ 操作验证规则 ===============================
  },
};
</script>

<style lang="scss" module>
.root {
  width: 100%;
  margin-bottom: 10px;
  position: relative;

  .header [class^='el-form-item__content'] {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .emptyRules {
    box-sizing: border-box;
    font-size: 12px;
    border: 1px dashed #e7eaee;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    margin: 5px 0;
    border-radius: 4px;
    color: #aaaaaa;
    &:hover {
      color: #4d88ff;
      border: 1px dashed #4d88ff;
      background: #edf3ff;
    }
  }

  .ruleList {
    box-sizing: border-box;
    position: absolute;
    top: 32px;
    left: -16px;
    right: -16px;

    .ruleItem {
      box-sizing: border-box;
      height: 38px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 5px 16px;
      user-select: none;

      &:hover {
        background: #edf3ff;
      }
      &[active] {
        background: #cddeff;
      }

      .ruleTitleInput [class^='el-input__inner'] {
        height: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>
