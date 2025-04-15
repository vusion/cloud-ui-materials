export const getWavAudioDetail = async (data: {
    url: string;
}): Promise<{ type; numberOfChannels; sampleRate; code; bitPerSample; duration }> => {
    const { url } = data;
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', `${url}?${new Date().getTime()}`, true); // 避免缓存影响
        request.responseType = 'arraybuffer';
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                const audioData = request.response;
                const intArr = new Int8Array(audioData);
                const channelArr = intArr.slice(22, 24);
                const codeArr = intArr.slice(20, 22);
                const sampleRateArr = intArr.slice(24, 28);
                const bitPerSampleArr = intArr.slice(34, 36);

                const type = String.fromCharCode.apply(
                    null,
                    intArr.slice(8, 16) as unknown as number[]
                );
                const numberOfChannels = (channelArr[0] & 0xff) | ((channelArr[1] & 0xff) << 8);
                const code = (codeArr[0] & 0xff) | ((codeArr[1] & 0xff) << 8);
                const sampleRate =
                    (sampleRateArr[0] & 0xff) |
                    ((sampleRateArr[1] & 0xff) << 8) |
                    ((sampleRateArr[2] & 0xff) << 16) |
                    ((sampleRateArr[3] & 0xff) << 24);
                const bitPerSample =
                    (bitPerSampleArr[0] & 0xff) | ((bitPerSampleArr[1] & 0xff) << 8);
                // 计算时长  
                const dataSizeArr = intArr.slice(40, 44);
                const dataChunkSize = 
                    (dataSizeArr[0] & 0xff) |
                    ((dataSizeArr[1] & 0xff) << 8) |
                    ((dataSizeArr[2] & 0xff) << 16) |
                    ((dataSizeArr[3] & 0xff) << 24);
                
                const byteRate = sampleRate * numberOfChannels * (bitPerSample / 8);
                const duration = byteRate ? Number((dataChunkSize / byteRate).toFixed(3)) : 0; 

                // 格式：type  声道数：numberOfChannels 编码：code  采样率：sampleRate  采样位数： bitPerSample  时长：duration

                resolve({ type, numberOfChannels, sampleRate, code, bitPerSample, duration });
            } else {
                reject(request.statusText);
            }
        };
        request.onerror = () => reject(request.statusText);
        request.send();
    });
};