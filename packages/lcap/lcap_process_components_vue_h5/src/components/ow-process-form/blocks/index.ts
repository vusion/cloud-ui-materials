import * as naslTypes from '@nasl/ast-mini';

// 生成流程表单
export function genOwProcessForm(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;  

  return; // 不返回任何内容，在IDE中将不进行JSX2Nasl的转换，只执行上面的代码
}