import axios from 'axios';
import token from './token';

export const apiVersion = '2020-06-01';

export const formatContentType = (contentType, data) => {
    const map = {
        'application/x-www-form-urlencoded'(data) {
            return queryString.stringify(data);
        },
    };
    return (map[contentType] && map[contentType](data)) || data;
};


export function request(config) {
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
