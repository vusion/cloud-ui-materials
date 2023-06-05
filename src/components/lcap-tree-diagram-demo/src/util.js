import Vue from 'vue';

import {
    dataOpened,
    treeNodeClassName,
    connectLineClassName,
    treeParentClassName,
    treeChildrenClassName,
} from './const';

/**
 * 获取 rootEle 元素下的第一个 className 元素
 * @param  rootEle rootEle节点元素
 * @param {string[]} classNames 类名
 * @returns {HTMLElement|null}
 */
function getEleByClassName(rootEle, ...classNames) {
    let ele = rootEle;
    for (let index = 0; index < classNames.length; index++) {
        if (!ele)
            return null;
        ele = ele.querySelector(`.${Vue.$styles[classNames[index]]}`);
    }
    return ele;
}

/**
 * 初始化树状图 tree
 * @param {HTMLElement} rootTreeNode 树状图的跟 treeNode 节点
 */
export function resetTree(rootTreeNode, $style) {
    Vue.$styles = $style;
    Vue.nextTick(() => {
        // console.log(vm.$el.querySelector('.' + 'TreeItem_tree_parent__1Ffqgai-').textContent);
        _resetTree(rootTreeNode, $style);
    });
}
/**
 * 初始化树状图 tree
 * @param {HTMLElement} rootTreeNode 树状图的跟 treeNode 节点
 */
function _resetTree(rootTreeNode) {
    const allLevelParentEles = getAllLevelParentEles(rootTreeNode);
    allLevelParentEles.forEach((item) => {
        // 如果当前层只有一个元素（或是只有一个展开可见的元素），说明不需要对齐，也就不需要专门计算位置了
        if (item.length > 1) {
            computedParentElesPosition(item);
        }
    });
    // 必须等到 computedParentElesPosition 全部计算完毕，所有的元素放置在了正确的位置上，
    // 才能继续计算伸缩节点和竖向连接线的信息
    allLevelParentEles.forEach((item) => {
        item.forEach((v, index) => {
            // 如果最后一个节点存在下一个兄弟节点（这个节点就是伸缩节点），说明肯定有子节点，需要正常计算；
            // 否则就是叶子节点，肯定没有伸缩节点和子节点，就不需要计算
            if (index !== item.length - 1 || v.nextElementSibling) {
                // 计算伸缩节点的位置
                computedShrinkPosition(v);
                // 计算当前节点下直接子节点竖向连接线的位置和高度
                resetChildenVline(v);
            }
        });
    });
}
/**
 * 更新树状图
 * 因局部节点状态发生变化，更新受到影响的所有节点的位置和height信息
 * @param {HTMLElement} treeNode 发生变化的节点所在的 treeNode 节点
 */
export function updatePartTree(treeNode) {
    Vue.nextTick(() => {
        _updatePartTree(treeNode);
    });
}
/**
 * 更新树状图
 * 因局部节点状态发生变化，更新受到影响的所有节点的位置和height信息
 * @param {HTMLElement} treeNode 发生变化的节点所在的 treeNode 节点
 */
function _updatePartTree(treeNode) {
    if (!isOpened(treeNode)) {
        _resetTree(treeNode);
    }
    // 更新当前层的位置
    updateParentElesPosition(treeNode);
    // 更新伸缩节点位置
    updateShrinkPosition(treeNode);
    // 更新竖向连接线位置和height
    updateConnectVLine(treeNode);
}
/**
 * 获取 treeNode 下所有的第一次被展开的 .treeParentClassName 元素
 * 每一层的 .treeParentClassName 元素合成一个数组，所有层的数组再合成一个数组
 * @param {HTMLElement} treeNode treeNode 节点
 * @returns {HTMLElement[][]}
 */
