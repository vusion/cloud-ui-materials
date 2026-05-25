import { BaseLink } from '@joskii/jflow-core';
import {
    isHorizontal,
    makeRadiusFromVector,
    genGrid,
    findRoute,
    genPolyLinePoints,
    getDirectionNearestDimentsion,
    getDirectionNearestPoint,
    distToSegmentSquared,
    segmentDistances,
    getMiddlePointOfSegments,
    isHorizon,
    linkBoundingRect,
    DIRECTION,
} from './utils';
const INITIAL_SEGMENT_LENGTH = 20;
const PIINRATIO = Math.PI / 180;

// function getInitialPoint(dir, point, waypoint) {
//     let p1;
//     if(isHorizontal(dir)) {
//         const dir = dir === DIRECTION.LEFT ? -1 : 1;
//         if(waypoint) {
//             p1 = [waypoint[0], point[1]];
//         } else {
//             p1 = [point[0] + dir*INITIAL_SEGMENT_LENGTH, point[1]];
//         }
//     } else {
//         const dir = fromDir === DIRECTION.TOP ? -1 : 1;
//         if(waypoint) {
//             p1 = [point[0], waypoint[1]];
//         } else {
//             p1 = [point[0], point[1] + dir*INITIAL_SEGMENT_LENGTH];
//         }
//     }
//     return p1;
// }

function getNodeLinkCache(node) {
    if (!node._linkCache) {
        node._linkCache = new WeakMap();
        node._linkDirCache = {
            [DIRECTION.RIGHT]: 0,
            [DIRECTION.BOTTOM]: 0,
            [DIRECTION.TOP]: 0,
            [DIRECTION.LEFT]: 0,
        };
    }
    return node._linkCache;
}
function resetNodeLinkCache(link, cache, linkCache) {
    let dir;
    if (cache.has(link)) {
        dir = cache.get(link);
    }
    if (linkCache[dir]) {
        linkCache[dir]--;
    }
}

function getLinkNumsMini(cache) {
    let min = Infinity;
    Object.values(cache).forEach((m) => {
        if (min > m) {
            min = m;
        }
    });
    const r = [];
    Object.keys(cache).map((k) => {
        if (cache[k] === min) {
            r.push(+k);
        }
    });
    return r;
}

function cacheLinkDir(link, cache, linkCache, dir) {
    cache.set(link, dir);
    linkCache[dir]++;
}

class FlowLink extends BaseLink {
    constructor(configs) {
        super(configs);

        this.fontFamily = configs.fontFamily = 'PingFang SC';
        this.fontSize = configs.fontSize || '12px';
        this.content = configs.content || '';
        this.radius = configs.radius || 0;
        this.lineDash = configs.lineDash;
        // middle bend points
        this.waypoints = configs.waypoints || [];
        this.showLineSeg = configs.showLineSeg;
        this.showAdd = configs.showAdd;
        this.showContent = configs.showContent;
        this.animate = {
            enable: false,
            gap: 0,
            offset: 0,
        };
        this._cache();
    }

    setConfig(configs) {
        super.setConfig(configs);
        this._cache();
    }

    _cache() {
        this._cachePoints = this._calculateAnchorPoints();
        this._cacheSegments = segmentDistances(this._cachePoints);
        this._cacheMiddlePoint = getMiddlePointOfSegments(this._cacheSegments);
        this._cacheBoundingRect = linkBoundingRect(this._cachePoints);
    }

