export function px2mm(px, dpi) {
  let radio = 4;
  if (px == null) return 0;
  dpi = dpi || printParams.dpi;
  const ret = parseFloat(`${(px * 254) / (dpi * 10)}`);
  radio = 10 ** radio;
  return Math.ceil(Math.floor(ret * radio) / radio);
}


const getDeviceDPI = () => {
  return (window.devicePixelRatio * 2 || 2) * 72;
};

export function mmToPx(mm, dpi = getDeviceDPI()) {
  return Math.ceil(mm * 2.83);
}

export function mmToPt(mm) {
  return mm / 25.4 * 72;
}

export function pxToPt(px) {
  return px * 72 / 96;
}