function getAllLevelParentEles(treeNode) {
    const parentEles = [];
    // 每一层的 .treeParentClassName 元素合成一个数组
    let currentLevelParentEles = [];
    let currentTreeNode;
    let cacheCurrentTreeNode = null;
    let currentChildrenEle = null;
    let nextLevelTreeNodes = [treeNode];
    while ((currentTreeNode = nextLevelTreeNodes.pop())) {
        // 已经被展开过的节点，就无需重复计算位置了
        while (currentTreeNode && !isOpened(currentTreeNode)) {
            cacheCurrentTreeNode = currentTreeNode;
            currentLevelParentEles.push(
                getEleByClassName(currentTreeNode, treeParentClassName),
            );
            // 继续查找当前节点的下级 treeNode 节点
            currentChildrenEle = getEleByClassName(
                currentTreeNode,
                treeChildrenClassName,
            );
            currentTreeNode = getLowTreeNode(currentTreeNode);
            // 如果子元素 display: none, 即视觉不可见，那么无需关心其子元素
            if (currentChildrenEle && currentChildrenEle.style.display !== 'none') {
                // 当前子元素的兄弟节点也需要进行同样操作
                // 第0个是竖向连接线节点，第 1 个是当前treeNode节点，第2个及其后续才是当前 treeNode 的兄弟treeNode节点
                nextLevelTreeNodes = nextLevelTreeNodes.concat(
                    getSiblings(currentTreeNode).slice(2),
                );
                setDataOpened(cacheCurrentTreeNode);
            } else {
                break;
            }
        }
        parentEles.push(currentLevelParentEles);
        currentLevelParentEles = [];
    }
    return parentEles;
}
/**
 * 对齐当前层的 .treeParentClassName 元素
 * @param {HTMLElement[]} parentEles 位于同一层的需要进行居中对齐的 .treeParentClassName 元素集合
 */
function computedParentElesPosition(parentEles) {
    const heights = parentEles.map((ele) => ele.offsetHeight);
    // 找出最大高度
    const maxHeight = Math.max.apply(null, heights);
    const halfMaxHeight = maxHeight / 2;
    parentEles.forEach((ele, index) => {
        if (heights[index] < maxHeight) {
            // ele.style.marginTop = halfMaxHeight - heights[index] / 2 + 'px';
        } else {
            ele.style.marginTop = '0';
        }
    });
}
/**
 * 重置伸缩节点的位置
 * @param {HTMLElement} parentEle 和需要重置位置的伸缩节点拥有同一个直接父节点的 .treeParentClassName 节点
 */
function computedShrinkPosition(parentEle) {
    // 当前 treeParentClassName 节点的下一个兄弟节点就是控制伸缩的节点
    const stretchNodeEle = parentEle.nextElementSibling;
    // if (stretchNodeEle) {
    //   stretchNodeEle.style.transform = `translateY(${parentEle.offsetTop +
    //     parentEle.offsetHeight / 2 -
    //     stretchNodeEle.offsetHeight / 2}px)`;
    // }
}
/**
 * 计算当前节点下所有直接子节点竖向连接线的位置和高度
 * @param {HTMLElement} parentEle 和需要计算位置和高度的竖向连接线隶属于的 .treeChildrenClassName 节点拥有同一个直接父节点的 .treeParentClassName 节点
 */
export function resetChildenVline(parentEle) {
    // 当前节点的下下个兄弟节点，就是当前节点的子节点所在的容器
    const accountsChildrenEle = parentEle.nextElementSibling.nextElementSibling;
    const treeNodeEle = getEleByClassName(accountsChildrenEle, treeNodeClassName);
    const treeNodes = getSiblings(treeNodeEle);
    // 说明只有0个或者1个子节点，不需要竖向连接线，也就不需要计算竖向连接线的位置和高度了
    if (treeNodes.length <= 1)
        return;
    computedConnectVLine(
        treeNodeEle,
        treeNodes[treeNodes.length - 1],
        getEleByClassName(accountsChildrenEle, connectLineClassName),
    );
}
/**
 * 计算竖向连接线的高度及其位置
 * @param {HTMLElement} firstTreeNodeEle 竖向连接线连接的子节点集合中的第一个子节点所在的 treeNode 节点
 * @param {HTMLElement} lastTreeNodeEle 竖向连接线连接的子节点集合中的最后一个子节点所在的 treeNode 节点
 * @param {HTMLElement} connectLineEle 竖向连接线节点
 */
