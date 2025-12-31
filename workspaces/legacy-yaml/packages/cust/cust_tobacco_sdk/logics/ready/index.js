// /**
//  * @param {object} options <false> 这是一个描述
//  * @param {string[]} options.jsApiList <false> 需要使用的web API列表，注意：不要带anyware
//  */

/**
 * @param {Object} options <false> 这是一个描述
 */
export default async (options = {}) => {
    if (anyware && anyware.ready) {
        await new Promise(async (res) =>
            anyware.ready(
                {
                    agentId: await getAgentId(),
                    resourcesId: await getResourcesId(),
                    ...options,
                    jsApiList: [
                        'runtime.permission.requestAuthCode',
                        'runtime.permission.getAccountInfo',
                        'anyware.util.addBizAccessLog',
                        'anyware.util.addFunAccessLog',
                        ...(Array.isArray(options.jsApiList)
                            ? options.jsApiList
                            : []),
                    ],
                },
                () => {
                    res();
                }
            )
        );
    } else {
        throw new Error('anyware.ready 对象没有成功加载');
    }
};

let globalAgentId = null;
async function getAgentId() {
    if (globalAgentId) return agentId;
    globalAgentId = await fetch(
        `/api/system/getCustomConfig/AGENT_ID?group=extensions.cust_tobacco_sdk.custom`
    ).then((r) => r.text());
}

let globalResourcesId = null;
async function getResourcesId() {
    if (globalResourcesId) return globalResourcesId;
    globalResourcesId = await fetch(
        `/api/system/getCustomConfig/RESOURCES_ID?group=extensions.cust_tobacco_sdk.custom`
    ).then((r) => r.text());
}
