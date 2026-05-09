import ProcessNodeGroup from './process-node-group.js';

const LABEL_GAP = 6;
const LABEL_LINE_HEIGHT = 16;
const LABEL_MAX_WIDTH = 80;

export default class TaskNodeGroup extends ProcessNodeGroup {
    // 锁住 configs 写入的 34×34，标题由 render() 直接绘制在图标下方，不影响锚点计算
    _recalculate() {}

    render(ctx) {
        super.render(ctx);

        const content = this.labelContent;
        if (!content) return;

        const [ax, ay] = this.anchor;
        const labelX = ax;
        const labelY = ay + this.height / 2 + LABEL_GAP + LABEL_LINE_HEIGHT / 2;

        ctx.save();
        ctx.font = '12px PingFang SC, Arial, sans-serif';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let text = content;
        if (ctx.measureText(text).width > LABEL_MAX_WIDTH) {
            while (text.length > 1 && ctx.measureText(text + '…').width > LABEL_MAX_WIDTH) {
                text = text.slice(0, -1);
            }
            text += '…';
        }

        ctx.fillText(text, labelX, labelY);
        ctx.restore();
    }
}
