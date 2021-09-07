import axios from 'axios';

const apiVersion = '2020-06-01';

function preprocess(res = {}) {
    const { status, data = {}, headers = {} } = res;
    if (String(status).startsWith('2')) {
        return { headers, data };
    }
    return Promise.reject({
        status,
        message: data.Message,
    });
}

export default {
    getTenantLoginTypes(config) {
        const { url, params, ...rest } = config;
        return axios({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: { Action: 'GetTenantLoginTypes', Version: apiVersion, ...params },
            ...rest,
        }).then(preprocess);
    },
    login(config) {
        const { url, ...rest } = config;
        return axios({
            url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params: { Action: 'Login', Version: apiVersion },
            ...rest,
        }).then(preprocess);
    },
};
