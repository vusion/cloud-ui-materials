/**
 * @param {string} account <false> 操作描述
 */
export default (account) => {
    if (anyware && anyware.util && anyware.util.addBizAccessLog) {
        anyware.util.addFunAccessLog({
            account,
        });
    } else {
        throw new Error('anyware.util.addFunAccessLog方法没有成功加载');
    }
};
