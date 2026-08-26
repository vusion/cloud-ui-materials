import { Mp3Encoder, WavHeader } from '@breezystack/lamejs';

export function convertToMp3(wavDataView: DataView, recorder: {
  getChannelData: () => { left?: ArrayBuffer; right?: ArrayBuffer };
}) {
  const wav = WavHeader.readHeader(wavDataView);
  const { channels, sampleRate } = wav;
  const mp3enc = new Mp3Encoder(channels, sampleRate, 128);
  const result = recorder.getChannelData();
  const buffer: BlobPart[] = [];

  const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
  const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
  const remaining = (leftData?.length ?? 0) + (rightData ? rightData.length : 0);

  const maxSamples = 1152;
  for (let i = 0; i < remaining; i += maxSamples) {
    const left = leftData!.subarray(i, i + maxSamples);
    let mp3buf = null;

    if (channels === 2) {
      const right = rightData!.subarray(i, i + maxSamples);
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
