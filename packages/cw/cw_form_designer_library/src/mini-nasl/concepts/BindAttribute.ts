import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import { getConceptConstructor } from '../decorators/utils';
import { genUniqueName } from '../utils';
import LogicItem from './LogicItem';
import ValidationRule from './ValidationRule';
import StringLiteral from './StringLiteral';
import NumericLiteral from './NumericLiteral';
import BooleanLiteral from './BooleanLiteral';

type LiteralNode = StringLiteral | NumericLiteral | BooleanLiteral;

@concept('绑定属性')
export class BindAttribute extends BaseNode {
  static readonly ConceptName = 'BindAttribute';

  constructor(source?: Partial<BindAttribute>) {
    source = Object.assign({}, BindAttribute.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): BindAttribute {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  name: string = '';

  @property()
  value?: string | boolean | number;

  @property()
  type?: 'string' | 'static' | 'dynamic';

  @property()
  sync: boolean;

  @property({
    objectRef: 'LogicItem',
  })
  expression?: LogicItem;

  @property({ objectRef: 'ValidationRule', isArray: true })
  rules: ValidationRule[] = [];

  /**
   * 获取已存在的验证规则名称
   * @param excludedList 排除的验证规则列表
   */
  getValidationRuleExistingNames(excludedList: Array<ValidationRule> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.rules || []).filter((item) => !excludedSet.has(item) && item.name).map((item) => item.name);
  }

  /**
   * 获取唯一的验证规则名称
   * @param name 基础名称，默认为 'validationRule1'
   */
  getValidationRuleUniqueName(name: string = 'validationRule1'): string {
    const existingNames = new Set(this.getValidationRuleExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入验证规则
   * @internal
   * @param name 验证规则名称，如果不填会自动生成一个唯一名称
   */
  _insertValidationRuleAt(name: string, index: number): ValidationRule;

  /**
   * 插入验证规则
   * @internal
   * @param validationRuleOptions 验证规则参数
   */
  _insertValidationRuleAt(validationRuleOptions: Partial<ValidationRule>, index: number): ValidationRule;

  /**
   * 插入验证规则
   * @internal
   * @param validationRule 已有的验证规则实例
   */
  _insertValidationRuleAt(validationRule: ValidationRule, index: number): ValidationRule;

  _insertValidationRuleAt(options: string | Partial<ValidationRule> | ValidationRule, index: number) {
    const validationRuleOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'rules' };
    const ValidationRule = getConceptConstructor('ValidationRule');
    let validationRule: ValidationRule;
    if (!options) {
      validationRule = ValidationRule.from(
        {
          ...validationRuleOptions,
          name: this.getValidationRuleUniqueName(),
        },
        this,
        'rules'
      );
    } else if (typeof options === 'string') {
      validationRule = ValidationRule.from(
        {
          ...validationRuleOptions,
          name: options,
        },
        this,
        'rules'
      );
    } else if (options instanceof ValidationRule) {
      validationRule = options as ValidationRule;
      // 迁移关系
      if ((validationRule as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (validationRule as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(validationRule as any, relationOptions);
    } else {
      validationRule = ValidationRule.from(
        {
          ...validationRuleOptions,
          ...options,
        },
        this,
        'rules'
      );
    }
    // 保证父关系
    (validationRule as any).parentNode = this;
    (validationRule as any).parentKey = 'rules';
    if (!Array.isArray(this.rules)) this.rules = [];
    this.rules.splice(index, 0, validationRule);
    return validationRule;
  }

  /**
   * 插入验证规则
   * @param name 验证规则名称，如果不填会自动生成一个唯一名称
   */
  insertValidationRuleAt(name: string, index: number): ValidationRule;

  /**
   * 插入验证规则
   * @param validationRuleOptions 验证规则参数
   */
  insertValidationRuleAt(validationRuleOptions: Partial<ValidationRule>, index: number): ValidationRule;

  /**
   * 插入验证规则
   * @param validationRule 已有的验证规则实例
   */
  insertValidationRuleAt(validationRule: ValidationRule, index: number): ValidationRule;

  insertValidationRuleAt(options: string | Partial<ValidationRule> | ValidationRule, index: number) {
    const node = this._insertValidationRuleAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'rules',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加验证规则
   * @internal
   * @param name 验证规则名称，如果不填会自动生成一个唯一名称
   */
  _addValidationRule(name?: string): ValidationRule;

  /**
   * 添加验证规则
   * @internal
   * @param validationRuleOptions 验证规则参数
   */
  _addValidationRule(validationRuleOptions: Partial<ValidationRule>): ValidationRule;

  /**
   * 添加验证规则
   * @internal
   * @param validationRule 已有的验证规则实例
   */
  _addValidationRule(validationRule: ValidationRule): ValidationRule;

  _addValidationRule(options?: string | Partial<ValidationRule> | ValidationRule) {
    const index = this.rules.length;
    return this._insertValidationRuleAt(options as any, index);
  }

  /**
   * 添加验证规则
   * @param name 验证规则名称，如果不填会自动生成一个唯一名称
   */
  addValidationRule(name?: string): ValidationRule;

  /**
   * 添加验证规则
   * @param validationRuleOptions 验证规则参数
   */
  addValidationRule(validationRuleOptions: Partial<ValidationRule>): ValidationRule;

  /**
   * 添加验证规则
   * @param validationRule 已有的验证规则实例
   */
  addValidationRule(validationRule: ValidationRule): ValidationRule;

  addValidationRule(options?: string | Partial<ValidationRule> | ValidationRule) {
    const node = this._addValidationRule(options as any);
    const index = this.rules.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'rules',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除验证规则
   * @param calleeName 验证规则名称
   */
  removeValidationRule(calleeName: string): void;

  /**
   * 删除验证规则
   * @param validationRule 已有的验证规则实例
   */
  removeValidationRule(validationRule: ValidationRule): void;

  removeValidationRule(options: string | ValidationRule) {
    let validationRule: ValidationRule;
    if (typeof options === 'string') {
      validationRule = (this.rules || []).find((item) => item.calleeName === options);
      if (!validationRule) {
        throw new Error('找不到验证规则 ' + options);
      }
    } else {
      validationRule = options;
    }
    return validationRule.delete();
  }

  /**
   * 转换成 Vue 的模板格式
   */
  toVue(options?: any): string {
    let str = '';
    let { value } = this;

    if (this.type === 'dynamic' || (this.name === 'rules' && this.rules)) {
      if (this.name === 'rules' && this.rules) {
        const ruleStrs = this.rules.map((rule) => rule.toVue(options));
        value = `[${ruleStrs.join(' , ')}]`;
      } else if (['dataSource', 'data-source'].includes(this.name)) {
        // ⚠️：后续如果对接其他数据源 可以在这拓展翻译
        value = this.expression?.toVue(options) || '';
      } else {
        value = this.expression?.toVue(options) || '';
      }
    } else if (this.type === 'string') {
      let code = '';
      if (typeof value === 'string') {
        code = value;
      }
      value = code;
    }

    if (value !== undefined && value !== null && typeof value === 'string') {
      let replaceChar = '&quot;';
      // type是 static 的情况 整体是被解析成json对象的，不能被转换成html转义字符
      if (this.type === 'static') {
        replaceChar = "'";
      }
      value = value.replace(/"/g, replaceChar);
    }

    let { name } = this;

    if (value !== undefined && value !== null && value !== '') {
      if (this.type === 'string' && name !== 'rules') {
        str += `${name}="${value}"`;
      } else if (this.sync) {
        str += `:${name}.sync="${value}"`;
      } else if (name === 'rules') {
        str += `:${name}="${value}"`;
      } else if (name === 'hideField' && value) {
        // 字段省略做特殊翻译
        str += `style="display: none !important;"`;
      } else {
        str += `:${name}="${value}"`;
      }
    }
    return str;
  }
}

export default BindAttribute;
