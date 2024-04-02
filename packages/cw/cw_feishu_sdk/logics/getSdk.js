// readme: feishu sdk imported by sciprt element

let promise = null;

export const getSdk = (retryTimes = 3) => {
    if (promise) return promise;

    promise = new Promise((res, rej) => {
        console.log('开始加载飞书sdk...');
        const script = document.createElement('script');
        script.src =
            'https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.16.js';
        script.type = 'text/javascript';

        script.onload = () => {
            if (window.h5sdk) {
                console.log('飞书sdk已经等待ready');
                window.h5sdk.ready(() => {
                    console.log('飞书sdk已经加载');
                    res();
                });
            } else {
                document.head.removeChild(script);
                rej(new Error('当前页面不在飞书容器中'));
            }
        };
        script.onerror = (error) => {
            document.head.removeChild(script);
            rej(error);
        };
        document.head.appendChild(script);
    }).catch((err) => {
        console.log('飞书sdk加载失败');
        console.error(err);
        promise = null;
        if (retryTimes === 0) {
            throw err;
        }
        return getSdk(retryTimes - 1);
    });
    return promise;
};
