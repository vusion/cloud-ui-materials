import { singleton } from '../instance';

/**
 * @param {obj} message <false> 这是一个描述
 * @returns {string} result
 */
export default async (message) => {
    const instance = singleton.getInstance();
    await new Promise((res) => {
        const unComplete = instance.sendText({
            ...message,
            resend: true,
            done: (err, obj) => {
                const msg = obj.msg ? obj.msg : obj;
                if (err) {
                    msg.error = err;
                }
                singleton.onMsg(obj, true);
                res();
            },
        });
        singleton.onMsg(unComplete, true);
    });
};
