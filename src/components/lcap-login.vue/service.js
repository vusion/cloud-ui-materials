
import { request, apiVersion, formatContentType } from './request';

export default {
    getConfig(config) {
        const { url, params, ...rest } = config;
        return request({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: { ...params },
            ...rest,
        });
    },
    getTenantLoginTypes(config) {
        const { url, params, ...rest } = config;
        return request({
            url,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: { ...params },
            ...rest,
        });
    },
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
        const { url, headers, params, body, ...rest } = config;
        const Headers = { 'Content-Type': 'application/json', ...headers };
        
        return request({
            url,
            method: 'POST',
            headers: Headers,
            params: { Action: 'IcbcLogin', Version: apiVersion, ...params },
            data: formatContentType(Headers['Content-Type'], body),
            ...rest,
        });
    },
};
