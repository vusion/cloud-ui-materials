export const DIRECTION = {
    /** RIGHT */
    RIGHT: 0,
    /** BOTTOM */
    BOTTOM: 1,
    /** LEFT */
    LEFT: 2,
    /** TOP */
    TOP: 3,
};

class DirectionIterator {
    constructor(){
        this._vecs = [
            [0, -1],
            [-1, 0],
            [0, 1],
            [1, 0],   
        ];
        this._i = 0
    }
    resetState(dir){
        if(dir === DIRECTION.RIGHT) {
            this._i = 2
        }
        if(dir === DIRECTION.LEFT) {
            this._i = 0
        }
        if(dir === DIRECTION.TOP) {
            this._i = 1
        }
        if(dir === DIRECTION.BOTTOM) {
            this._i = 3
        }
    }

    resetIdx(i) {
        this._i = i;
    }
    current() {
        return this._vecs[this._i % 4];
    }
    next() {
        this._i ++;
        const t = this._vecs[this._i % 4];
        return t;
    }
}

const directionIT = new DirectionIterator();
const directionFromIT = new DirectionIterator();
const directionToIT = new DirectionIterator();

export function isHorizontal(dir) {
    return dir === DIRECTION.LEFT || dir === DIRECTION.RIGHT;
}

export function isVertical(dir) {
    return dir === DIRECTION.TOP || dir === DIRECTION.BOTTOM;
}

export function sameDir(d1, d2) { 
    return d1 === d2;
}

export function oppositeDir(d1, d2) { 
    return Math.abs(d1 - d2) === 2;
}

export function crossDir(d1, d2) { 
    return Math.abs(d1 - d2) !== 2;
}

function addVec(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1]]
}

function minusVec(p1, p2) {
    return [p1[0] - p2[0], p1[1] - p2[1]]
}

function absVec(vec) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
}

function scaleVec(vec, scale) {
    return [vec[0] * scale, vec[1] * scale];
}

export function makeRadiusFromVector(pbefore, p, pnext, radius) {
    const vec1 = minusVec(p, pbefore);
    const vec2 = minusVec(p, pnext);
    const absVec1 = absVec(vec1);
    const absVec2 = absVec(vec2);
    const distance = Math.min(dist2(p, pbefore), dist2(p, pnext));
    if(!absVec1 || !absVec2) {
        return {
            p1: null,
            p2: null,
        }
    }
    radius = Math.min(radius, Math.sqrt(distance));
    const r1 = scaleVec(vec1, radius/absVec1);
    const r2 = scaleVec(vec2, radius/absVec2);
    return {
        p1: minusVec(p, r1),
        p2: minusVec(p, r2),
    }
}

export function getDirectionNearestDimentsion(fromDirs, toDirs, fromDimension, toDimension) {
    let fromDir, toDir;
    // let f = 0;
    // let t = 0;
    let d = Infinity;
    fromDirs.forEach(f => {
        toDirs.forEach(t => {
            const dcurr = distanceVec(minusVec(fromDimension[f], toDimension[t]));
            if(dcurr < d) {
                d = dcurr;
                fromDir = f;
                toDir = t;
            }
        })
    })
    // while(f < 4) {
    //     while(t < 4) {
    //         const dcurr = distanceVec(minusVec(fromDimension[f], toDimension[t]));
    //         if(dcurr < d) {
    //             d = dcurr;
    //             fromDir = f;
    //             toDir = t;
    //         }
    //         t++
    //     }
    //     t = 0
    //     f++
    // }
    return {
        fromDir,
        toDir
    }
}

export function getDirectionNearestPoint(dirs, point, dimension) {
    let dir;
    let d = Infinity;
    dirs.forEach(t => {
        const dcurr = distanceVec(minusVec(point, dimension[t]));
        if(dcurr < d) {
            d = dcurr;
            dir = t;
        }
    })
    // while(t < 4) {
    //     const dcurr = distanceVec(minusVec(point, dimension[t]));
    //     if(dcurr < d) {
    //         d = dcurr;
    //         dir = t;
    //     }
    //     t++
    // }
    return dir
}

