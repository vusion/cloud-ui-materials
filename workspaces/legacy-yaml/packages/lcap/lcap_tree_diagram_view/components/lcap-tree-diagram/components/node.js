import get from 'lodash/get';

const EVENTS = {
    CLICK: 'on-node-click',
    DBCLICK: 'on-node-dbclick',
    MOUSEOUT: 'on-node-mouseout',
    MOUSEOVER: 'on-node-mouseover',
    DRAGSTART: 'on-node-drag-start',
    DRAGOVER: 'on-node-drag-over',
    DROP: 'on-node-drop',
    TOGGLE: 'on-node-click',
};

function createListener(handler, data) {
    const execute = (cb, e, ...args) => {
        if (typeof cb === 'function') {
            // // fixed bug #48, #73
            // const className = e.target && e.target.className;
            if (typeof className === 'string' && className.indexOf('lcap-tree-node-btn') > -1)
                return;
            cb.apply(null, [e, ...args]);
        }
    };

    return function (e) {
        if (Array.isArray(handler)) {
            for (const cb of handler) {
                execute(cb, e, data);
            }
        } else {
            execute(handler, e, data);
        }
    };
}

// 判断是否叶子节点
const isLeaf = (data, prop) => !(Array.isArray(data[prop]) && data[prop].length > 0);

// 创建 node 节点
// 创建 node 节点
export function renderNode(h, data, context) {
    const { props, listeners } = context;
    const toggleExpandHandler = listeners[EVENTS.TOGGLE];

    const cls = ['lcap-tree-node'];
    const childNodes = [];
    const children = data[props.props.children];

    if (isLeaf(data, props.props.children)) {
        cls.push('is-leaf');
    } else if (props.collapsable && !data[props.props.expand]) {
        cls.push('collapsed');
    }

    childNodes.push(renderLabel(h, data, context));

    if (!props.collapsable || data[props.props.expand]) {
        childNodes.push(renderChildren(h, children, context));
    }
    return [
        h('div', {
            domProps: {
                className: cls.join(' '),
            },
        }, childNodes),
        // h('div', {
        //     domProps: {
        //         className: 'lcap-tree-node-slot',
        //     },
        //     on: {
        //         click: (e) => toggleExpandHandler && toggleExpandHandler(e, data),
        //     },
        // }),
        // <div class="lcap-tree-node-slot" >
        //     {/* { props.isDesingerEnv && !context.scopedSlots?.default() ? <SEmpty></SEmpty> : context.scopedSlots?.default()} */}
        // </div>,
    ];
}

// 创建展开折叠按钮
export function renderBtn(h, data, context, isLeafV) {
    const { props, listeners } = context;
    const expandHandler = listeners['on-expand'];

    const cls = ['lcap-tree-node-btn'];

    const dotNum = get(data, 'children', []).length

    if (data[props.props.expand]) {
        cls.push('expanded');
    }
    return [
        isLeafV ? h('span', {
            domProps: {
                className: cls.join(' '),
            },
            attrs: {
                'dot-num': props.showChildDotNum ? `+${dotNum}` : '+',
                'data-btn': true,
            },
            on: {
                click: (e) => expandHandler && expandHandler(e, data),
            },
        }) : h(null),
    ];
}

// 创建 label 节点
export function renderLabel(h, data, context) {
    const { props, listeners } = context;
    // const expandHandler = listeners['on-expand'];

    const label = data[props.props.label];
    const renderContent = props.renderContent;
    // event handlers
    const clickHandler = listeners[EVENTS.CLICK];
    const dbclickHandler = listeners[EVENTS.DBCLICK];
    const mouseOutHandler = listeners[EVENTS.MOUSEOUT];
    const mouseOverHandler = listeners[EVENTS.MOUSEOVER];
    // const dragStartHandler = listeners[EVENTS.DRAGSTART];
    // const dragOverHandler = listeners[EVENTS.DRAGOVER];
    // const dropHander = listeners[EVENTS.DROP];

    const childNodes = [];
    if (typeof renderContent === 'function') {
        const vnode = renderContent(h, data);

        vnode && childNodes.push(vnode);
    } else {
        childNodes.push(label);
    }
    const isLeafV = !isLeaf(data, props.props.children);
    if (props.collapsable) {
        childNodes.push(renderBtn(h, data, context, isLeafV));
    }
    // && !isLeaf(data, props.props?.children)
    const cls = ['lcap-tree-node-label-inner'];
    let { labelWidth, labelClassName, selectedClassName, selectedKey } = props;

    if (data.curIndex == 2) {
        cls.push('lcap-tree-node-label-inner-second');
    }
    if (data.curIndex >= 3) {
        cls.push('lcap-tree-node-label-inner-more');
    }
    if (typeof labelWidth === 'number') {
        labelWidth += 'px';
    }

    if (typeof labelClassName === 'function') {
        labelClassName = labelClassName(data);
    }

    labelClassName && cls.push(labelClassName);

    // add selected class and key from props
    if (typeof selectedClassName === 'function') {
        selectedClassName = selectedClassName(data);
    }

    selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName);

    return h('div', {
        domProps: {
            className: 'lcap-tree-node-label',
            // draggable: true,
        },
        on: {
            click: (e) => clickHandler && clickHandler(e, data),
            dbclick: (e) => dbclickHandler && dbclickHandler(e, data),
            mouseout: (e) => mouseOutHandler && mouseOutHandler(e, data),
            mouseover: (e) => mouseOverHandler && mouseOverHandler(e, data),
        },
    }, [h('div', {
        domProps: {
            className: cls.join(' '),
        },
        style: { width: labelWidth },
    }, childNodes)]);
}

// 创建 node 子节点
export function renderChildren(h, list, context) {
    if (Array.isArray(list) && list.length) {
        const children = list.map((item) => renderNode(h, item, context));

        return h('div', {
            domProps: {
                className: 'lcap-tree-node-children',
            },
        }, children);
    }
    return '';
}

export function render(h, context) {
    const { props } = context;

    return [renderNode(h, props.data, context)];
}

export default render;
