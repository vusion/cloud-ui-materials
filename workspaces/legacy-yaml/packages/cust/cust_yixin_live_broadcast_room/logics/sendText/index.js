import { singleton } from '../instance';

/**
 * @param {string} text <false> 这是一个描述
 */
export default async (text) => {
    // TODO
    const instance = singleton.getInstance();
    await new Promise((res) => {
        const unComplete = instance.sendText({
            text,
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
