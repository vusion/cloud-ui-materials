import ConfigSchema from '../../configuration/raw.json';

const LIBRARY_NAME = 'cw_oauth_library';

const IS_DEV = !!process.vusionDevEnv;

export const getConfig = (function () {
    const fetcherPromiseForType = {};
    const schema = Object.entries(ConfigSchema).reduce(
        (acc, [type, paramNames]) => {
            const TYPE = type.toUpperCase();
            acc[type] = paramNames.map((_name) => {
                const [name, entityNameRaw] = _name.split(':');
                const NAME = name.toUpperCase();
                const FULL_NAME = `${TYPE}_${NAME}`;
                const entityName = (entityNameRaw || name)
                    .split('_')
                    .map((str, idx) => {
                        if (idx === 0) return str;
                        return `${str[0].toUpperCase()}${str.slice(1)}`;
                    })
                    .join('');
                return { name, fullName: FULL_NAME, entityName };
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
        const legacyMode = false;
        if (legacyMode) return fetcherInLegacy(schema);

        // todo: implement logic for dynamic configuration
        return fetcherInProd(schema);
    }

    function fetchWitType(type, data, force = false) {
        if (fetcherPromiseForType[type]) {
            if (fetcherPromiseForType[type].batchFlag)
                return fetcherPromiseForType[type];
            if (!force) return fetcherPromiseForType[type];
        }
        const fetcher = getFetcher();
        const promise = fetcher(type, data);
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
    async function (type, data) {
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

// 当前版本，支持在直接传递config
const fetcherInProd = (schema) =>
    async function (type, data) {
        const redirect_uriRaw = await fetch(
            `/api/system/getCustomConfig/${'REDIRECT_URI'}?group=extensions.${LIBRARY_NAME}.custom`
        ).then((r) => r.text());
        const redirect_uri = redirect_uriRaw || '/page_config/callback';
        let config;
        if (data) {
            config = data;
        } else {
            config = await fetch(`/rest/getConfig?state=${type}`)
                .then((res) => res.json())
                .then((v) => v.data);
        }
        return schema[type].reduce(
            (acc, { name, entityName }) => {
                Object.assign(
                    acc,
                    config[entityName] && {
                        [name]: config[entityName],
                    }
                );
                return acc;
            },
            {
                redirect_uri,
            }
        );
    };
