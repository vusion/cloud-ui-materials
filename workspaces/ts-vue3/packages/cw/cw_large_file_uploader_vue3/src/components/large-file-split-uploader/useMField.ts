import { getCurrentInstance, onMounted, onUnmounted } from 'vue';

type ParentCondition = (parent: {
  $options: { name?: string; isField?: boolean; isValidator?: boolean };
}) => boolean;

function walkParents(
  condition: ParentCondition,
  callback: (parent: NonNullable<ReturnType<typeof getCurrentInstance>>['parent']) => void,
) {
  const instance = getCurrentInstance();
  let parent = instance?.parent;
  while (parent) {
    const options = parent.type as { name?: string; isField?: boolean; isValidator?: boolean };
    const proxy = parent.proxy as Record<string, unknown> | null;
    const parentLike = {
      $options: {
        name: options?.name,
        isField: options?.isField,
        isValidator: options?.isValidator,
      },
      ...proxy,
    };
    if (condition(parentLike as Parameters<ParentCondition>[0])) {
      callback(parent);
      return;
    }
    parent = parent.parent;
  }
}

const formItemCondition: ParentCondition = ($parent) =>
  Boolean(
    ($parent.$options.name && $parent.$options.name.startsWith('u-form-item')) ||
      $parent.$options.isField ||
      $parent.$options.isValidator,
  );

export function useMField() {
  const instance = getCurrentInstance();

  onMounted(() => {
    walkParents(formItemCondition, (parent) => {
      parent.emit('add-field-vm', instance?.proxy);
    });
  });

  onUnmounted(() => {
    walkParents(formItemCondition, (parent) => {
      parent.emit('remove-field-vm', instance?.proxy);
    });
  });

  function forwardToValidator(eventName: string, ...args: unknown[]) {
    walkParents(formItemCondition, (parent) => {
      parent.emit(eventName, ...args);
    });
  }

  return { forwardToValidator };
}
