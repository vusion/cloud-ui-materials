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

// 动态加载音乐元数据解析器
export const loadMusicMetadata = async () => {
  if (!window.$musicMetadata) {
    const { parseWebStream } = await import('https://cdn.jsdelivr.net/npm/music-metadata@11.8.3/+esm');
    window.$musicMetadata = parseWebStream;
    return parseWebStream;
  }
  return window.$musicMetadata;
};

export const getAudioDetail = async (data: { url: string }) => {
  try {
    const { url } = data;
    const response = await fetch(url);

    const contentLength = response.headers.get('Content-Length');
    const size = contentLength ? parseInt(contentLength, 10) : undefined;
    const parseWebStream = await loadMusicMetadata();
    const metadata = await parseWebStream(response.body, {
      mimeType: response.headers.get('Content-Type'),
      size,
    });

    return metadata;
  } catch (error) {
    console.error('解析音频信息失败: ', error.message);
  }
};
