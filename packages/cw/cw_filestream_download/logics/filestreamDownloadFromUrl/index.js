/**
 * @param {string} url <true> 文件流的url
 * @param {object} fetchOptions <false> 请求的参数
 * @param {string} filename <false> 下载的文件名
 * @returns {null} result
 */

import { saveAs } from 'file-saver';
export default async (url, fetchOptions = {}, filename = 'file.txt') => {
    // TODO
    const blob = await fetch(url, fetchOptions).then((res) => res.blob());
    await saveAs(blob, filename);
    return null;
};
