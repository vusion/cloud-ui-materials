import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
} from './utils';
import { genQueryLogic } from './genCommonBlock';

function genSelectTemplate(entity: naslTypes.Entity, nameGroup: NameGroup) {
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
  const property = getFirstDisplayedProperty(entity);
  const label = property.label || property.name;
  return `<VanPickerson
      type="list"
      showToolbar={true}
      title="请选择"
      placeholder="请选择"
      ref="${nameGroup.viewElementMainView}"
      dataSource={${dataSourceValue}}
      textField="${nameGroup.lowerEntity}.${property.name}"
      valueField="${nameGroup.lowerEntity}.${getEntityPromaryKeyProperty(entity)}"
      pageable={true}
      pageSize={50}
      remotePaging={true}
      slotTitle={
        <VanText text="${label}"></VanText>
      }
      slot-pannel-title={
        <VanText text="请选择"></VanText>
      }
      slot-picker-top={
        <>
          <VanPickerActionSlot targetMethod="cancel">
            <VanIconv name="left-arrow" icotype="only"></VanIconv>
          </VanPickerActionSlot>
          <VanPickerActionSlot targetMethod="confirm">
          </VanPickerActionSlot>
        </>
      }
      slot-picker-bottom={
        <>
          <VanPickerActionSlot targetMethod="cancel">
            <VanButton
              type="info_secondary"
              size="normal"
              text="取消"
              squareroud="round"
            ></VanButton>
          </VanPickerActionSlot>
          <VanPickerActionSlot targetMethod="confirm">
            <VanButton
              type="info"
              size="normal"
              text="确认"
              squareroud="round"
            ></VanButton>
          </VanPickerActionSlot>
        </>
      }>
    </VanPickerson>`;
}

export function genSelectBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  const viewElementMainView = likeComponent.getViewElementUniqueName('select');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView, false);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.lowerEntity = firstLowerCase(entity.name);

  const allEntities = [entity];

  return `export function view() {
    return ${genSelectTemplate(entity, nameGroup)}
  }
        export namespace app.logics {
            ${genQueryLogic(allEntities, nameGroup, false, false)}
        }`;
}
