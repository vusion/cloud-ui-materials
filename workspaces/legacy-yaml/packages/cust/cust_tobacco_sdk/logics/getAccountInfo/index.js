/**
 * @typedef {Object} Org
 * @property {string} orgncode 部门code
 * @property {string} orgid 部门id
 * @property {string[]} orgnname 部门名称
 * @property {string} unitname 单位名称
 * @property {string} unitid 单位id
 */

/**
 * @typedef {Object} AccountInfo
 * @property {string} mobilephone 手机号
 * @property {string} loginname 用户唯一标识
 * @property {string[]} resources 资源Id数组
 * @property {string} username 用户名
 * @property {Org[]} orgn 所属部门
 */

/**
 * @typedef {Object} AccountInfoReturn
 * @property {string} errcode 返回码，0:正常，2001令牌无效
 * @property {string} errmsg 对返回码的文本描述内容
 * @property {AccountInfo[]} accountinfo 账户信息数组
 */

/**
 * @returns {Object} result
 */
export default async () => {
    if (anyware && anyware.runtime && anyware.runtime.getAccountInfo) {
        result = await new Promise((res, rej) =>
            anyware.runtime.getAccountInfo({
                onSuccess: res,
                onFail: rej,
            })
        );
    } else {
        throw new Error('anyware.runtime.getAccountInfo方法没有成功加载');
    }
};