    _calculateAnchorPoints() {
        const dmsfrom = this.from.getIntersectionsInFourDimension();
        const dmsto = this.to.getIntersectionsInFourDimension();
        const isTemp = (!this._belongs || this === this._jflow._tempLink);
        let fromAcceptableDirs;
        let toAcceptableDirs;
        let fromDirCache;
        let fromLinkDirCache;
        let toDirCache;
        let toLinkDirCache;
        if (!isTemp) {
            fromDirCache = getNodeLinkCache(this.from);
            fromLinkDirCache = this.from._linkDirCache;
            toDirCache = getNodeLinkCache(this.to);
            toLinkDirCache = this.to._linkDirCache;
            resetNodeLinkCache(this, fromDirCache, fromLinkDirCache);
            resetNodeLinkCache(this, toDirCache, toLinkDirCache);
            fromAcceptableDirs = getLinkNumsMini(fromLinkDirCache);
            toAcceptableDirs = getLinkNumsMini(toLinkDirCache);
        } else {
            fromAcceptableDirs = [0, 1, 2, 3];
            toAcceptableDirs = [0, 1, 2, 3];
        }
        let {
            fromDir,
            toDir,
        } = this;

        if (fromDir === undefined && toDir === undefined) {
            const { fromDir: f, toDir: t } = getDirectionNearestDimentsion(fromAcceptableDirs, toAcceptableDirs, dmsfrom, dmsto);
            fromDir = f;
            toDir = t;
            this._fromDir = f;
            this._toDir = t;
        } else if (fromDir === undefined) {
            fromDir = getDirectionNearestPoint(fromAcceptableDirs, dmsto[toDir], dmsfrom);
            this._fromDir = fromDir;
        } else if (toDir === undefined) {
            toDir = getDirectionNearestPoint(toAcceptableDirs, dmsfrom[fromDir], dmsto);
            this._toDir = toDir;
        }

        const fromPoint = dmsfrom[fromDir];
        const toPoint = dmsto[toDir];
        if (!isTemp) {
            cacheLinkDir(this, fromDirCache, fromLinkDirCache, fromDir);
            cacheLinkDir(this, toDirCache, toLinkDirCache, toDir);
        }
        if (this.waypoints.length) {
            const s = this.waypoints[0];
            const e = this.waypoints[this.waypoints.length - 1];
            if (isHorizontal(fromDir)) {
                s[1] = fromPoint[1];
            } else {
                s[0] = fromPoint[0];
            }

            if (isHorizontal(toDir)) {
                e[1] = toPoint[1];
            } else {
                e[0] = toPoint[0];
            }

            return [fromPoint, ...this.waypoints, toPoint];
        }
        try {
            const {
                grid,
                fromPos,
                toPos,
                columns,
                rows,
            } = genGrid(this.from, this.to);
            const route = findRoute(grid, fromPos, fromDir, toPos, toDir);
            const points = genPolyLinePoints(route, columns, rows, 20, 20, fromPoint, toPoint, fromDir, toDir);
            return points;
        }catch(err) {
            return this._cachePoints
        }
    }

    isInViewBox() {
        if (!this.seg_changing) {
            this._cache();
        }
        return true;
    }
    isHit(point) {
        if (!this._cachePoints) {
            return false;
        }
        const points = this._cachePoints;
        let lastP = points[0];
        const remainPoints = points.slice(1);
        do {
            const currentP = remainPoints.shift();
            if (currentP) {
                const dist = distToSegmentSquared(point, lastP, currentP);
                if (dist < 200) {
                    this._cacheSegment = [lastP.slice(), currentP.slice()];
                    return true;
                }
            }
            lastP = currentP;
        } while (lastP);

        return false;
    }

    render(ctx) {
        const radius = 4;
        const points = this._cachePoints;
        const { middlePoint } = this._cacheMiddlePoint;
        ctx.fillStyle = ctx.strokeStyle = this.backgroundColor;
        ctx.lineWidth = 2;
        ctx.font = `${this.fontSize} ${this.fontFamily}`;
        const startp = points[0];
        const endp = points[points.length - 1];
        const _showContent = this.showContent && this.content;
        const dir = this.toDir === undefined ? this._toDir : this.toDir;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startp[0], startp[1]);
        points.slice(1, points.length - 1).forEach((p, idx) => {
            if (radius) {
                const pLast = points[idx];
                const pNext = points[idx + 2];
                const { p1, p2 } = makeRadiusFromVector(pLast, p, pNext, radius);
                if (p1 && p2) {
                    ctx.lineTo(p1[0], p1[1]);
                    ctx.quadraticCurveTo(p[0], p[1], p2[0], p2[1]);
                } else {
                    ctx.lineTo(p[0], p[1]);
                }
            } else {
                ctx.lineTo(p[0], p[1]);
            }
        });
        let posOffset;
        if (dir === 0) {
            posOffset = [5, 0];
        }
        if (dir === 1) {
            posOffset = [0, 5];
        }
        if (dir === 2) {
            posOffset = [-5, 0];
        }
        if (dir === 3) {
            posOffset = [0, -5];
        }
        ctx.lineTo(endp[0] + posOffset[0], endp[1] + posOffset[1]);

        if (this.showAdd) {
            const region = new Path2D();
            region.rect(middlePoint[0] - 10, middlePoint[1] - 10, 20, 20);
            region.rect(...this._cacheBoundingRect);
            region.closePath();
            ctx.clip(region, 'evenodd');
        } else if (_showContent) {
            const {
                actualBoundingBoxLeft,
                actualBoundingBoxRight,
            } = ctx.measureText(this.content);
            const height = parseInt(this.fontSize) + 4;
            const width = Math.abs(actualBoundingBoxLeft) + Math.abs(actualBoundingBoxRight) + 4;
            const region = new Path2D();
            region.rect(middlePoint[0] - width / 2, middlePoint[1] - height / 2, width, height);
            region.rect(...this._cacheBoundingRect);
            region.closePath();
            ctx.clip(region, 'evenodd');
        }

