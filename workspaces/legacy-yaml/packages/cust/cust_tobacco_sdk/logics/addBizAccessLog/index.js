/**
 * @param {Object} options <false> 这是一个描述
 */
export default (options) => {
    if (anyware && anyware.util && anyware.util.addBizAccessLog) {
        anyware.util.addBizAccessLog({ ...options, begTime: new Date() });
    } else {
        throw new Error('anyware.util.addBizAccessLog方法没有成功加载');
    }
};

//  * @param {object} options <false> 这是一个描述
//  * @param {string} options.account <false> 操作描述
//  * @param {string} options.content <false> 内容，如:零售户许可证编号
//  * @param {string} options.aalX <false> 坐标x
//  * @param {string} options.aalY <false> 坐标y
