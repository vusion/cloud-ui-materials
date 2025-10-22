/**
 * @typedef {Object} Loc
 * @property {string} province POI所在省会，可能为空
 * @property {string} provinceCode POI所在省会编码，可能为空
 * @property {string} city POI所在城市，可能为空
 * @property {string} cityCode POI所在城市编码，可能为空
 * @property {string} adName POI所在区名称，可能为空
 * @property {string} adCode POI所在区编码，可能为空
 * @property {string} distance POI与设备位置的距离
 * @property {string} postCode POI的邮编，可能为空
 * @property {string} snippet POI的街道地址，可能为空
 * @property {string} title POI的名称
 * @property {number} latitude POI的纬度
 * @property {number} longitude POI的经度
 */

/**
 * @param {Object} options <false>
 * @returns {Object} result
 */
export default async (options) => {
    if (dd && dd.biz && dd.biz.map && dd.biz.map.locate) {
        result = await new Promise((res, rej) =>
            dd.biz.map.locate({
                ...options,
                onSuccess: res,
                onFail: rej,
            })
        );
    } else {
        throw new Error('dd.biz.map.locate方法没有成功加载');
    }
};

//  * @param {string} options.scope <false> 限制搜索POI的范围；设备位置为中心，scope为搜索半径
//  * @param {number} options.latitude <false> 纬度
//  * @param {number} options.longitude <false> 经度
//  * @returns {Loc} result
