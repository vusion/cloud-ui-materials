import axios from 'axios';

const apiVersion = '2020-06-01';

function request(config) {
    return axios(config)
        .then((res = {}) => {
            const { status, data = {}, headers = {} } = res;
            if (String(status).startsWith('2')) {
                return { headers, data };
            }
            return Promise.reject({
                status,
                message: data.Message,
            });
        })
        .catch((err) => {
            if (err.request) {
                const { responseText, status } = err.request;
                let message;
                try {
                    message = JSON.parse(responseText).Message;
                } catch (error) {
                    message = responseText;
                }
                err = { status, message };
            }
            throw err;
        });
}

export default {
    getTenantLoginTypes(config) {
        const { url, params, ...rest } = config;
        return request({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: { Action: 'GetTenantLoginTypes', Version: apiVersion, ...params },
            ...rest,
        });
    },
    login(config) {
        const { url, headers, ...rest } = config;
        return request({
            url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            params: { Action: 'Login', Version: apiVersion },
            ...rest,
        });
    },
};
