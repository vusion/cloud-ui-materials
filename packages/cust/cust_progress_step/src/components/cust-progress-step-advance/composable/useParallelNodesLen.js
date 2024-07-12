export default function useParallelNodesLen(data, callBack) {
  let count = 0;
  let flag = false;

  function getLen(nodes) {
    nodes.forEach((node) => {
      if (Array.isArray(node)) {
        count += Math.max(node[0].length, node[1].length);
        getLen(node[0]);
        if (flag && callBack) {
           callBack();
        }
        flag = true;
      }
    });
  }

  getLen(data);
  return count;
}
