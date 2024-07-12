
export default function useStepItemInfo(props, parallelNodesLen, reactHeight) {
  let flexBasis = 0;

  // 存在并行节点
  if (parallelNodesLen) {
    flexBasis = props.stepWidth * parallelNodesLen + (parallelNodesLen - 1) * props.space;
  } else {
    flexBasis = props.stepWidth;
  }

  const rectTop = reactHeight * 0.5;

  return {
    flexBasis,
    rectTop: -rectTop,
    rectBot: -rectTop + 34
  };
}