function intersectRect(r1, r2) {
    return !(r2[0] >= r1[2] || 
             r2[2] <= r1[0] || 
             r2[1] >= r1[3] ||
             r2[3] <= r1[1]);
}

function combineRect(r1, r2) {
    return [
        Math.min(r1[0], r2[0]),
        Math.min(r1[1], r2[1]),
        Math.max(r1[2], r2[2]),
        Math.max(r1[3], r2[3]),
    ]
}

function sameRow(d1, d2, r1, r2) {
    return Math.max(r1[3], r2[3]) - Math.min(r1[1], r2[1]) < d1.height + d2.height
}

function sameColumn(d1, d2, r1, r2) {
    return Math.max(r1[2], r2[2]) - Math.min(r1[0], r2[0]) < d1.width + d2.width
}

const SGRID = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
];
const HGRID = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];

const VGRID = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

const FULLGRID = [
    [1, 1,  1,  1,  1],
    [1, 1,  1,  1,  1],
    [1, 1,  1,  1,  1],
    [1, 1,  1,  1,  1],
    [1, 1,  1 , 1,  1],
]
export function genGrid(s1, s2) {
    const r1 = s1.getBoundingRect();
    const r2 = s2.getBoundingRect();
    const d1 = s1.getBoundingDimension();
    const d2 = s2.getBoundingDimension();
    let grid;
    let fromPos;
    let toPos;
    let rows;
    let columns;
    if(intersectRect(r1, r2)) {
        const t = combineRect(r1, r2);
        grid = SGRID
        fromPos = [1,1];
        toPos = [1,1];
        columns = [-Infinity, t[0], t[2], Infinity];
        rows = [-Infinity, t[1], t[3], Infinity];
    } else if(sameRow(d1, d2, r1, r2)) {
        const miny = Math.min(r1[1], r2[1]);
        const maxy = Math.max(r1[3], r2[3]);
        // const t1 = [
        //     r1[0],
        //     Math.min(r1[1], r2[1]),
        //     r1[2],
        //     Math.max(r1[3], r2[3]),
        // ]
        // const t2 = [
        //     r2[0],
            
        //     r2[2],
        //     Math.max(r1[3], r2[3]),
        // ]
        grid = HGRID
        if(r1[0] < r2[0]) { 
            fromPos = [1,1];
            toPos = [1,3];
            columns = [-Infinity, r1[0], r1[2], r2[0], r2[2], Infinity];
            rows = [-Infinity, miny, maxy, Infinity];
        } else {
            fromPos = [1,3];
            toPos = [1,1];
            columns = [-Infinity, r2[0], r2[2], r1[0], r1[2], Infinity];
            rows = [-Infinity, miny, maxy, Infinity];
        }
    } else if(sameColumn(d1, d2, r1, r2)) {
        // const t1 = [
        //     Math.min(r1[0], r2[0]),
        //     r1[1],
        //     Math.max(r1[2], r2[2]),
        //     r1[3]
        // ]

        // const t2 = [
        //     Math.min(r1[0], r2[0]),
        //     r2[1],
        //     Math.max(r1[2], r2[2]),
        //     r2[3]
        // ]
        const minx = Math.min(r1[0], r2[0]);
        const maxx = Math.max(r1[2], r2[2]);
        grid = VGRID;
        if(r1[1] < r2[1]) {
            fromPos = [1,1];
            toPos = [3,1];
            columns = [-Infinity, minx, maxx, Infinity];
            rows = [-Infinity, r1[1], r1[3], r2[1], r2[3], Infinity];
        } else {
            fromPos = [3,1];
            toPos = [1,1];
            columns = [-Infinity, minx, maxx, Infinity];
            rows = [-Infinity, r2[1], r2[3], r1[1], r1[3], Infinity];
        }
    } else {
        grid = FULLGRID;
        if(r1[1] < r2[1] && r1[0] < r2[0]){
            // grid = [
            //     [1, 1,  1,  1,  1],
            //     [1, r1, 1,  1,  1],
            //     [1, 1,  1,  1,  1],
            //     [1, 1,  1,  r2, 1],
            //     [1, 1,  1 , 1,  1],
            // ]
            fromPos = [1,1];
            toPos = [3,3];
            columns = [-Infinity, r1[0], r1[2], r2[0], r2[2], Infinity];
            rows = [-Infinity, r1[1], r1[3], r2[1], r2[3], Infinity]; 
        } else if(r1[1] > r2[1] && r1[0] > r2[0]){
            // grid = [
            //     [1, 1,  1,  1,  1],
            //     [1, r2, 1,  1,  1],
            //     [1, 1,  1,  1,  1],
            //     [1, 1,  1,  r1, 1],
            //     [1, 1,  1 , 1,  1],
            // ]
            fromPos = [3,3];
            toPos = [1,1];
            columns = [-Infinity, r2[0], r2[2], r1[0], r1[2], Infinity];
            rows = [-Infinity, r2[1], r2[3], r1[1], r1[3], Infinity];
        } else if(r1[0] > r2[0] && r1[1] < r2[1]) {
            // grid = [
            //     [1, 1,  1,  1,  1],
            //     [1, 1,  1,  r1, 1],
            //     [1, 1,  1,  1,  1],
            //     [1, r2, 1,  1,  1],
            //     [1, 1,  1 , 1,  1],
            // ]
            fromPos = [1,3];
            toPos = [3,1];

            columns = [-Infinity, r2[0], r2[2], r1[0], r1[2], Infinity];
            rows = [-Infinity, r1[1], r1[3], r2[1], r2[3], Infinity];
        } else if(r1[0] < r2[0] && r1[1] > r2[1]) {
            // grid = [
            //     [1, 1,  1,  1,  1],
            //     [1, 1,  1,  r2, 1],
            //     [1, 1,  1,  1,  1],
            //     [1, r1, 1,  1,  1],
            //     [1, 1,  1 , 1,  1],
            // ]
            fromPos = [3,1];
            toPos = [1,3];
            columns = [-Infinity, r1[0], r1[2], r2[0], r2[2], Infinity];
            rows = [-Infinity, r2[1], r2[3], r1[1], r1[3], Infinity]; 
        }
    }
    return {
        grid,
        fromPos,
        toPos,
        columns,
        rows
    }
}

