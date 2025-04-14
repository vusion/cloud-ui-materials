import { DIRECTION, Waypoint_to_DIR } from '../utils';
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
        // const nodes = [];
        let startNode;
        elements.forEach((processComponent) => {
            const { type, name } = processComponent;
            if (type !== 'sequenceFlow') {
                const node = new ProcessNode(processComponent);
                this.flowStack.push({
                    type: node.type,
                    source: processComponent,
                    layoutNode: node,
                });
                nodeMap[name] = node;
                this.nodes.push(node);
                if(type === "InitiateTask") {
                    startNode = processComponent;
                }
            }
        });
        const t = new WeakSet();
        let stack = [startNode]
        while(stack.length) {
            const n = stack.shift();
            if(t.has(n)) {
                continue;
            }
            t.add(n);
            const name = n.name;
            nodeMap[name].inPlayground = false;
            const links = flows.filter(e => {
                return (e.type === 'sequenceFlow' && e.sourceRef === name);
            }).map(e => e.targetRef)
            elements.forEach(e => {
                if(e.type !== 'sequenceFlow' && links.includes(e.name)) {
                    stack.push(e);
                }
            })
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
                });
            }
        });
    }

    reflow(jflow) {
        const nodes = this.nodes;
        nodes.forEach((node, idx) => {
            const { x, y } = node.source;
            const anchor = [x || 0, y || 0];
            const instance = jflow.getRenderNodeBySource(node.source);
            resetLinkCache(instance)
            instance.anchor = anchor;
            instance.opacity = node.inPlayground ? 0.6 : 1;
        });
    }
}

export default FreeLayout;
