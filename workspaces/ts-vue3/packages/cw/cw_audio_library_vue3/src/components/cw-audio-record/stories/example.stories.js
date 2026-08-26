import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'cw-audio-record-examples',
  title: '组件列表/CwAudioRecord/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-audio-record': Component,
    },
    setup() {
      const audioRecord = ref(null);

      function startRecord() {
        audioRecord.value?.startRecord();
      }
      function pauseRecord() {
        audioRecord.value?.pauseRecord();
      }
      function resumeRecord() {
        audioRecord.value?.resumeRecord();
      }
      function stopRecord() {
        audioRecord.value?.stopRecord();
      }
      function downloadPCM() {
        audioRecord.value?.downloadPCM();
      }
      function downloadWAV() {
        audioRecord.value?.downloadWAV();
      }
      function downloadMP3() {
        audioRecord.value?.downloadMP3();
      }
      function upload() {
        audioRecord.value?.uploadRecord();
      }

      return {
        audioRecord,
        startRecord,
        pauseRecord,
        resumeRecord,
        stopRecord,
        downloadPCM,
        downloadWAV,
        downloadMP3,
        upload,
      };
    },
    template: `
      <div>
        <div style="display: flex; flex-direction: column;">
          <el-button @click="startRecord">开始录音</el-button>
          <el-button @click="pauseRecord">暂停录音</el-button>
          <el-button @click="resumeRecord">恢复录音</el-button>
          <el-button @click="stopRecord">停止录音</el-button>
          <el-button @click="downloadPCM">下载PCM格式录音</el-button>
          <el-button @click="downloadWAV">下载WAV格式录音</el-button>
          <el-button @click="downloadMP3">下载MP3格式录音</el-button>
          <el-button @click="upload">上传录音</el-button>
        </div>
        <cw-audio-record ref="audioRecord"></cw-audio-record>
      </div>
    `,
  }),
};