function computedConnectVLine(
    firstTreeNodeEle,
    lastTreeNodeEle,
    connectLineEle,
) {
    // 第一个子节点
    const firstNodeEle = getEleByClassName(firstTreeNodeEle, treeParentClassName);
    // 最后一个子节点
    const lastNodeEle = getEleByClassName(lastTreeNodeEle, treeParentClassName);
    const firstNodeEleRect = firstNodeEle.getBoundingClientRect();
    const lastNodeEleRect = lastNodeEle.getBoundingClientRect();
    // 根据第一个子节点和最后一个子节点的位置和尺寸关系，计算出 connectLineEle 的位置和高度
    connectLineEle.style.transform = `translateY(${firstNodeEleRect.height / 2 + firstNodeEle.offsetTop
    }px)`;
    connectLineEle.style.height
		= lastNodeEleRect.bottom
		- firstNodeEleRect.top
		- firstNodeEleRect.height / 2
		- lastNodeEleRect.height / 2
		+ 'px';
}
/**
 * 更新当前层所有 .treeParentClassName 元素的位置
 * @param {HTMLElement|null} treeNode 状态发生了变化的 treeNode 节点
 */
function updateParentElesPosition(treeNode) {
    const eles = [];
    let prevTreeNode = treeNode;
    // 获取其所有层级下被展开子节点 treeNode
    let accountsChildrenEle = getEleByClassName(
        prevTreeNode,
        treeChildrenClassName,
    );
    // 只获取被展开的子节点（没被展开的肯定也就不需要关心位置了）
    while (accountsChildrenEle && accountsChildrenEle.style.display !== 'none') {
        eles.push(
            getEleByClassName(
                accountsChildrenEle,
                treeNodeClassName,
                treeParentClassName,
            ),
        );
        accountsChildrenEle = getEleByClassName(
            accountsChildrenEle,
            treeNodeClassName,
            treeChildrenClassName,
        );
    }
    // 获取同层上级父节点 treeNode
    while (prevTreeNode && isFirstTreeNode(prevTreeNode)) {
        eles.push(getEleByClassName(prevTreeNode, treeParentClassName));
        prevTreeNode = getHighTreeNode(prevTreeNode);
    }
    if (prevTreeNode) {
        eles.push(getEleByClassName(prevTreeNode, treeParentClassName));
    }
    computedParentElesPosition(eles);
}
/**
 * 更新当前 treeNode 所能影响到的所有伸缩节点的位置
 * @param {HTMLElement|null} treeNode 状态发生了变化的 treeNode 节点
 */
function updateShrinkPosition(treeNode) {
    let currentTreeNode = treeNode;
    const parentEles = [];
    // 父元素
    while (currentTreeNode) {
        parentEles.push(getEleByClassName(currentTreeNode, treeParentClassName));
        currentTreeNode = getHighTreeNode(currentTreeNode);
    }
    // 同层子元素
    currentTreeNode = getLowTreeNode(treeNode);
    while (currentTreeNode) {
        parentEles.push(getEleByClassName(currentTreeNode, treeParentClassName));
        currentTreeNode = getLowTreeNode(currentTreeNode);
    }
    parentEles.forEach(computedShrinkPosition);
}
/**
 * 更新当前 treeNode 所能影响到的所有竖向连接线的高度和位置
 * @param {HTMLElement|null} treeNode treeNode元素
 */
function updateConnectVLine(treeNode) {
    let currentTreeNode = treeNode;
    const siblingsTreeNodes = [];
    // currentTreeNode存在，并且不是最顶层的 treeNode（最顶层的 treeNode 肯定没有父级了，也就不会被父级的竖向连接线所连接，所以不需要考虑对父级竖向连接线的影响）
    while (currentTreeNode && !isRootTreeNode(currentTreeNode)) {
        pushSiblingsTreeNodes(currentTreeNode, siblingsTreeNodes);
        currentTreeNode = getHighTreeNode(currentTreeNode);
    }
    // 继续查找同层子 treeNode
    currentTreeNode = getLowTreeNode(treeNode);
    while (currentTreeNode) {
        pushSiblingsTreeNodes(currentTreeNode, siblingsTreeNodes);
        currentTreeNode = getLowTreeNode(currentTreeNode);
    }
    siblingsTreeNodes.forEach((item) =>
        computedConnectVLine(
            item.firstTreeNodeEle,
            item.lastTreeNodeEle,
            item.connectLineEle,
        ));
}
/**
 * 更新 siblingsTreeNodes
 * @param {HTMLElement} currentTreeNode
 * @param {any[]} siblingsTreeNodes
 */
