
import { request } from '../request';

export default {
    getTenantLoginTypes(config) {
        const { url, params, ...rest } = config;
        const result = request({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: {  ...params },
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
            params: {},
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
            params: { ...params },
            data: formatContentType(Headers['Content-Type'], body),
            ...rest,
        });
    },
};
