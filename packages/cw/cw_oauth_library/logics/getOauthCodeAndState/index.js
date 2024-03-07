/**
 * @returns {object} result
 */
export default () => {
    // TODO
    const isInFrame = window.parent !== window;
    if (!isInFrame) {
        const search = window.location.search.slice(1);
        const tmp = Array.from(new URLSearchParams(search).entries()).reduce(
            (acc, [k, v]) => {
                acc[k] = v;
                return acc;
            },
            {}
        );
        return Object.assign(
            tmp,
            !tmp.code &&
                tmp.authCode && {
                    code: tmp.authCode,
                }
        );
    } else {
        window.parent.location.href = window.location.href;
    }
};
