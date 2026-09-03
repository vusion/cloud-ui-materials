/**
 * 扩展包会把 lcap-ui 的 withInstall 打进产物。
 * withInstall(comp, VueCompositionAPI) 在模块求值时会执行 Vue.use(CompositionAPI)，
 * 若宿主应用此时尚未用「同一份 Vue」完成安装，会污染全局 composition-api 上下文
 * （inject / getCurrentInstance 失效，进而出现 reading '$env' 报错）。
 *
 * 宿主 / Storybook 应自行 Vue.use(CompositionAPI) 或 Vue.use(LcapUI)，
 * 扩展包不应在加载时抢先安装。
 */
export function stripWithInstallVueUse() {
  const REPLACED = '/* youtian_ele_select_tree: skip Vue.use(CompositionAPI) at module load */';

  return {
    name: 'youtian-strip-withinstall-vue-use',
    enforce: 'pre',
    transform(code, id) {
      if (!code) {
        return null;
      }

      const normalizedId = id.replace(/\\/g, '/');
      let next = code;
      let changed = false;

      // 1) 去掉 withInstall 里的 Vue.use(CompositionAPI)
      if (code.includes('_installedPlugins')) {
        const fromLcapUi =
          normalizedId.includes('/lcap-ui/') ||
          normalizedId.includes('withInstall') ||
          normalizedId.includes('with-install') ||
          normalizedId.includes('virtual-lcap:lcap-ui') ||
          normalizedId.includes('/_chunks/') ||
          /function withInstall/.test(code);

        if (fromLcapUi) {
          const afterBlock = next.replace(
            /if\s*\(\s*dep\s*&&\s*Vue\s*&&\s*\(\s*Vue\._installedPlugins\s*\|\|\s*\[\s*\]\s*\)\s*\.indexOf\(\s*dep\s*\)\s*===\s*-1\s*\)\s*\{\s*Vue\.use\(\s*dep\s*\)\s*;\s*\}/g,
            REPLACED,
          );
          const afterMin = afterBlock.replace(
            /([a-zA-Z_$][\w$]*)\s*&&\s*([a-zA-Z_$][\w$]*)\s*&&\s*\(\s*\2\._installedPlugins\s*\|\|\s*\[\s*\]\s*\)\s*\.indexOf\(\s*\1\s*\)\s*===\s*-1\s*&&\s*\2\.use\(\s*\1\s*\)/g,
            REPLACED,
          );
          if (afterMin !== next) {
            next = afterMin;
            changed = true;
          }
        }
      }

      // 2) HOC 内 vueInstance 可能为空，给 $env 访问加空值保护（防御性）
      // 源码： (vueInstance.$env && vueInstance.$env.VUE_APP_DESIGNER)
      // 压缩： _.$env&&_.$env.VUE_APP_DESIGNER
      if (next.includes('.$env') && next.includes('VUE_APP_DESIGNER')) {
        const safeSrc = next.replace(
          /\(vueInstance\.\$env\s*&&\s*vueInstance\.\$env\.VUE_APP_DESIGNER\)/g,
          '(vueInstance && vueInstance.$env && vueInstance.$env.VUE_APP_DESIGNER)',
        );
        const safeMin = safeSrc.replace(
          /\|\|\s*([a-zA-Z_$][\w$]*)\.\$env\s*&&\s*\1\.\$env\.VUE_APP_DESIGNER/g,
          '||($1&&$1.$env&&$1.$env.VUE_APP_DESIGNER)',
        );
        if (safeMin !== next) {
          next = safeMin;
          changed = true;
        }
      }

      if (!changed) {
        return null;
      }

      return { code: next, map: null };
    },
  };
}
