import { createUUID } from './index';
import { getFormNode } from '@/components/cw-form-designer/utils';
import { setAttrValue } from '@/components/cw-form-designer/components/property-panel/fields';

// 生成主表单实体名称
export function genFormEntityName() {
  const random6 = createUUID().substring(0, 8);
  return `Form_${random6}`;
}

export function getFormEntityName(view) {
  return view.entities.find((entity) => entity.origin === 'form')?.name;
}

// 生成子表单实体名称前缀
export function genSubFormEntityName(formEntityName) {
  return `${formEntityName}_sub_form_info`;
}

// 生成 script 中 initData 的默认结构
export function getEntityStructure(view) {
  const { entities, variables } = view;
  const entityMap = {};
  entities.forEach((entity) => {
    const propertyIndent = '          ';
    const props = entity.properties.map((property) => `${propertyIndent}'${property.name}': undefined,`).join('\n');
    entityMap[entity.name] = `() => ({\n${props}\n        })`;
  });
  const res = {};
  variables.forEach((variable) => {
    if (variable?.typeAnnotation?.typeName === 'List') {
      res[variable.name] = '() => []';
    } else if (variable?.typeAnnotation?.typeKind === 'reference') {
      const referEntityName = variable.typeAnnotation.typeName;
      if (entityMap[referEntityName]) {
        res[variable.name] = entityMap[referEntityName];
      }
    }
  });
  return res;
}

// 初始化页面实体
export function initViewEntity(view) {
  // 如果页面没有绑定entity，则生成一个主表单的entity和variable
  if (view.entities.length === 0) {
    const formEntityName = genFormEntityName();
    addEntityWithBasicProperties({
      view,
      entityName: formEntityName,
      origin: 'form',
      description: '主表单实体',
    });
    view.addVariable({
      name: formEntityName,
      typeAnnotation: {
        typeKind: 'reference',
        typeNamespace: 'entities',
        typeName: formEntityName,
      },
    });
    const formNode = getFormNode(view);
    if (!formNode) return;
    setAttrValue({ node: formNode, key: 'bindEntity', value: formEntityName });
    return view;
  }
}

export function genSequence(prefix) {
  return `${prefix}${Math.random().toString().slice(2, 12)}`;
}

// 添加实体，带有基础表结构
export function addEntityWithBasicProperties({ view, entityName, origin = 'form', description = '', sequencePrefix }) {
  return view.addEntity({
    concept: 'Entity',
    name: entityName,
    tableName: entityName,
    description,
    origin,
    properties: [
      {
        concept: 'EntityProperty',
        name: 'id',
        columnName: 'id',
        label: '主键',
        description: '主键',
        required: true,
        primaryKey: true,
        sequence: genSequence(sequencePrefix || entityName),
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeNamespace: 'nasl.core',
          typeName: 'Long',
        },
      },
      {
        concept: 'EntityProperty',
        name: 'createdTime',
        columnName: 'created_time',
        label: '创建时间',
        description: '创建时间',
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeNamespace: 'nasl.core',
          typeName: 'DateTime',
        },
      },
      {
        concept: 'EntityProperty',
        name: 'updatedTime',
        columnName: 'updated_time',
        label: '更新时间',
        description: '更新时间',
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeNamespace: 'nasl.core',
          typeName: 'DateTime',
        },
      },
      {
        concept: 'EntityProperty',
        name: 'createdBy',
        columnName: 'created_by',
        label: '创建者',
        description: '创建者',
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeNamespace: 'nasl.core',
          typeName: 'String',
        },
      },
      {
        concept: 'EntityProperty',
        name: 'updatedBy',
        columnName: 'updated_by',
        label: '更新者',
        description: '更新者',
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'primitive',
          typeNamespace: 'nasl.core',
          typeName: 'String',
        },
      },
    ],
  });
}

// 更新主键序列
export function updatePrimaryKeySequence(entity, sequencePrefix) {
  const primaryKeyProperty = entity.properties.find((property) => property.primaryKey);
  if (primaryKeyProperty) {
    primaryKeyProperty.update({
      sequence: genSequence(sequencePrefix),
    });
  }
}
