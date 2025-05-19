// import { pp } from "@popo-bridge/web";
import '@nasl/types';
declare global {
  interface Window {
    jsBridge: {
      callHandler: Function;
    };
    ReactNativeWebView: {
      postMessage: Function;
    };
  }
}
function jsBridgeCreator() {
  window.jsBridge = {
    callHandler: function (name, data) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: '$$bridge',
          data: {
            method: name,
            params: data,
          },
        }),
      )
    }
  }
}
/**
 * @NaslLogic
 * @type both
 * @title 打开POPO聊天会话
 * @desc 打开与指定用户或群的POPO聊天会话窗口
 * @param id: nasl.core.String
 * @param defaultMessage?: nasl.core.String
 * @returns Promise<nasl.core.Boolean>
 */
export async function openPopoChat(
  /** 用户ID或群ID */
  id: nasl.core.String,
  /** 默认消息内容 */
  defaultMessage?: nasl.core.String,
) {
  try {
    if(!window?.jsBridge?.callHandler) {
      jsBridgeCreator();
    }
    const info = {
      guid: id,
      message: defaultMessage,
    }
    window.jsBridge.callHandler('OA_OPEN_FLOW', 'OPEN_POPO::' + JSON.stringify(info));
  } catch (err) {
    console.error('Failed to open POPO chat:', err);
    return false;
  }
}

export default {
  openPopoChat
};