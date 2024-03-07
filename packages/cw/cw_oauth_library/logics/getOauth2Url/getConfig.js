import ConfigSchema from '../../configuration/raw.json';

const LIBRARY_NAME = 'cw_oauth_library';

const IS_DEV = !!process.vusionDevEnv;

export const getConfig = (function () {
    const fetcherPromiseForType = {};
    const schema = Object.entries(ConfigSchema).reduce(
        (acc, [type, paramNames]) => {
            const TYPE = type.toUpperCase();
            acc[type] = paramNames.map((name) => {
                const NAME = name.toUpperCase();
                const FULL_NAME = `${TYPE}_${NAME}`;
                return { name, fullName: FULL_NAME };
            });
            return acc;
        },
        {}
    );

    return fetchWitType;

    function getFetcher() {
        if (IS_DEV) {
            return fetcherInDev(schema);
        }
        const legacyMode = true;
        if (legacyMode) return fetcherInLegacy(schema);

        // todo: implement logic for dynamic configuration
        return (type) => schema[type];
    }

    function fetchWitType(type, force = false) {
        if (fetcherPromiseForType[type]) {
            if (fetcherPromiseForType[type].batchFlag)
                return fetcherPromiseForType[type];
            if (!force) return fetcherPromiseForType[type];
        }
        const fetcher = getFetcher();
        const promise = fetcher(type);
        promise.batchFlag = true;
        Promise.resolve(() => {
            promise.batchFlag = false;
        });
        fetcherPromiseForType[type] = promise;
        return promise;
    }
})();

// 在yarn dev的时候，直接使用.env.local中定义的值
const fetcherInDev = (schema) =>
    async function (type) {
        return Promise.resolve(
            schema[type].reduce((acc, { name, fullName }) => {
                if (process.vusionDevEnv[fullName])
                    Object.assign(acc, {
                        [name]: process.vusionDevEnv[fullName],
                    });
                return acc;
            }, {})
        );
    };

// 在低版本中，使用依赖库的配置参数
const fetcherInLegacy = (schema) =>
    async function (type) {
        const kvs = await Promise.all(
            schema[type].map(async ({ name, fullName }) => {
                return [
                    name,
                    await fetch(
                        `/api/system/getCustomConfig/${fullName}?group=extensions.${LIBRARY_NAME}.custom`
                    ).then((r) => r.text()),
                ];
            })
        );
        return kvs.reduce((acc, [name, value]) => {
            if (value)
                Object.assign(acc, {
                    [name]: value,
                });
            return acc;
        }, {});
    };
