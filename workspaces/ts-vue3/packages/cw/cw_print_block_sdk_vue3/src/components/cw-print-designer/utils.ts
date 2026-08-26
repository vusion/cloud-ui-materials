export function px2mm(px: number | null | undefined, dpi?: number) {
  let radio = 4;
  if (px == null) return 0;
  dpi = dpi || 96;
  const ret = parseFloat(`${(px * 254) / (dpi * 10)}`);
  radio = 10 ** radio;
  return Math.ceil(Math.floor(ret * radio) / radio);
}

const getDeviceDPI = () => {
  return (window.devicePixelRatio * 2 || 2) * 72;
};

export function mmToPx(mm: number, dpi = getDeviceDPI()) {
  return Math.ceil(mm * 2.83);
}

export function mmToPt(mm: number, _dpi?: number) {
  return (mm / 25.4) * 72;
}

export function pxToPt(px: number) {
  return (px * 72) / 96;
}
