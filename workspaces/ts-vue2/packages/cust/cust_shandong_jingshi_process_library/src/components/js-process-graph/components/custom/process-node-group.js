import { Group } from '@joskii/jflow-core';
import { DIRECTION } from '../../utils';
const instersectionMargin = 0;
class ProcessNodeGroup extends Group {
    constructor(configs) {
        super(configs);
    }

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

    render(ctx) {
        if(this._isMoving){
            ctx.globalAlpha = 0.6
        } else if(this.opacity !== 1) {
            ctx.globalAlpha = this.opacity;
        }

        const [cx, cy] = this._getCenter(); 
        this._shape.render(ctx);
        ctx.translate(cx, cy);
        this._stack.render(ctx);  
        ctx.translate(-cx, -cy);
        const {
            borderRadius: radius, anchor, width, height
        } = this;
        const x = anchor[0] - width / 2;
        const y = anchor[1] - height / 2;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath(); 
        ctx.save();
        ctx.lineWidth = this._shape.borderWidth;
        ctx.strokeStyle = this._shape.borderColor;
        ctx.stroke();
        ctx.restore();
    }


}
export default ProcessNodeGroup;
