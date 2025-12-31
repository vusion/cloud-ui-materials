import LogicItem from './LogicItem';
import { concept, property } from '../decorators';
import Argument from './Argument';
import StringLiteral from './StringLiteral';
import NumericLiteral from './NumericLiteral';
import BooleanLiteral from './BooleanLiteral';
import { defaultErrorMessage } from '../asset';

type LiteralNode = StringLiteral | NumericLiteral | BooleanLiteral;

@concept('验证规则')
export class ValidationRule extends LogicItem {
  static readonly ConceptName = 'ValidationRule';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<ValidationRule>) {
    source = Object.assign({}, ValidationRule.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): ValidationRule {
    return super.from(source, parentNode, parentKey) as any;
  }
  
  /**
   * 命名空间
   */
  @property()
  calleeNamespace?: string;

  /**
   * 验证器名称
   */
  @property()
  calleeName: string = '';

  /**
   * 参数列表
   */
  @property({ objectRef: 'Argument', isArray: true })
  arguments: Argument[] = [];

  /**
   * 自定义错误信息
   */
  @property({ objectRef: 'StringLiteral|NumericLiteral|BooleanLiteral' })
  errorMessage?: LiteralNode;

  /**
   * 是否启用服务端校验
   */
  @property()
  enableServerValidation?: boolean = true;

  toVue(options?: any): string {
    let code = '{';
    // 兼容就得简写模式
    if (this.calleeName && this.calleeName.includes('(')) {
      return `'${this.calleeName}'`;
    } else if (this.calleeName === 'unique') {
      code += `validate: 'excluded',`;
    } else if (this.calleeName === 'confirmed') {
      code += `validate: 'is',`;
    } else if (this.calleeName === 'object') {
      code += `validate: 'plainObject',`;
    } else {
      code += `validate: '${this.calleeName}',`;
    }
    if (this.arguments.length) {
      let args = '[';
      this.arguments?.forEach((arg, index) => {
        args += arg?.toVue(options);
        if (index !== this.arguments?.length - 1) args += ', ';
      });
      args += ']';
      code += `args: ${args} ,`;
    }
    if (this.errorMessage && this.errorMessage?.value) {
      code += `message: '${String(this.errorMessage.value)}',`;
    } else {
      let defaultError = (defaultErrorMessage as Record<string, string>)[this.calleeName];
      let index = 0;
      while (defaultError && defaultError.indexOf(`{args}`) !== -1) {
        defaultError = defaultError.replace(`{args}`, `\${${this.arguments[index]?.toVue(options)}}`);
        index++;
      }
      const itemTitle = (this?.parentNode as any)?.parentNode?.bindAttrs?.find((item: BindAttribute) => item.name === 'label');
      let labelName;
      if (itemTitle?.expression?.toVue()) {
        labelName = `\${${itemTitle?.expression?.toVue()}}`;
      } else {
        labelName = itemTitle?.value || '表单项';
      }
      defaultError = defaultError && defaultError.replace(`{label}`, labelName);
      if (this.frontend?.i18nInfo?.enabled || options?.frontendI18nEnabled) {
        defaultError = '$' + `{$t('${this.i18nKeyPrefix}${this.calleeName}')}`;
      }
      code += `message: \`${defaultError}\`,`;
    }
    code += `trigger: 'input+blur'`;
    if (['required', 'filled', 'notEmpty'].includes(this.calleeName)) {
      code += ',required: true';
    }
    code += '}';
    return code;
  }
}

export default ValidationRule;
