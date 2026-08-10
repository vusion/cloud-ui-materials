import { VNode } from 'vue';
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { isFunction, uniqueId } from 'lodash';
import { nextTick } from '@vue/composition-api';

function getThemeStyles(vnode: VNode) {
  if (!vnode || !vnode.data || !vnode.data.staticStyle) {
    return {};
  }

  const style = {};
  Object.keys(vnode.data.staticStyle).forEach((key) => {
    if (key.startsWith('--')) {
      style[key] = vnode.data.staticStyle[key];
    }
  });

  return style;
}

function getOverlayClassName(vnode: VNode, overlayClassName?: any) {
  let className = overlayClassName ?? [];

  if (!Array.isArray(className)) {
    className = [className];
  }

  const rawClass = [
    ...(Array.isArray(vnode.data?.class) ? vnode.data.class : [vnode.data?.class]),
    vnode.data?.staticClass,
  ].filter(Boolean).join(' ');
  const cssRuleClassName = rawClass.split(' ').find((name) => /^cw-css-rule-?/.test(name)) || '';

  if (cssRuleClassName) {
    className.push(cssRuleClassName);
  }

  return className;
}

export const usePopupTheme: NaslComponentPluginOptions = {
  setup(props, ctx) {
    const themeStyle = getThemeStyles(isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode);
    const tempOverlayClassName = ctx.isDesigner ? uniqueId('cw-ide-style-pp-') : '';

    return {
      popupProps: props.useComputed('popupProps', (popupProps = {}) => {
        const overlayClassName = getOverlayClassName(
          isFunction(ctx.getVNode) ? ctx.getVNode() : ctx.setupContext.parent.$vnode,
          popupProps.overlayClassName,
        );

        if (ctx.isDesigner && tempOverlayClassName) {
          overlayClassName.push(tempOverlayClassName);
        }

        return {
          ...popupProps,
          overlayStyle: {
            ...(popupProps.overlayStyle ?? {}),
            ...themeStyle,
          },
          overlayClassName,
          onVisibleChange: ctx.isDesigner ? (visible, context) => {
            popupProps.onVisibleChange?.(visible, context);
            if (visible) {
              nextTick(() => {
                const nodePath = ctx.setupContext.attrs['data-nodepath'] as string;
                document.querySelector(`.${tempOverlayClassName}`)?.setAttribute('data-nodepath', nodePath);
              });
            }
          } : popupProps.onVisibleChange,
        };
      }),
    };
  },
  order: 10,
};
