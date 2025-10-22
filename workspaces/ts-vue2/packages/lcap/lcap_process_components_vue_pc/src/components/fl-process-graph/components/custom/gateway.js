import { Rectangle, GroupFactory } from '@joskii/jflow-core';
import { DIRECTION } from './utils';
class GatewayShape extends Rectangle {
    render(ctx) {
        ctx.save();
        const [x, y] = this.anchor;
        const radius = this.borderRadius;
        const hw = this.width / 2;
        const hh = this.height / 2;

        const left = x - hw - 2;
        const right = x + hw + 2;
        const top = y - hh - 2;
        const bottom = y + hh + 2; 
        ctx.beginPath();
        
        ctx.moveTo(x - radius, top + radius);
        ctx.quadraticCurveTo(x, top, x + radius, top + radius);
        ctx.lineTo(right - radius, y - radius);
        ctx.quadraticCurveTo(right, y, right - radius, y + radius);
        ctx.lineTo(x + radius, bottom - radius);
        ctx.quadraticCurveTo(x, bottom, x - radius, bottom - radius);
        ctx.lineTo(left + radius, y + radius);
        ctx.quadraticCurveTo(left, y, left + radius, y - radius);
        ctx.closePath();   
        if(this.shadowColor) {
            ctx.shadowColor = this.shadowColor;
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowOffsetX = this.shadowOffsetX;
            ctx.shadowOffsetY = this.shadowOffsetY;
            let path = new Path2D();
            path.moveTo(x - radius, top + radius);
            path.quadraticCurveTo(x, top, x + radius, top + radius);
            path.lineTo(right - radius, y - radius);
            path.quadraticCurveTo(right, y, right - radius, y + radius);
            path.lineTo(x + radius, bottom - radius);
            path.quadraticCurveTo(x, bottom, x - radius, bottom - radius);
            path.lineTo(left + radius, y + radius);
            path.quadraticCurveTo(left, y, left + radius, y - radius);
            path.closePath();
            path.rect(x - 10, y - 10, this.width+ 20, this.height+ 20);
            ctx.save();
            ctx.clip(path, "evenodd");
            ctx.stroke();
            ctx.restore();
        }
        ctx.fillStyle = this.backgroundColor;  
        ctx.fill();
        if(this.borderWidth) {
            ctx.shadowColor = 'transparent'
            ctx.lineWidth = this.borderWidth;
            ctx.strokeStyle = this.borderColor;
            ctx.stroke();
        }
       
        ctx.restore();
    }
}
const instersectionMargin = 0;
export default class extends GroupFactory(GatewayShape) {
    getIntersectionsInFourDimension() {
        let p2 = this.anchor;
        if(this._belongs && this._belongs.calculateToCoordination) {
            p2 = this._belongs.calculateToCoordination(p2);
        }

        const [x2, y2] = p2;
        const w = this.width/2;
        const h = this.height/2;
        return {
            [DIRECTION.RIGHT]:  [x2+w+instersectionMargin, y2],
            [DIRECTION.LEFT]:   [x2-w-instersectionMargin, y2],
            [DIRECTION.BOTTOM]: [x2, y2+h+instersectionMargin],
            [DIRECTION.TOP]:    [x2, y2-h-instersectionMargin],
        }
    }

}
