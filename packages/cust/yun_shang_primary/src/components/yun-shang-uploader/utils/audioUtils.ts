export const getWavAudioDetail = async (data: { url: string }) => {
    const { url } = data;
  
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `${url}?t=${Date.now()}`, true);
      request.responseType = 'arraybuffer';
  
      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          const audioData = request.response;
          const intArr = new Uint8Array(audioData);
  
          const type = String.fromCharCode(...intArr.slice(8, 12));
          const code = intArr[20] | (intArr[21] << 8);
          const numberOfChannels = intArr[22] | (intArr[23] << 8);
          const sampleRate =
            intArr[24] |
            (intArr[25] << 8) |
            (intArr[26] << 16) |
            (intArr[27] << 24);
          const bitPerSample = intArr[34] | (intArr[35] << 8);
  
          // 🔍 动态查找 data chunk
          let dataChunkSize = 0;
          for (let i = 0; i < intArr.length - 8; i++) {
            if (
              intArr[i] === 0x64 && // 'd'
              intArr[i + 1] === 0x61 && // 'a'
              intArr[i + 2] === 0x74 && // 't'
              intArr[i + 3] === 0x61
            ) {
              dataChunkSize =
                intArr[i + 4] |
                (intArr[i + 5] << 8) |
                (intArr[i + 6] << 16) |
                (intArr[i + 7] << 24);
              break;
            }
          }
  
          const byteRate = sampleRate * numberOfChannels * (bitPerSample / 8);
          const duration = byteRate ? Number((dataChunkSize / byteRate).toFixed(3)) : 0;
  
          resolve({
            type,
            numberOfChannels,
            sampleRate,
            code,
            bitPerSample,
            duration,
          });
        } else {
          reject(new Error(`HTTP ${request.status}: ${request.statusText}`));
        }
      };
  
      request.onerror = () => reject(new Error('Network error'));
      request.send();
    });
  };