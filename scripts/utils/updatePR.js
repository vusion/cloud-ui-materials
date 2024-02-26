const fetch = require('node-fetch');

const pullRequestNumber = process.env.PULL_REQUEST_NUMBER;
const accessToken = process.env.GITHUB_TOKEN;

module.exports.updatePullRequest = async (content) => {
    const body = {
        body: content, // 要更新的 Pull Request 描述
        // 其他可更新的字段...
    };
    console.log('pull number', pullRequestNumber);

    const response = await fetch('https://api.github.com/repos/vusion/cloud-ui-materials/pulls/${pullRequestNumber}', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e);
        });

    // eslint-disable-next-line no-console
    console.log(response.message);
};
