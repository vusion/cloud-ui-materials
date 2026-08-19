/** Excel 选区 overlay DOM 几何计算 */

export function resolveExcelSelectionOverlayTableWrap(tableRender, position = 'static') {
  if (!tableRender) return null;
  const metaList = tableRender.tableMetaList || [];
  let index = metaList.findIndex((m) => m.position === position);
  if (index < 0) index = 0;
  const wraps = [].concat(tableRender.$refs.tablewrap || []);
  const wrap = wraps[index] || wraps[0];
  if (!wrap) return null;
  return { container: wrap, position: (metaList[index] && metaList[index].position) || position };
}

/** 将绝对 unionRect 转为相对于 container 的 overlay 样式，裁剪到可见区域 */
export function unionRectToExcelOverlayStyle(unionRect, tableWrapEl) {
  if (!tableWrapEl || !unionRect || unionRect.width <= 0 || unionRect.height <= 0) return null;
  const cr = tableWrapEl.getBoundingClientRect();
  const cw = tableWrapEl.clientWidth;
  const ch = tableWrapEl.clientHeight;

  let top = unionRect.top - cr.top - tableWrapEl.clientTop;
  let left = unionRect.left - cr.left - tableWrapEl.clientLeft;
  let width = unionRect.width;
  let height = unionRect.height;

  if (left < 0) { width += left; left = 0; }
  if (top < 0) { height += top; top = 0; }
  if (left + width > cw) width = cw - left;
  if (top + height > ch) height = ch - top;
  if (width <= 0 || height <= 0) return null;

  return { top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` };
}

function mergeRects(a, b) {
  const top = Math.min(a.top, b.top);
  const left = Math.min(a.left, b.left);
  const right = Math.max(a.right, b.right);
  const bottom = Math.max(a.bottom, b.bottom);
  return { top, left, right, bottom, width: right - left, height: bottom - top };
}

function getCellsUnionRect(el, bounds) {
  if (!el || !bounds) return null;
  const { minRow, maxRow, minCol, maxCol } = bounds;
  const cells = el.querySelectorAll('td[data-excel-row][data-excel-col]');
  let t = Infinity, l = Infinity, r = -Infinity, b = -Infinity, count = 0;

  cells.forEach((td) => {
    const row = Number(td.getAttribute('data-excel-row'));
    const col = Number(td.getAttribute('data-excel-col'));
    if (Number.isNaN(row) || Number.isNaN(col)) return;
    if (row < minRow || row > maxRow || col < minCol || col > maxCol) return;
    const rect = td.getBoundingClientRect();
    if (rect.width <= 0 && rect.height <= 0) return;
    count++;
    t = Math.min(t, rect.top);
    l = Math.min(l, rect.left);
    r = Math.max(r, rect.right);
    b = Math.max(b, rect.bottom);
  });

  if (!count) return null;
  return { top: t, left: l, right: r, bottom: b, width: r - l, height: b - t };
}

/** 计算选区 overlay 样式：根据 bounds 和 mode 聚合 DOM rect */
export function computeExcelOverlayStyleFromBounds(tableWrapEl, bounds, mode) {
  if (!tableWrapEl || !bounds) return null;

  const bodyRect = getCellsUnionRect(tableWrapEl, bounds);

  // 列选模式：合并表头 th
  if (mode === 'column') {
    const th = tableWrapEl.querySelector(`th[data-excel-col="${bounds.minCol}"]`);
    const thRect = th && th.getBoundingClientRect();
    if (thRect && thRect.width > 0) {
      const union = bodyRect ? mergeRects(thRect, bodyRect) : thRect;
      return unionRectToExcelOverlayStyle(union, tableWrapEl);
    }
  }

  if (bodyRect) {
    const style = unionRectToExcelOverlayStyle(bodyRect, tableWrapEl);
    if (style) return style;
  }

  // Fallback：仅用四角单元格
  const tl = tableWrapEl.querySelector(`td[data-excel-row="${bounds.minRow}"][data-excel-col="${bounds.minCol}"]`);
  const br = tableWrapEl.querySelector(`td[data-excel-row="${bounds.maxRow}"][data-excel-col="${bounds.maxCol}"]`);
  if (!tl || !br) return null;
  const tlR = tl.getBoundingClientRect();
  const brR = br.getBoundingClientRect();
  return unionRectToExcelOverlayStyle(mergeRects(tlR, brR), tableWrapEl);
}
