import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

if (typeof globalThis !== 'undefined') {
  globalThis.MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === 'json') {
        return new jsonWorker();
      }
      return new editorWorker();
    },
  };
}

let monacoPromise: Promise<typeof import('monaco-editor')> | null = null;

export function getMonaco() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Monaco Editor is only available in browser'));
  }
  if (!monacoPromise) {
    monacoPromise = import('monaco-editor');
  }
  return monacoPromise;
}
