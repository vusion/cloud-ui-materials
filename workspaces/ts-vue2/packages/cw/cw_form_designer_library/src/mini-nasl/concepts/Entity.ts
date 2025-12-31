import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import { getConceptConstructor } from '../decorators/utils';
import { createUUID, genUniqueName } from '../utils';
import EntityProperty from './EntityProperty';

/**
 * 实体
 */
@concept('实体')
export class Entity extends BaseNode {
  static readonly ConceptName = 'Entity';

  constructor(source?: Partial<Entity>) {
    source = Object.assign({}, Entity.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): Entity {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 实体名称
   */
  @property()
  name: string = '';

  /**
   * 唯一标识
   */
  @property()
  uuid: string = createUUID();

  /**
   * 数据库表名
   */
  @property()
  tableName: string = '';

  /**
   * 实体描述
   */
  @property()
  description?: string;

  /**
   * 实体来源
   */
  @property()
  origin: 'form' | 'sub-form' = 'form'; // 跟原仓库不一致，做了魔改

  /**
   * 实体属性列表
   */
  @property({ objectRef: 'EntityProperty', isArray: true })
  properties: EntityProperty[] = [];

  /**
   * 获取已存在的属性名称
   * @param excludedList 排除的属性列表
   */
  getPropertyExistingNames(excludedList: Array<EntityProperty> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.properties || [])
      .filter((item) => !excludedSet.has(item) && item.name)
      .map((item) => item.name);
  }

  /**
   * 获取唯一的属性名称
   * @param name 基础名称，默认为 'property1'
   */
  getPropertyUniqueName(name: string = 'property1'): string {
    const existingNames = new Set(this.getPropertyExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入实体属性
   * @internal
   * @param name 实体属性名称，如果不填会自动生成一个唯一名称
   */
  _insertPropertyAt(name: string, index: number): EntityProperty;

  /**
   * 插入实体属性
   * @internal
   * @param propertyOptions 实体属性参数
   */
  _insertPropertyAt(propertyOptions: Partial<EntityProperty>, index: number): EntityProperty;

  /**
   * 插入实体属性
   * @internal
   * @param property 已有的实体属性实例
   */
  _insertPropertyAt(property: EntityProperty, index: number): EntityProperty;

  _insertPropertyAt(options: string | Partial<EntityProperty> | EntityProperty, index: number) {
    const propertyOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'properties' };
    const EntityProperty = getConceptConstructor('EntityProperty');
    let property: EntityProperty;
    if (!options) {
      property = EntityProperty.from(
        {
          ...propertyOptions,
          name: this.getPropertyUniqueName(),
        },
        this,
        'properties'
      );
    } else if (typeof options === 'string') {
      // 如果传入字符串，使用该字符串作为基础名称生成唯一名称
      const uniqueName = options
        ? this.getPropertyUniqueName(options)
        : this.getPropertyUniqueName();
      property = EntityProperty.from(
        {
          ...propertyOptions,
          name: uniqueName,
        },
        this,
        'properties'
      );
    } else if (options instanceof EntityProperty) {
      property = options as EntityProperty;
      // 迁移关系
      if ((property as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (property as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(property as any, relationOptions);
    } else {
      // 如果传入 Partial<EntityProperty>，需要确保名称唯一
      const optionsWithName = options as Partial<EntityProperty>;
      let finalName = optionsWithName.name;
      if (finalName) {
        // 如果提供了名称，确保名称唯一
        finalName = this.getPropertyUniqueName(finalName);
      } else {
        // 如果没有提供名称，自动生成一个唯一名称
        finalName = this.getPropertyUniqueName();
      }
      property = EntityProperty.from(
        {
          ...propertyOptions,
          ...options,
          name: finalName,
        },
        this,
        'properties'
      );
    }
    // 保证父关系
    (property as any).parentNode = this;
    (property as any).parentKey = 'properties';
    if (!Array.isArray(this.properties)) this.properties = [];
    this.properties.splice(index, 0, property);
    return property;
  }

  /**
   * 插入实体属性
   * @param name 实体属性名称，如果不填会自动生成一个唯一名称
   */
  insertPropertyAt(name: string, index: number): EntityProperty;

  /**
   * 插入实体属性
   * @param propertyOptions 实体属性参数
   */
  insertPropertyAt(propertyOptions: Partial<EntityProperty>, index: number): EntityProperty;

  /**
   * 插入实体属性
   * @param property 已有的实体属性实例
   */
  insertPropertyAt(property: EntityProperty, index: number): EntityProperty;

  insertPropertyAt(options: string | Partial<EntityProperty> | EntityProperty, index: number) {
    const node = this._insertPropertyAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'properties',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加实体属性
   * @internal
   * @param name 实体属性名称，如果不填会自动生成一个唯一名称
   */
  _addProperty(name?: string): EntityProperty;

  /**
   * 添加实体属性
   * @internal
   * @param propertyOptions 实体属性参数
   */
  _addProperty(propertyOptions: Partial<EntityProperty>): EntityProperty;

  /**
   * 添加实体属性
   * @internal
   * @param property 已有的实体属性实例
   */
  _addProperty(property: EntityProperty): EntityProperty;

  _addProperty(options?: string | Partial<EntityProperty> | EntityProperty) {
    const index = this.properties.length;
    return this._insertPropertyAt(options as any, index);
  }

  /**
   * 添加实体属性
   * @param name 实体属性名称，如果不填会自动生成一个唯一名称
   */
  addProperty(name?: string): EntityProperty;

  /**
   * 添加实体属性
   * @param propertyOptions 实体属性参数
   */
  addProperty(propertyOptions: Partial<EntityProperty>): EntityProperty;

  /**
   * 添加实体属性
   * @param property 已有的实体属性实例
   */
  addProperty(property: EntityProperty): EntityProperty;

  addProperty(options?: string | Partial<EntityProperty> | EntityProperty) {
    const node = this._addProperty(options as any);
    const index = this.properties.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'properties',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除实体属性
   * @param name 实体属性名称
   */
  removeProperty(name: string): void;

  /**
   * 删除实体属性
   * @param property 已有的实体属性实例
   */
  removeProperty(property: EntityProperty): void;

  removeProperty(options: string | EntityProperty) {
    let property: EntityProperty;
    if (typeof options === 'string') {
      property = (this.properties || []).find((item) => item.name === options);
      if (!property) {
        throw new Error('找不到实体属性 ' + options);
      }
    } else {
      property = options;
    }
    const index = this.properties.indexOf(property);
    if (index > -1) {
      this.properties.splice(index, 1);
      this.emit('delete', {
        action: 'delete',
        parentNode: this,
        parentKey: 'properties',
        index,
        object: property,
        target: property,
      });
    }
  }

  /**
   * 通过名称获取属性
   */
  getPropertyByName(name: string) {
    if (!name || !this.properties || !this.properties.length) return null;
    return this.properties.find((item) => item.name === name);
  }

  /**
   * 设置实体描述
   */
  setDescription(description: string) {
    this.update({
      description,
    });
  }

  /**
   * 设置实体名称
   */
  setName(name: string) {
    this.update({
      name,
    });
  }

  /**
   * 设置数据库表名
   */
  setTableName(tableName: string) {
    this.update({
      tableName,
    });
  }

  /**
   * 获取已存在的列名
   * @param excludedList 排除的属性列表
   */
  getPropertyExistingColumnNames(excludedList: Array<EntityProperty> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.properties || [])
      .filter((item) => !excludedSet.has(item) && item.columnName)
      .map((item) => item.columnName);
  }

  /**
   * 获取唯一的列名
   * @param name 基础名称，默认为 'property1'
   * @param excludedList 排除的属性列表
   */
  getPropertyUniqueColumnName(
    name: string = 'property1',
    excludedList: Array<EntityProperty> = []
  ): string {
    const existingNames = new Set(this.getPropertyExistingColumnNames(excludedList));
    return genUniqueName(name, existingNames, undefined, false);
  }

  /**
   * 获取添加时的默认选项
   */
  static getDefaultOptions(): any {
    return {
      name: '',
      tableName: '',
      origin: 'form',
    };
  }
}

export default Entity;
