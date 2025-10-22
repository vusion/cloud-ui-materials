/**
 * @returns {string} result 返回的token
 */
export default async () => {
    if (
        anyware &&
        anyware.runtime &&
        anyware.runtime.permission &&
        anyware.runtime.permission.requestAuthCode
    ) {
        return await new Promise((res, rej) =>
            anyware.runtime.permission.requestAuthCode({
                onSuccess: res,
                onFail: rej,
            })
        );
    } else {
        throw new Error(
            'anyware.runtime.permission.requestAuthCode方法没有成功加载'
        );
    }
};