const VEC = {
    [DIRECTION.TOP]: [-1, 0],
    [DIRECTION.LEFT]: [0, -1],
    [DIRECTION.BOTTOM]: [1, 0],
    [DIRECTION.RIGHT]: [0, 1],
}

const _vecs = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
]

function sameVec(a, b) {
    return (a[0] === b[0] && a[1] === b[1])
}

function distanceVec(vec) {
    return vec[0] * vec[0] + vec[1] * vec[1];
}

// function isVertical(v1, v2) {
//     return (v1[0] * v2[0] + v1[1] * v2[1]) === 0;
// }

function stepDistance(vec) {
    return Math.abs(vec[0]) + Math.abs(vec[1])
}

function genRoute(route, grid, to_coord, toPos) {
    const l = grid[0].length * grid.length - 2
    if(sameVec(route[route.length - 1], to_coord)) {
        route.push(toPos);
        return route;
    }
    /* const routes = [];

    function predictRoute(route, next) {
        const currRoute = route.slice();
        routes.push(currRoute);
        while(!(next && sameVec(next, to_coord)) && currRoute.length < l) {
            const currStep = currRoute[currRoute.length - 1];
            let min = Infinity;
            next = undefined;
            const distancemap = _vecs.map(v => {
                const nextStep = addVec(currStep, v);
                const [r, c] = nextStep;
                if(!(grid[r] && grid[r][c])) {
                    return null;
                }
                if(currRoute.find(st => sameVec(st, nextStep)) || sameVec(nextStep, toPos) ){
                    return null;
                }
                const d = stepDistance(minusVec(nextStep, to_coord));
                if(d < min) {
                    min = d;
                }
                return {
                    d,
                    next: nextStep,
                }
            })
            const minChoices = distancemap.filter(s => s && s.d === min);
            if(minChoices.length === 0) {
                break;
            }
            // debugger
            minChoices.forEach((c, idx) => {
                if(idx === 0) {
                    currRoute.push(c.next);
                    next = c.next;
                } else {
                    predictRoute(currRoute.concat([c.next]), c.next)
                }
            })
        }
    }

    predictRoute(route);
    let length = Infinity
    let bs = Infinity;
    let finnalRoute;
    routes.forEach(r => {
        if(r.length < length) {
            const b = checkBendPoint(r);
            if(b < bs) {
                length = r.length;
                bs = b;
                finnalRoute = r;
            }
        }
    })
    
    finnalRoute.push(toPos);
    return finnalRoute; */

    let next = undefined;
    while(!(next && sameVec(next, to_coord)) && route.length < l) {
        const currStep = route[route.length - 1];
        let min = Infinity;
        next = undefined;
        let i = 0;
        let dir;
        while(i < 4) {
            let v = (i === 0 ? directionIT.current() : directionIT.next());
            const nextStep = addVec(currStep, v);
            const [r, c] = nextStep;
            if(!(grid[r] && grid[r][c])) {
                i++;
                continue;
            }
            if(route.find(st => sameVec(st, nextStep)) || sameVec(nextStep, toPos) ){
                i++;
                continue;
            }
            const d = stepDistance(minusVec(nextStep, to_coord));
            if(d < min) {
                min = d;
                next = nextStep;
                dir = directionIT._i;
            }
            i++;
        }
        if(!next) {
            throw 'algorithm failed!'
        }
        directionIT.resetIdx(dir);
        route.push(next);
    }
    route.push(toPos);
    return route;
}

