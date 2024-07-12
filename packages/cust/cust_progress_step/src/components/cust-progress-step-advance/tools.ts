export function numberToPx(num) {
  return num + "px";
}
export function getStyle(name, value) {
  return { [name]: typeof value === "number" ? value + "px" : value };
}
function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

export function updateStatus(data, targetId) {
  let found = false;
  const copyData = deepCopy(data);

  function traverse(nodes) {
    for (let node of nodes) {
      if (Array.isArray(node)) {
        traverse(node);
      } else if (node.id) {
        node.status = 'complete';
        if (node.id === targetId) {
          node.status = 'pending';
          found = true;
          return;
        }
      }

      if (found) {
        return;
      }
    }
  }

  traverse(copyData);
  console.log(found ? copyData : data)
  return found ? copyData : data;
}