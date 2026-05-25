import { DIRECTION, Waypoint_to_DIR, resolveElementGroupTitle } from '../utils';
export function resetLinkCache(node) {
    node._linkCache = new WeakMap();
    node._linkDirCache = {
        [DIRECTION.RIGHT]: 0,
        [DIRECTION.BOTTOM]: 0,
        [DIRECTION.TOP]: 0,
        [DIRECTION.LEFT]: 0,
    }
}
class ProcessNode {
    constructor(source) {
        this.type = 'ProcessNode';
        this.source = source;
        this.id = source.name;
        this.inPlayground = true;
    }
}

/**
 * 接受标准化节点数据数组 [{x, y, w, h}]，计算所有节点的包围盒。
 */
/** 无泳道外框时用于 Fit 的最小世界坐标尺寸，避免 width/height 为 0 导致 scale 异常 */
const MIN_FIT_CONTENT_SIZE = 8;

function calcContentBBox(nodeData) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodeData.forEach(({ x, y, w, h }) => {
        minX = Math.min(minX, x - w / 2);
        maxX = Math.max(maxX, x + w / 2);
        minY = Math.min(minY, y - h / 2);
        maxY = Math.max(maxY, y + h / 2);
    });
    if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
        return { x: 0, y: 0, width: 1, height: 1 };
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function normalizeFitBounds(bbox) {
    if (!bbox || !isFinite(bbox.width) || !isFinite(bbox.height)) {
        return { x: 0, y: 0, width: 1, height: 1 };
    }
    const w = Math.max(bbox.width, MIN_FIT_CONTENT_SIZE);
    const h = Math.max(bbox.height, MIN_FIT_CONTENT_SIZE);
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    return {
        x: cx - w / 2,
        y: cy - h / 2,
        width: w,
        height: h,
    };
}

/** 从 AST 元素判断是否存在泳道标题（不依赖渲染实例，避免首帧占位闪一下外框） */
function elementsHaveAnyGroupTitle(elements) {
    return elements.some((e) => {
        if (e.type === 'sequenceFlow' || e.type === 'FrameNode') return false;
        return resolveElementGroupTitle(e) !== '';
    });
}

/**
 * 接受标准化节点数据数组 [{x, w, groupTitle}]（`groupTitle` 为 resolveElementGroupTitle 从 extensionBindAttributes 解析出的文案），按文案做泳道分组。
 */
function analyzeGroups(nodeData) {
    const groups = new Map();
    nodeData.forEach(({ x, w, groupTitle }) => {
        if (!groupTitle) return;
        if (!groups.has(groupTitle)) groups.set(groupTitle, []);
        groups.get(groupTitle).push({ x, w });
    });
    return Array.from(groups.entries()).map(([groupTitle, nodes]) => {
        const minX = nodes.reduce((min, n) => Math.min(min, n.x - n.w / 2), Infinity);
        const maxX = nodes.reduce((max, n) => Math.max(max, n.x + n.w / 2), -Infinity);
        const avgX = nodes.reduce((sum, n) => sum + n.x, 0) / Math.max(1, nodes.length);
        return { groupTitle, minX, maxX, avgX, nodeCount: nodes.length };
    }).sort((a, b) => a.avgX - b.avgX);
}

function makeFrameSource(contentBBox, groupPositions) {
    const marginX = 40;
    const marginY = 30;
    const topRectHeight = 34;
    const width = contentBBox.width + marginX * 2;
    const height = contentBBox.height + marginY * 2 + topRectHeight;

    const left = contentBBox.x - marginX;
    const top = contentBBox.y - marginY - topRectHeight;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const internalLines = [];
    for (let i = 0; i < groupPositions.length - 1; i++) {
        internalLines.push((groupPositions[i].maxX + groupPositions[i + 1].minX) / 2);
    }
    const allBoundaries = [left, ...internalLines, left + width];
    const titles = groupPositions.map((g, idx) => {
        const x = (allBoundaries[idx] + allBoundaries[idx + 1]) / 2;
        return { text: g.groupTitle, x };
    });

    return {
        name: '__jflow_frame__',
        type: 'FrameNode',
        x: centerX,
        y: centerY,
        frame: {
            width,
            height,
            topRectHeight,
            marginX,
            marginY,
            strokeStyle: '#cdd8e9',
            lineWidth: 1,
            bgColor: '#eff4f8',
            textColor: '#333333',
            textFont: '12px Arial',
            verticalLines: internalLines,
            titles,
            bounds: { x: left, y: top, width, height },
        },
    };
}

/**
 * 生成 FrameNode 占位 source，供 JFlow 注册 FrameGroup 实例。
 * 几何数值由 _reflowFrame() 在首次绘制前覆盖，此处仅需满足 FrameGroup.render() 的守卫条件。
 */
function makeFramePlaceholder() {
    return {
        name: '__jflow_frame__',
        type: 'FrameNode',
        x: 0,
        y: 0,
        frame: {
            width: 1,
            height: 1,
            topRectHeight: 34,
            marginX: 40,
            marginY: 30,
            strokeStyle: '#cdd8e9',
            lineWidth: 1,
            bgColor: '#eff4f8',
            textColor: '#333333',
            textFont: '12px Arial',
            verticalLines: [],
            titles: [],
            bounds: { x: 0, y: 0, width: 1, height: 1 },
        },
    };
}