        if (this.lineDash) {
            ctx.setLineDash(this.lineDash);
        }
        if (this.animate.enable) {
            ctx.strokeStyle = ctx.fillStyle = '#4C88FF';
        }
        ctx.stroke();
        this._renderAnimate(ctx);
        ctx.restore();

        if (this.animate.enable) {
            ctx.strokeStyle = ctx.fillStyle = '#4C88FF';
        }

        const angleEnd = ((dir + 2) % 4) * 90 * PIINRATIO;
        ctx.beginPath();
        ctx.translate(endp[0], endp[1]);
        ctx.rotate(angleEnd);
        ctx.moveTo(0, 0);
        ctx.lineTo(-5, -4);
        ctx.lineTo(-5, 4);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.rotate(-angleEnd);
        ctx.translate(-endp[0], -endp[1]);

        if (this.showAdd) {
            const [x, y] = middlePoint;
            ctx.save();
            ctx.lineWidth = 2;
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#4C88FF';
            ctx.stroke();

            ctx.translate(x, y);
            ctx.save();
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(-8, -10);
            ctx.lineTo(8, -10);
            ctx.quadraticCurveTo(10, -10, 10, -8);
            ctx.lineTo(10, 8);
            ctx.quadraticCurveTo(10, 10, 8, 10);
            ctx.lineTo(-8, 10);
            ctx.quadraticCurveTo(-10, 10, -10, 8);
            ctx.lineTo(-10, -8);
            ctx.quadraticCurveTo(-10, -10, -8, -10);
            ctx.closePath();
            ctx.stroke();
            if (this.fillAdd) {
                ctx.fillStyle = '#DCE3FB';
                ctx.fill();
            }
            // ctx.fill();
            ctx.restore();

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-6, 0);
            ctx.lineTo(6, 0);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, -6);
            ctx.lineTo(0, 6);
            ctx.stroke();
            ctx.translate(-x, -y);
            ctx.restore();
        } else if (_showContent) {
            ctx.beginPath();
            ctx.save();
            if (this.animate.enable) {
                ctx.strokeStyle = ctx.fillStyle = '#4C88FF';
            } else {
                ctx.fillStyle = this.backgroundColor;
            }
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(this.content, middlePoint[0], middlePoint[1]);
            ctx.restore();
        }
    }

    _renderAnimate(ctx) {
        if (this.animate.enable) {
            const animeGap = this.animate.gap;
            const animeOffset = this.animate.offset;
            let reducedArrowSegment = animeOffset;
            let segid = 0;
            const segments = this._cacheSegments;
            const segLenth = segments.length;
            while (segid < segLenth) {
                const {
                    p1, p2,
                    dist,
                    reducedDist,
                } = segments[segid];
                const horize = isHorizon(p1, p2);

                while (reducedArrowSegment < reducedDist) {
                    if (reducedArrowSegment > 0) {
                        const r = 1 - (reducedDist - reducedArrowSegment) / dist;
                        ctx.beginPath();
                        let x; let y;
                        if (horize) {
                            const dx = (p2[0] - p1[0]);
                            x = p1[0] + r * dx;
                            y = p1[1];
                            if (dx < 0) {
                                ctx.moveTo(x - 4, y);
                                ctx.lineTo(x + 2, y - 4);
                                ctx.lineTo(x + 2, y + 4);
                            } else {
                                ctx.moveTo(x + 4, y);
                                ctx.lineTo(x - 2, y - 4);
                                ctx.lineTo(x - 2, y + 4);
                            }
                        } else {
                            const dy = (p2[1] - p1[1]);
                            x = p1[0];
                            y = p1[1] + r * dy;
                            if (dy < 0) {
                                ctx.moveTo(x, y - 4);
                                ctx.lineTo(x - 4, y + 2);
                                ctx.lineTo(x + 4, y + 2);
                            } else {
                                ctx.moveTo(x, y + 4);
                                ctx.lineTo(x - 4, y - 2);
                                ctx.lineTo(x + 4, y - 2);
                            }
                        }
                        ctx.closePath();
                        ctx.fill();
                    }
                    reducedArrowSegment += animeGap;
                }
                segid++;
            }
        }
    }

    destroy() {
        const fromDirCache = getNodeLinkCache(this.from);
        const fromLinkDirCache = this.from._linkDirCache;
        const toDirCache = getNodeLinkCache(this.to);
        const toLinkDirCache = this.to._linkDirCache;
        resetNodeLinkCache(this, fromDirCache, fromLinkDirCache);
        resetNodeLinkCache(this, toDirCache, toLinkDirCache);
    }
}

export default FlowLink;
