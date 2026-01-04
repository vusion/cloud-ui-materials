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