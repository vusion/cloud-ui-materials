import { Mp3Encoder, WavHeader } from '@breezystack/lamejs';

export function convertToMp3(wavDataView, recorder) {
  // 获取wav头信息
  const wav = WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
  const { channels, sampleRate } = wav;
  const mp3enc = new Mp3Encoder(channels, sampleRate, 128);
  // 获取左右通道数据
  const result = recorder.getChannelData()
  const buffer = [];

  const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
  const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
  const remaining = leftData.length + (rightData ? rightData.length : 0);

  const maxSamples = 1152;
  for (let i = 0; i < remaining; i += maxSamples) {
      const left = leftData.subarray(i, i + maxSamples);
      let right = null;
      let mp3buf = null;

      if (channels === 2) {
          right = rightData.subarray(i, i + maxSamples);
          mp3buf = mp3enc.encodeBuffer(left, right);
      } else {
          mp3buf = mp3enc.encodeBuffer(left);
      }

      if (mp3buf.length > 0) {
          buffer.push(mp3buf);
      }
  }

  const enc = mp3enc.flush();

  if (enc.length > 0) {
      buffer.push(enc);
  }

  return new Blob(buffer, { type: 'audio/mp3' });
}