function pushSiblingsTreeNodes(currentTreeNode, siblingsTreeNodes) {
    const siblings = getSiblings(currentTreeNode);
    if (siblings.length > 1) {
        // 如果兄弟节点数量大于 1，那么说明这个 treeNode 字节点肯定存在同为 treeNode的兄弟节点，也肯定存在竖向连接线节点
        // 其父节点下的第一个节点肯定是竖向连接线节点
        // 0 是 竖向连接线， 1 才是第一个 treeNode
        siblingsTreeNodes.push({
            firstTreeNodeEle: siblings[1],
            lastTreeNodeEle: siblings[siblings.length - 1],
            connectLineEle: siblings[0],
        });
    }
}

/**
 * 获取所有兄弟节点(按照子节点在父节点中的前后顺序，包括自身)
 * @param {HTMLElement|null} ele 节点元素
 * @returns {HTMLElement[]}
 */
function getSiblings(ele) {
    if (!ele)
        return [];
    const eles = [];
    let rootEle = ele;
    // 移动到第一个兄弟节点
    while (rootEle.previousElementSibling) {
        rootEle = rootEle.previousElementSibling;
    }
    while (rootEle) {
        eles.push(rootEle);
        rootEle = rootEle.nextElementSibling;
    }
    return eles;
}
/**
 * 根据当前 treeNode 元素查找上一层的 treeNode（treeNode 指的是 className 为 treeNodeClassName，即 <accounts-tree-node /> 组件的顶层DOM节点）
 * @param {HTMLElement} treeNode 当前 treeNode 节点
 */
function getHighTreeNode(treeNode) {
    const highTreeNode
		= treeNode.parentElement && treeNode.parentElement.parentElement;
    if (
        highTreeNode
		&& highTreeNode.className.indexOf(treeNodeClassName) !== -1
    ) {
        return highTreeNode;
    }
    return null;
}

/**
 * 根据当前 treeNode 元素，查找第一个子 treeNode（并且 display 不能是 none）
 * @param {HTMLElement} treeNode
 */
function getLowTreeNode(treeNode) {
    const lowChildren = getEleByClassName(treeNode, treeChildrenClassName);
    if (lowChildren && lowChildren.style.display !== 'none') {
        return getEleByClassName(lowChildren, treeNodeClassName);
    }
    return null;
}
/**
 * 传入的参数节点是否是其父节点下第一个 treeNode 节点
 * @param  treeNode treeNode节点
 */
function isFirstTreeNode(treeNode) {
    const prevTreeNode = treeNode.previousElementSibling;
    // 是其父节点的第一个子节点，并且没有上一个兄弟节点（这种情况下，treeNode就是顶层节点），
    // 或者存在兄弟 treeNode 节点，并且是第一个 treeNode 节点（这种情况下，treeNode节点的第一个节点就是竖向连接线节点 .connectLineClassName）
    // 都认为是第一个 treeNode 节点
    return (
        !prevTreeNode
		|| (prevTreeNode
			&& prevTreeNode.className.indexOf(connectLineClassName) !== -1)
    );
}

/**
 * 传入的节点是否是根 treeNode 节点
 * @param {HTMLElement} treeNode treeNode
 */
function isRootTreeNode(treeNode) {
    // 根节点肯定不是其他 treeNode 的子节点
    return treeNode.parentElement.className.indexOf(treeChildrenClassName) === -1;
}

export function isOpened(treeNode) {
    return treeNode.getAttribute('data-' + dataOpened.key) === dataOpened.expand;
}

function setDataOpened(treeNode) {
    treeNode.setAttribute('data-' + dataOpened.key, dataOpened.expand);
}
