/**
 * @param {string} options <false> 这是一个描述
 * @returns {string} result
 */
export default (res, rej, options) => {
    // TODO
    tt.chooseContact({
        ...options,
        success(v) {
            res(v);
        },
        fail(err) {
            rej(err);
        },
    });
};