function nextMoves(directionIT, a_coord, b_coord, forbidPos, grid) {
    let min = Infinity;
    let i = 0;
    let dir;
    let map = {};
    while(i < 4) {
        let v = (i === 0 ? directionIT.current() : directionIT.next());
        const nextStep = addVec(a_coord, v);
        const [r, c] = nextStep;
        if(!(grid[r] && grid[r][c])) {
            i++;
            continue;
        }
        if(forbidPos.find(st => sameVec(nextStep, st))){
            i++;
            continue;
        }
        const d = stepDistance(minusVec(nextStep, b_coord));
        if(!map[d]){
            map[d] = []
        }
        map[d].push({
            nextStep, 
            dir: directionIT._i,
            d,
        })
        if(d < min) {
            min = d;
        }
        i++;
    }

    return map[min];
}

function genRouteBimove(route, grid, from_coord, fromPos, to_coord, toPos, fromDir, toDir) {
    const l = grid[0].length * grid.length - 2
    if(sameVec(route[route.length - 1], to_coord)) {
        route.push(toPos);
        return route;
    }
    directionFromIT.resetState(fromDir);
    directionToIT.resetState(toDir);

    let fromRoute = [fromPos, from_coord];
    let toRoute = [to_coord, toPos];
    let fromMove;
    let toMove;
    // const forbidFromPos = [fromPos, from_coord, to_coord, toPos];
    // who move first
    const aMoves = nextMoves(directionFromIT, from_coord, to_coord, fromRoute.concat([toPos]), grid);
    const bMoves = nextMoves(directionToIT, to_coord, from_coord, toRoute.concat([fromPos]), grid)
    let startMove;
    let nextStart;
    if(bMoves.length < aMoves.length){
        startMove = bMoves[0];
        nextStart = 'a';
        directionToIT.resetIdx(startMove.dir);
        directionFromIT.resetState(fromDir);
        fromMove = from_coord;
        toMove = startMove.nextStep;
        toRoute.unshift(toMove);
    } else {
        startMove = aMoves[0];
        nextStart = 'b';
        directionFromIT.resetIdx(startMove.dir);
        directionToIT.resetState(toDir);
        fromMove = startMove.nextStep;
        toMove = to_coord;
        fromRoute.push(fromMove);
    }

    while(!sameVec(fromMove, toMove)) {
        if(nextStart === 'a') {
            // 出发节点
            const moves = nextMoves(directionFromIT, fromMove, toMove, fromRoute.concat([toPos]), grid);
            const _m = moves[0];
            directionFromIT.resetIdx(_m.dir);
            fromMove = _m.nextStep;
            nextStart = 'b';
            fromRoute.push(fromMove);
        } else {
            // 结束节点
            const moves = nextMoves(directionToIT, toMove, fromMove, toRoute.concat([fromPos]), grid);
            const _m = moves[0];
            directionToIT.resetIdx(_m.dir);
            toMove = _m.nextStep;
            nextStart = 'a';
            toRoute.unshift(toMove);
        }
    }

    return fromRoute.concat(toRoute);
}

