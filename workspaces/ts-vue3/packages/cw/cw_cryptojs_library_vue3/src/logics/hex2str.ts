export function hex2str(hex: string): string {
  if (!hex) {
    return '';
  }
  const trimedStr = hex.trim();
  const rawStr =
    trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
  const len = rawStr.length;
  if (len % 2 !== 0) {
    alert('非法格式的ASCII代码!');
    return '';
  }
  const resultStr: string[] = [];
  for (let i = 0; i < len; i = i + 2) {
    const curCharCode = parseInt(rawStr.substr(i, 2), 16);
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join('');
}
