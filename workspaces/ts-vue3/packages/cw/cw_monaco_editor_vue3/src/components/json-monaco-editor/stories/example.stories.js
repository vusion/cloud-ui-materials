import { ref } from 'vue';
import Component from '../index';

const PLACEHOLDER_JSON =
  '{"Requestld":"2daf22fc-9218-47f0-a5f4-ac6be4","Code":200,"Message":"succeed","Data":[{"id":2473278792300288,"customerName":"test","createdTime":"2022-11-01T05:46:51.000Z","isUpdate":false}]}';

export default {
  id: 'json-monaco-editor-examples',
  title: '组件列表/JsonMonacoEditor/示例',
  component: Component,
  parameters: {
    layout: 'padded',
    actions: {
      handles: ['change', 'error', 'onMaxLength', 'update:value'],
    },
  },
  argTypes: {
    value: { description: '内容（双向同步）' },
    attrThreshold: { description: '最大行数，0 表示不限制' },
    placeholder: { description: '空内容时展示的 JSON 样例' },
  },
};

export const Example1 = {
  name: '基本用法',
  render: (args) => ({
    setup() {
      const value = ref(args.value);
      const attrThreshold = ref(args.attrThreshold);
      const placeholder = ref(args.placeholder);
      const editorRef = ref(null);

      const lastChange = ref(null);
      const lastError = ref('');
      const maxLengthCount = ref(0);
      const eventLogs = ref([]);

      function pushLog(type, payload) {
        eventLogs.value.unshift({
          type,
          payload,
          time: new Date().toLocaleTimeString(),
        });
        if (eventLogs.value.length > 10) {
          eventLogs.value.pop();
        }
      }

      function handleChange(payload) {
        lastChange.value = payload;
        pushLog('onChange', payload);
      }

      function handleError(errorMessage) {
        lastError.value = errorMessage;
        pushLog('onError', errorMessage);
      }

      function handleMaxLength() {
        maxLengthCount.value += 1;
        pushLog('onMaxLength', null);
      }

      function reloadEditor() {
        editorRef.value?.loadMonacoEditor();
        pushLog('loadMonacoEditor', '手动重建编辑器');
      }

      function setInvalidJson() {
        value.value = 'not-json';
      }

      function setValidJson() {
        value.value = '{"foo":"bar"}';
      }

      function clearContent() {
        value.value = '';
      }

      function appendLines() {
        const lines = Array.from({ length: 12 }, (_, i) => `  "line${i + 1}": ${i + 1}`).join(',\n');
        value.value = `{\n${lines}\n}`;
      }

      return {
        value,
        attrThreshold,
        placeholder,
        editorRef,
        lastChange,
        lastError,
        maxLengthCount,
        eventLogs,
        handleChange,
        handleError,
        handleMaxLength,
        reloadEditor,
        setInvalidJson,
        setValidJson,
        clearContent,
        appendLines,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; min-width: 800px;">
        <json-monaco-editor
          ref="editorRef"
          v-model:value="value"
          :attr-threshold="attrThreshold"
          :placeholder="placeholder"
          style="width: 100%; --cw-style-height: 340px; --cw-style-width: 100%;"
          @change="handleChange"
          @error="handleError"
          @onMaxLength="handleMaxLength"
        />
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <button
            type="button"
            style="padding: 6px 12px; cursor: pointer;"
            @click="reloadEditor"
          >loadMonacoEditor（重建编辑器）</button>
          <button
            type="button"
            style="padding: 6px 12px; cursor: pointer;"
            @click="setInvalidJson"
          >写入非法 JSON（触发 onError）</button>
          <button
            type="button"
            style="padding: 6px 12px; cursor: pointer;"
            @click="setValidJson"
          >写入合法 JSON</button>
          <button
            type="button"
            style="padding: 6px 12px; cursor: pointer;"
            @click="clearContent"
          >清空内容（展示 placeholder）</button>
          <button
            type="button"
            style="padding: 6px 12px; cursor: pointer;"
            @click="appendLines"
          >写入超行内容（触发 onMaxLength）</button>
        </div>
        <div style="font-size: 13px; color: #666; display: grid; gap: 4px;">
          <div><strong>value</strong>：{{ value || '（空）' }}</div>
          <div>
            <strong>onChange</strong>：
            {{ lastChange ? 'newValue=' + lastChange.newValue + ', oldValue=' + lastChange.oldValue : '—' }}
          </div>
          <div><strong>onError</strong>：{{ lastError || '—' }}</div>
          <div><strong>onMaxLength</strong> 触发次数：{{ maxLengthCount }}</div>
        </div>
        <div
          v-if="eventLogs.length"
          style="font-size: 12px; background: #f5f5f5; padding: 8px; border-radius: 4px; max-height: 160px; overflow: auto;"
        >
          <div style="margin-bottom: 4px; font-weight: 600;">事件 / 方法日志</div>
          <div
            v-for="(log, index) in eventLogs"
            :key="index"
            style="font-family: monospace; line-height: 1.6;"
          >
            [{{ log.time }}] {{ log.type }}:
            {{
              log.payload === null
                ? ''
                : typeof log.payload === 'object'
                  ? JSON.stringify(log.payload)
                  : log.payload
            }}
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    value: '{}',
    attrThreshold: 10,
    placeholder: PLACEHOLDER_JSON,
  },
};