function checkBendPoint(route) {
    let dir;
    let bends = 0;
    route.forEach((p, idx) => {
        const prep = route[idx-1];
        if(prep) {
            if(prep[0] === p[0] && dir !== 1) {
                dir = 1;
                bends ++;
            }
            if(prep[1] === p[1] && dir !== 2) {
                dir = 2
                bends ++;
            }
        }
    });
    return bends;
}

export function findRoute(grid, fromPos, fromDir, toPos, toDir) {
    const from_coord = addVec(fromPos, VEC[fromDir]);
    const to_coord = addVec(toPos, VEC[toDir]);
    const route = [fromPos, from_coord];
    // const lastRoute = [to_coord, toPos];
    // directionIT.resetState(fromDir);

    
    return genRouteBimove(route, grid, from_coord, fromPos, to_coord, toPos, fromDir, toDir)
    // return genRoute(route, grid, to_coord, toPos);
}

function resolvePoint(curr, columns, rows, minX, minY){
    const [r, c] = curr;
    return [
        columns[c] === -Infinity ? 
            columns[c+1] - minX : (columns[c+1] === Infinity ? 
                columns[c] + minX : (columns[c+1] - columns[c]) / 2 + columns[c]),

        rows[r] === -Infinity ? 
            rows[r+1] - minY : (rows[r+1] === Infinity ? 
                rows[r] + minY : (rows[r+1] - rows[r]) / 2 + rows[r]),
    ]
}

function atSameLine(p1, p2, p3) {
    return (p3[1] - p1[1]) * (p2[0] - p1[0]) - (p2[1] - p1[1]) * (p3[0] - p1[0]) === 0 
}

function floatSame(a, b) {
    return Math.abs(a - b) < 0.0000001
}

export function isSameVec(a, b) {
    return floatSame(a[0], b[0]) && floatSame(a[1], b[1])
}

export function mergePoints(preparepoints, dir) {
    let lastP;
    const points = [];
    preparepoints.forEach((p, idx) => {
        const prep = preparepoints[idx-1];
        if(prep) {
            if(sameVec(lastP, p)){
                return;
            }
            if(floatSame(prep[0], p[0]) && dir !== 1) {
                dir = 1;
                points.push(prep)
            }
            if(floatSame(prep[1], p[1]) && dir !== 2) {
                dir = 2
                points.push(prep)
            }
        } else {
            points.push(p);

        }
        lastP = p;
    });
    points.push(preparepoints[preparepoints.length - 1]);
    return points;
}

