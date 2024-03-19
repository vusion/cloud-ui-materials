const fsp = require('fs/promises');

const getPackageInfo = async () => {
    const packageRaw = await fsp.readFile('./package.json', 'utf-8');
    const { title } = JSON.parse(packageRaw);
    return {
        title,
    };
};

const getSchema = async ({ title }) => {
    const schemaRawStr = await fsp.readFile(
        './configuration/raw.json',
        'utf-8'
    );
    const schemaRaw = JSON.parse(schemaRawStr);
    const schema = Object.entries(schemaRaw).reduce(
        (acc, [type, paramNames]) => {
            const TYPE = type.toUpperCase();
            return acc.concat(
                paramNames.map((name) => {
                    const NAME = name.toUpperCase();
                    const FULL_NAME = `${TYPE}_${NAME}`;
                    return { type, name, fullName: FULL_NAME };
                })
            );
        },
        []
    );
    const configuration = schema.map(({ type, name, fullName }) => ({
        name: fullName,
        description: `${title}使用的${type}对应的${name}`,
        values: [
            {
                env: 'dev',
                value: '',
            },
            {
                env: 'online',
                value: '',
            },
        ],
    }));
    await fsp.writeFile(
        './configuration/index.json',
        JSON.stringify(configuration),
        'utf-8'
    );
};

const main = async () => {
    const info = await getPackageInfo();
    await getSchema(info);
};
main().then((e) => {
    console.error(e);
});
