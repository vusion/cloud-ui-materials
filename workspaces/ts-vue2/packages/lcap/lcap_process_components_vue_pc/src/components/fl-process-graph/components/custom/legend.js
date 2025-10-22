function renderRect(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -32);
    ctx.lineTo(212, -32);
    ctx.quadraticCurveTo(216, -32, 216, -28);
    ctx.lineTo(216, 0);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#E5E5E5';
    ctx.fillStyle = '#fff'
    ctx.fill();
    ctx.stroke();
}

function renderLegend(ctx, color, content) {
    ctx.beginPath();
    ctx.arc(13, 0, 5, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle ='#333333';
    ctx.fillText(content, 22, 0);
}

export function render(jflow, ctx) {
    ctx.save();
    ctx.setTransform();
    ctx.scale(jflow.dpr, jflow.dpr);
    const bottom = jflow.canvasMeta.actual_height;
    ctx.translate(0, bottom);
    renderRect(ctx);
    ctx.translate(0, -16);
    ctx.font = "14px PingFang SC";
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    renderLegend(ctx, '#26BD71', '已处理');
    ctx.translate(72, 0);
    renderLegend(ctx, '#337EFF', '处理中');
    ctx.translate(72, 0);
    renderLegend(ctx, '#CCCCCC', '未处理');
    ctx.restore();
}