export function genPolyLinePoints(
    route, 
    columns, rows,
    minX, minY,
    fromPoint,
    toPoint,
    fromDir,
    toDir
) {
    const preparepoints = route.slice(1, route.length - 1).map(curr => {
        return resolvePoint(curr, columns, rows, minX, minY);
    });
    const fp = preparepoints[0];
    const lp = preparepoints[preparepoints.length - 1];

    if(fp === lp) {
        if(isVertical(fromDir)) {
            preparepoints.splice(0, 1, [fromPoint[0], fp[1]], [toPoint[0], fp[1]])
        } else {
            preparepoints.splice(0, 1, [fp[0], fromPoint[1]], [fp[0], toPoint[1]])
        }
    } else {
        if(isVertical(fromDir)) {
            fp[0] = fromPoint[0];
        } else {
            fp[1] = fromPoint[1];
        }

        if(isVertical(toDir)) {
            lp[0] = toPoint[0];
        } else {
            lp[1] = toPoint[1];
        }
    }

    preparepoints.unshift(fromPoint);
    preparepoints.push(toPoint);
    const ps = mergePoints(preparepoints, isVertical(fromDir) ? 1 : 2 );
    return ps;
}

function sqr(x) {
    return x * x;
}
export function dist2(v, w) {
    return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}

// p - point
// v - start point of segment
// w - end point of segment
export function distToSegmentSquared(p, v, w) {
    const l2 = dist2(v, w);
    if (l2 === 0) return dist2(p, v);
    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, [ v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1]) ]);
}

export function getMiddlePoint(p1, p2) {
    return [
        (p1[0] - p2[0]) / 2 + p2[0],
        (p1[1] - p2[1]) / 2 + p2[1],
    ]
}

export function DIR_to_Waypoint(dir) {
    switch(dir) {
        case DIRECTION.TOP: 
            return { concept: 'Point', x: 0, y: -1 };
        case DIRECTION.BOTTOM:
            return { concept: 'Point', x: 0, y: 1 };
        case DIRECTION.LEFT:
            return { concept: 'Point', x: -1, y: 0 };
        case DIRECTION.RIGHT:
            return { concept: 'Point', x: 1, y: 0 };
    }
}

export function Waypoint_to_DIR(p) {
    if(!p) {
        return undefined;
    }

    const { x, y } = p;
    if(x === 1) {
        return DIRECTION.RIGHT;
    }
    if(x === - 1) {
        return DIRECTION.LEFT;
    }
    if(y === 1) {
        return DIRECTION.BOTTOM;
    }
    if(y === -1) {
        return DIRECTION.TOP;
    }
    
}

export function segmentDistances(points) {
    const segs = [];
    let l = points.length;
    let i = 1;
    let reducedDist = 0;
    while (i < l) {
        const p1 = points[i-1]
        const p2 = points[i]
        const dist = Math.sqrt(dist2(p1, p2));
        reducedDist += dist;
        segs.push({
            p1, p2,
            dist,
            reducedDist,
        });
        i++;
    }
    return segs
}

export function getMiddlePointOfSegments(segments) {
    const midlength = segments[segments.length - 1].reducedDist / 2
    let reducedDist = 0;
    let idx = 0;
    while(reducedDist < midlength) {
        const seg = segments[idx];
        reducedDist = seg.reducedDist;
        if(reducedDist >= midlength) {
            const { p1, p2, dist } = seg;
            const ratio = (dist - (reducedDist - midlength)) / dist;
            
            return {
                segidx: idx, 
                middlePoint: [
                    (p2[0] - p1[0]) * ratio + p1[0], 
                    (p2[1] - p1[1]) * ratio + p1[1]
                ]
            }
        }
        idx ++;
    }
    return {
        segidx: 0,
        middlePoint: segments[0].p1.slice(),
    }
}

export function isHor(seg) {
    return floatSame(seg.p1[1], seg.p2[1])
} 
export function isHorizon(p1, p2) {
    return floatSame(p1[1], p2[1])
}

export function linkBoundingRect(points) {
    let x = Infinity, y = Infinity, rx = -Infinity, ry = -Infinity;
    points.forEach(p => {
        const [t, n] = p;
        if(x > t) {
            x = t;
        }
        if(y > n) {
            y = n;
        }
        if(rx < t) {
            rx = t;
        }
        if(ry < n) {
            ry = n;
        }
    });
    return [x - 5, y-5, rx -x + 10, ry - y+10]
    // return [x - 5, y - 5, rx + 5, ry - 5];
}