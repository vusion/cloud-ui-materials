import { Group } from '@joskii/jflow-core';

// 外框节点：disableHit=true，仅用于渲染，不参与交互。几何数据全部来自 configs（由 _reflowFrame 写入）。
export default class FrameGroup extends Group {
  constructor(configs) {
    super(configs);
    this.disableHit = true;
  }

  // 阻止 JFlow 从子节点重算 width/height，保持 configs 写入的尺寸
  _recalculate() {}

  isHit() {
    return false;
  }

  isInViewBox() {
    return true;
  }

  render(ctx) {
    const topRectHeight = this.topRectHeight;
    if (!topRectHeight) return;

    const strokeStyle = this.strokeStyle || '#cdd8e9';
    const lineWidth = this.lineWidth || 1;
    const bgColor = this.bgColor || '#eff4f8';
    const textColor = this.textColor || '#333333';
    const textFont = this.textFont || '12px Arial';
    const verticalLines = this.verticalLines || [];
    const titles = this.titles || [];

    const width = this.width;
    const height = this.height;
    if (!width || !height) return;

    const anchor = this.anchor || [0, 0];
    const left = anchor[0] - width / 2;
    const top = anchor[1] - height / 2;

    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;

    // 顶部标题区背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(left, top, width, topRectHeight);

    // 整体外框
    ctx.strokeRect(left, top, width, height);

    // 横向分割线 + 竖向分割线（合并为单次 path/stroke）
    ctx.beginPath();
    ctx.moveTo(left, top + topRectHeight);
    ctx.lineTo(left + width, top + topRectHeight);
    verticalLines.forEach((x) => {
      ctx.moveTo(x, top);
      ctx.lineTo(x, top + height);
    });
    ctx.stroke();

    // 标题文字
    if (titles.length) {
      ctx.fillStyle = textColor;
      ctx.font = textFont;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const ty = top + topRectHeight / 2;
      titles.forEach((t) => {
        if (!t) return;
        ctx.fillText(t.text, t.x, ty);
      });
    }

    ctx.restore();
  }
}
