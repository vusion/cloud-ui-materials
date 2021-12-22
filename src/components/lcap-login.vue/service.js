import axios from 'axios';
import token from './token';

const apiVersion = '2020-06-01';

export const formatContentType = (contentType, data) => {
    const map = {
        'application/x-www-form-urlencoded'(data) {
            return queryString.stringify(data);
        },
    };
    return (map[contentType] && map[contentType](data)) || data;
};


function request(config) {
    return axios(config)
        .then((res = {}) => {
            const { status, data = {}, headers = {} } = res;
            if ((status + '').startsWith('2')) {
                const { Authorization, authorization } = headers;
                if (Authorization || authorization) {
                    token.set(Authorization || authorization);
                }

                return { headers, data };
            }
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
        const result = request({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: { Action: 'GetTenantLoginTypes', Version: apiVersion, ...params },
            ...rest,
        });
        return result;
    },
    login(config) {
        const { url, headers, ...rest } = config;
        return request({
            url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            params: { Action: 'Login', Version: apiVersion, },
            ...rest,
        });
    },
    OauthLogin(config) {
        const { url, headers, params, body, ...rest } = config;
        const Headers = { 'Content-Type': 'application/json', ...headers };
        return request({
            url,
            method: 'POST',
            headers: Headers,
            params: { Action: 'OauthLogin', Version: apiVersion, },
            data: formatContentType(Headers['Content-Type'], body),
            ...rest,
        });
    },
    IcbcLogin(config) {
        const { url, headers, ...rest } = config;
        return request({
            url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...headers },
            params: { Action: 'IcbcLogin', Version: apiVersion, ...params },
            data: formatContentType(Headers['Content-Type'], body),
            ...rest,
        });
    },
};
