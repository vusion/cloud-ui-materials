import SDK from '@yxim/nim-web-sdk';

export const singleton = (() => {
    let instance = null;
    let msgs = [];
    let manualMsgMap = new Map();
    let callbacks = [];

    return {
        attachToRoom,
        connect,
        destroy,
        disconnect,
        initRoom,
        getInstance,
        onMsg,
    };

    function attachToRoom(_fn) {
        let fnImpl = _fn;
        if (typeof _fn === 'object' && Array.isArray(_fn.current)) {
            fnImpl = (ms, addedMs) => {
                const arr = _fn.current;
                if (addedMs) {
                    arr.splice(arr.length, 0, ...addedMs); // no reactive?
                    // addedMs.forEach((m) => {
                    //     arr.push(m);
                    // });
                    return;
                }
                let i = 0;
                const arrLen = arr.length;
                const msLen = ms.length;
                while (i < arrLen && i < msLen) {
                    if (arr[i] === ms[i]) {
                        arr[i].status = ms[i].status;
                    } else {
                        Object.assign(arr[i], ms[i]);
                    }
                    ++i;
                }
                while (i < msLen) {
                    arr.push(ms[i]);
                    ++i;
                }
                if (i < arrLen) {
                    arr.splice(i);
                }
            };
        }

        let flag = false;
        const fn = (...args) => {
            flag = true;
            return fnImpl(...args);
        };

        callbacks.push(fn);
        Promise.resolve().then(() => {
            if (!flag) {
                fn(msgs);
            }
        });
        return () => {
            callbacks = callbacks.filter((cb) => cb !== fn);
        };
    }
    async function initRoom(options) {
        console.log('🚀 ~ file: instance.js:61 ~ initRoom ~ options:', options);
        if (instance) {
            destroy();
        }
        await new Promise((res, rej) => {
            const ins = SDK.Chatroom.getInstance({
                ...options,
                onmsgs: onMsg,
                onconnect: () => {
                    instance = ins;
                    getHistoryMsgs().then(() => {
                        res();
                    }, rej);
                },
            });
        });
    }
    function getInstance() {
        if (!instance)
            throw new Error('未初始化Room实例，请先调用[enterRoom]方法');
        return instance;
    }

    async function destroy() {
        if (!instance) return;
        disconnect();
        instance.destroy();
        callbacks = [];
        instance = null;
    }

    async function disconnect() {
        msgs = [];
        manualMsgMap.clear();
        if (!instance) return;
        instance.logout();
        instance.disconnect();
    }

    async function getHistoryMsgs() {
        getInstance();
        // todo: 分页查询和去重
        const historyMsgs = await new Promise((res, rej) => {
            instance.getHistoryMsgs({
                reverse: true,
                done: (err, data) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    res(data.msgs);
                },
            });
        });
        msgs = historyMsgs;
        callbacks.forEach((cb) => {
            cb(msgs, undefined); // 重置内容
        });
    }

    async function connect() {
        getInstance();
        await getHistoryMsgs();
    }

    function onMsg(ms, isManual = false) {
        ms = [].concat(ms);

        let isResend = false;
        ms.forEach((m) => {
            if (isManual) {
                m.isManual = true;
            }
            isResend = manualMsgMap.has(m.idClient);
            if (isResend) {
                msgs[manualMsgMap.get(m.idClient)] = m;
            } else {
                if (isManual) {
                    manualMsgMap.set(m.idClient, msgs.length);
                }
                msgs.push(m);
            }
        });

        callbacks.forEach((cb) => {
            cb(msgs, isManual && isResend ? undefined : ms); // 主动发送只会有一个
        });
    }
})();
