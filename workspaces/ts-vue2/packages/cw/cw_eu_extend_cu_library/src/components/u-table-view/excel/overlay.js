/**
 * Excel 选区框 DOM 几何：tablewrap 解析、th/td 包围盒合并、overlay 样式（纯逻辑，依赖 DOM API）。
 */

function mergeUnionRect(acc, rect) {
  if (!rect || (rect.width <= 0 && rect.height <= 0)) {
    return acc;
  }
  if (!acc) {
    return {
      top: rect.top,
      left: rect.left,
      right: rect.right != null ? rect.right : rect.left + rect.width,
      bottom: rect.bottom != null ? rect.bottom : rect.top + rect.height,
    };
  }
  return {
    top: Math.min(acc.top, rect.top),
    left: Math.min(acc.left, rect.left),
    right: Math.max(acc.right, rect.right != null ? rect.right : rect.left + rect.width),
    bottom: Math.max(acc.bottom, rect.bottom != null ? rect.bottom : rect.top + rect.height),
  };
}

function finalizeUnionRect(acc) {
  if (!acc) {
    return null;
  }
  return {
    top: acc.top,
    left: acc.left,
    width: Math.max(acc.right - acc.left, 0),
    height: Math.max(acc.bottom - acc.top, 0),
    right: acc.right,
    bottom: acc.bottom,
  };
}

export function resolveExcelSelectionOverlayTableWrap(tableRender, position = 'static') {
  if (!tableRender) {
    return null;
  }
  const metaList = tableRender.tableMetaList || [];
  let index = metaList.findIndex((meta) => meta.position === position);
  if (index < 0) {
    index = 0;
  }
  const wraps = [].concat(tableRender.$refs.tablewrap || []);
  const wrap = wraps[index] || wraps[0];
  if (!wrap) {
    return null;
  }
  return {
    container: wrap,
    position: (metaList[index] && metaList[index].position) || position,
  };
}

export function unionRectToExcelOverlayStyle(unionRect, tableWrapEl) {
  if (!tableWrapEl || !unionRect || unionRect.width <= 0 || unionRect.height <= 0) {
    return null;
  }
  const containerRect = tableWrapEl.getBoundingClientRect();
  const scrollLeft = tableWrapEl.scrollLeft || 0;
  const top = unionRect.top - containerRect.top;
  const left = unionRect.left - containerRect.left + scrollLeft;

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${unionRect.width}px`,
    height: `${unionRect.height}px`,
  };
}

function unionExcelHeadRectsInBounds(tableWrapEl, minCol, maxCol) {
  if (!tableWrapEl) {
    return null;
  }
  let acc = null;
  let count = 0;
  for (let col = minCol; col <= maxCol; col += 1) {
    const th = tableWrapEl.querySelector(`th[data-excel-col="${col}"]`);
    if (!th) {
      continue;
    }
    const rect = th.getBoundingClientRect();
    if (rect.width <= 0 && rect.height <= 0) {
      continue;
    }
    count += 1;
    acc = mergeUnionRect(acc, rect);
  }
  if (count === 0) {
    return null;
  }
  return finalizeUnionRect(acc);
}

function unionExcelCellRectsInBounds(containerEl, bounds) {
  if (!containerEl || !bounds) {
    return null;
  }
  const { minRow, maxRow, minCol, maxCol } = bounds;
  const cells = containerEl.querySelectorAll('td[data-excel-row][data-excel-col]');
  let minTop = Infinity;
  let minLeft = Infinity;
  let maxRight = -Infinity;
  let maxBottom = -Infinity;
  let count = 0;

  cells.forEach((td) => {
    const row = Number(td.getAttribute('data-excel-row'));
    const col = Number(td.getAttribute('data-excel-col'));
    if (Number.isNaN(row) || Number.isNaN(col)) {
      return;
    }
    if (row < minRow || row > maxRow || col < minCol || col > maxCol) {
      return;
    }
    const rect = td.getBoundingClientRect();
    if (rect.width <= 0 && rect.height <= 0) {
      return;
    }
    count += 1;
    minTop = Math.min(minTop, rect.top);
    minLeft = Math.min(minLeft, rect.left);
    maxRight = Math.max(maxRight, rect.right);
    maxBottom = Math.max(maxBottom, rect.bottom);
  });

  if (count === 0) {
    return null;
  }

  return {
    top: minTop,
    left: minLeft,
    width: Math.max(maxRight - minLeft, 0),
    height: Math.max(maxBottom - minTop, 0),
    right: maxRight,
    bottom: maxBottom,
  };
}

function unionExcelSelectionRects(tableWrapEl, bounds, mode) {
  if (!tableWrapEl || !bounds) {
    return null;
  }
  let acc = null;
  if (mode === 'column') {
    const headUnion = unionExcelHeadRectsInBounds(
      tableWrapEl,
      bounds.minCol,
      bounds.maxCol,
    );
    if (headUnion) {
      acc = mergeUnionRect(acc, headUnion);
    }
  }
  const bodyUnion = unionExcelCellRectsInBounds(tableWrapEl, bounds);
  if (bodyUnion) {
    acc = mergeUnionRect(acc, bodyUnion);
  }
  return finalizeUnionRect(acc);
}

function computeExcelOverlayStyleByCorners(
  tableWrapEl,
  minRow,
  minCol,
  maxRow,
  maxCol,
  mode,
) {
  if (!tableWrapEl) {
    return null;
  }
  let acc = null;
  if (mode === 'column') {
    const headUnion = unionExcelHeadRectsInBounds(tableWrapEl, minCol, maxCol);
    if (headUnion) {
      acc = mergeUnionRect(acc, headUnion);
    }
  }
  const tl = tableWrapEl.querySelector(
    `td[data-excel-row="${minRow}"][data-excel-col="${minCol}"]`,
  );
  const br = tableWrapEl.querySelector(
    `td[data-excel-row="${maxRow}"][data-excel-col="${maxCol}"]`,
  );
  if (tl && br) {
    const tlRect = tl.getBoundingClientRect();
    const brRect = br.getBoundingClientRect();
    acc = mergeUnionRect(acc, {
      top: Math.min(tlRect.top, brRect.top),
      left: Math.min(tlRect.left, brRect.left),
      right: Math.max(tlRect.right, brRect.right),
      bottom: Math.max(tlRect.bottom, brRect.bottom),
    });
  }
  const unionRect = finalizeUnionRect(acc);
  if (!unionRect) {
    return null;
  }
  return unionRectToExcelOverlayStyle(unionRect, tableWrapEl);
}

export function computeExcelOverlayStyleFromBounds(tableWrapEl, bounds, mode) {
  if (!tableWrapEl || !bounds) {
    return null;
  }
  const unionRect = unionExcelSelectionRects(tableWrapEl, bounds, mode);
  if (unionRect) {
    const style = unionRectToExcelOverlayStyle(unionRect, tableWrapEl);
    if (style) {
      return style;
    }
  }
  return computeExcelOverlayStyleByCorners(
    tableWrapEl,
    bounds.minRow,
    bounds.minCol,
    bounds.maxRow,
    bounds.maxCol,
    mode,
  );
}