class FreeLayout {
    constructor(source) {
        this.static = false;
        this.reOrder(source);
    }

    reOrder(source) {
        this.flowStack = [];
        this.flowLinkStack = [];
        this.nodes = [];
        const { elementList: elements, flowList: flows } = source;
        const nodeMap = {};
        const gateways = [];
        let startNode;

        elements.forEach((processComponent) => {
            const { type, name } = processComponent;
            // 过滤 sequenceFlow 和已有的 FrameNode（FrameNode 由本 layout 合成，不应由 AST 重复注入）
            if (type !== 'sequenceFlow' && type !== 'FrameNode') {
                const node = new ProcessNode(processComponent);
                this.flowStack.push({
                    type: node.type,
                    source: processComponent,
                    layoutNode: node,
                });
                nodeMap[name] = node;
                this.nodes.push(node);
                if (type === 'InitiateTask') {
                    startNode = processComponent;
                }
                if (type === 'ExclusiveGateway' || type === 'ParallelGateway') {
                    gateways.push(name);
                }
            }
        });

        // 仅当 AST 中存在有效泳道标题（extensionBindAttributes 内 groupTitle 字符串项）时注入 FrameNode
        this._showSwimlaneFrame = elementsHaveAnyGroupTitle(elements);
        this._frameBounds = null;
        if (this._showSwimlaneFrame) {
            const frameSource = makeFramePlaceholder();
            const frameNode = new ProcessNode(frameSource);
            frameNode.inPlayground = false;
            this.flowStack.unshift({
                type: frameNode.type,
                source: frameSource,
                layoutNode: frameNode,
            });
            this.nodes.unshift(frameNode);
        }

        const t = new WeakSet();
        let stack = startNode ? [startNode] : [];
        while (stack.length) {
            const n = stack.shift();
            if (t.has(n)) continue;
            t.add(n);
            const name = n.name;
            nodeMap[name].inPlayground = false;
            const links = flows.filter(e => e.type === 'sequenceFlow' && e.sourceRef === name)
                               .map(e => e.targetRef);
            elements.forEach(e => {
                if (e.type !== 'sequenceFlow' && links.includes(e.name)) {
                    stack.push(e);
                }
            });
        }

        flows.forEach((processComponent) => {
            const { type, completed } = processComponent;
            if (type === 'sequenceFlow') {
                const { sourceRef, targetRef, name, wayPoints } = processComponent;
                const path = wayPoints.slice();
                const begin = path.shift();
                const end = path.pop();
                this.flowLinkStack.push({
                    source: processComponent,
                    content: name,
                    completed,
                    from: nodeMap[sourceRef],
                    to: nodeMap[targetRef],
                    fromDir: Waypoint_to_DIR(begin),
                    toDir: Waypoint_to_DIR(end),
                    waypoints: path.map(point => [point.x, point.y]),
                    conditionFlow: gateways.includes(sourceRef),
                });
            }
        });
    }

    /**
     * 在 reflow() 内、canvas 绘制前调用：无泳道时不创建 FrameNode；有泳道时更新 FrameGroup 几何。
     */
    _reflowFrame(jflow) {
        const nodeData = this.nodes
            .filter(n => n.source.type !== 'FrameNode')
            .map(n => {
                const { x = 0, y = 0 } = n.source;
                const groupTitle = resolveElementGroupTitle(n.source);
                const inst = jflow.getRenderNodeBySource(n.source);
                const w = inst ? inst.width : 0;
                const h = inst ? inst.height : 0;
                return { x, y, w, h, groupTitle };
            });

        if (!this._showSwimlaneFrame) {
            this._frameBounds = normalizeFitBounds(calcContentBBox(nodeData));
            return;
        }

        const frameMeta = this.nodes.find(n => n.source.type === 'FrameNode');
        if (!frameMeta) {
            this._frameBounds = normalizeFitBounds(calcContentBBox(nodeData));
            return;
        }

        const frameInst = jflow.getRenderNodeBySource(frameMeta.source);
        const contentBBox = calcContentBBox(nodeData);
        const groupPositions = analyzeGroups(nodeData);
        const newFrame = makeFrameSource(contentBBox, groupPositions);

        this._frameBounds = newFrame.frame.bounds;

        Object.assign(frameMeta.source, { x: newFrame.x, y: newFrame.y });
        Object.assign(frameMeta.source.frame, newFrame.frame);

        if (frameInst) {
            frameInst.anchor = [newFrame.x, newFrame.y];
            frameInst.width = newFrame.frame.width;
            frameInst.height = newFrame.frame.height;
            frameInst.topRectHeight = newFrame.frame.topRectHeight;
            frameInst.verticalLines = newFrame.frame.verticalLines;
            frameInst.titles = newFrame.frame.titles;
        }
    }

    reflow(jflow) {
        const nodes = this.nodes;

        // Pass 1：定位业务节点
        nodes.forEach((node) => {
            if (node.source.type === 'FrameNode') return;
            const { x, y } = node.source;
            const instance = jflow.getRenderNodeBySource(node.source);
            if (instance) {
                resetLinkCache(instance);
                instance.opacity = node.inPlayground ? 0.6 : 1;
                instance.anchor = [x || 0, y || 0];
            }
        });

        // Pass 2：重算 frame 几何
        this._reflowFrame(jflow);
    }
}

export default FreeLayout;
