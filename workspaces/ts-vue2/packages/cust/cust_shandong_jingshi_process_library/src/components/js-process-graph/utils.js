export const DIRECTION = {
  RIGHT: 0,
  BOTTOM: 1,
  LEFT: 2,
  TOP: 3
};
export function Waypoint_to_DIR(p) {
  if (!p) {
    return undefined;
  }
  const {
    x,
    y
  } = p;
  if (x === 1) {
    return DIRECTION.RIGHT;
  }
  if (x === -1) {
    return DIRECTION.LEFT;
  }
  if (y === 1) {
    return DIRECTION.BOTTOM;
  }
  if (y === -1) {
    return DIRECTION.TOP;
  }
}

/**
 * 从流程 AST 元素解析泳道分组标题（供布局与泳道框使用）。
 * 唯一数据源：`extensionBindAttributes` 为数组，且其中存在一项同时满足
 * `name === 'groupTitle'`、`type === 'string'`、`value` 经 trim 后非空。
 * 不满足则返回空字符串（无泳道标题）。
 */
export function resolveElementGroupTitle(element) {
  if (!element || typeof element !== 'object') {
    return '';
  }
  const list = element.extensionBindAttributes;
  if (!Array.isArray(list)) {
    return '';
  }
  const attr = list.find(
    (a) =>
      a &&
      a.name === 'groupTitle' &&
      a.type === 'string' &&
      a.value != null &&
      String(a.value).trim() !== '',
  );
  return attr ? String(attr.value).trim() : '';
}

// import StartNewIcon from './assets/Start-new.svg';
// import EndNewIcon from './assets/End-new.svg';
// import TodoIcon from './assets/todo.svg';
// import SolvingIcon from './assets/solving.svg';
// import ResolvedIcon from './assets/resolved.svg';
// import InclusiveGateway from './assets/InclusiveGateway.svg';
// import ExclusiveGateway from './assets/ExclusiveGateway.svg';
// import ParallelGateway from './assets/ParallelGateway.svg';

// function makeImage(icon) {
//     const p = new Image();
//     p.crossOrigin = '';
//     p.src = icon;
//     return p;
// }

// export const LogicIconMap = {
//     StartNewIcon: makeImage(StartNewIcon),
//     EndNewIcon: makeImage(EndNewIcon),
//     TodoIcon: makeImage(TodoIcon),
//     SolvingIcon: makeImage(SolvingIcon),
//     ResolvedIcon: makeImage(ResolvedIcon),
//     InclusiveGateway: makeImage(InclusiveGateway),
//     ExclusiveGateway: makeImage(ExclusiveGateway),
//     ParallelGateway: makeImage(ParallelGateway),
// }