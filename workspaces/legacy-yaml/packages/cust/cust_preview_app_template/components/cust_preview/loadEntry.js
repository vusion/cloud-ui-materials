export const loadScript = function (root, src) {
    const { appInfo: { isPrivatized } = {} } = window;
    const crossorigin = isPrivatized === 'false' ? 'anonymous' : '';

    return new Promise((resolve, reject) => {
        const appendScript = (scriptSrc, crossoriginValue) => {
            const scriptElement = document.createElement('script');

            crossoriginValue && scriptElement.setAttribute('crossorigin', crossoriginValue);
            scriptElement.setAttribute('src', scriptSrc);

            scriptElement.addEventListener('load', () => resolve(), false);
            scriptElement.addEventListener('error', () => {
                if (crossoriginValue) {
                    root.removeChild(scriptElement);
                    appendScript(scriptSrc);
                } else {
                    reject(new Error('js asset loaded error: ' + src));
                }
            });

            root.appendChild(scriptElement);
        };

        appendScript(src, crossorigin);
    });
};

export const loadCSS = function (root, src) {
    return new Promise((resolve, reject) => {
        const element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = src;
        element.addEventListener('error', () => reject(new Error('css asset loaded error: ' + src)), false);
        element.addEventListener('load', () => resolve(), false);
        root.appendChild(element);
    });
};

const appLoadStatus = {};

export const loadScripts = function (scripts) {
    let resolve;
    let reject;
    const scriptLoadStatus = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    const loop = function (src) {
        if (src) {
            if (!appLoadStatus[src]) {
                appLoadStatus[src] = loadScript(document.body, src);
            }
            appLoadStatus[src].then(() => {
                appLoadStatus[src] = Promise.resolve();
                if (scripts.length) {
                    loop(scripts.shift());
                } else {
                    resolve();
                }
            }, (e) => {
                appLoadStatus[src] = null;
                reject(e);
            });
        }
    };
    loop(scripts.shift());
    return scriptLoadStatus;
};

export const loadStyles = function (links) {
    return (links || []).map((src) => {
        if (!appLoadStatus[src]) {
            appLoadStatus[src] = loadCSS(document.head, src).then(() => {
                appLoadStatus[src] = Promise.resolve();
            });
        }
        return appLoadStatus[src];
    });
};

export default function (entry) {
    const scriptLoadStatus = loadScripts([...entry.js]);
    const styleLoadStatus = loadStyles(entry.css);
    return Promise.all([scriptLoadStatus, ...styleLoadStatus]);
}
