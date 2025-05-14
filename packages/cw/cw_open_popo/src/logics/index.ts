// import { pp } from "@popo-bridge/web";
import '@nasl/types';
/**
 * @NaslLogic
 * @type both
 * @title 打开POPO聊天会话
 * @desc 打开与指定用户或群的POPO聊天会话窗口
 * @param id: nasl.core.String
 * @param type: nasl.core.Integer
 * @param defaultMessage?: nasl.core.String
 * @returns Promise<nasl.core.Boolean>
 * @example 
 * $library.cw_open_popo.openPopoChat({
 *   id: '123456',
 *   type: 1,
 *   defaultMessage: '你好'
 * });
 */
export async function openPopoChat(
  /** 用户ID或群ID */
  id: nasl.core.String,
  /** 会话类型：1-个人 2-群 3-部门 4-讨论组 5-临时会话 6-服务号 */
  type: nasl.core.Integer,
  /** 默认消息内容 */
  defaultMessage?: nasl.core.String,
) {
  try {
    window.location.href = `netease-popo://start/session?id=${id}&type=${type}${defaultMessage ? `&defaultMessage=${defaultMessage}` : ''}`
  } catch (err) {
    console.error('Failed to open POPO chat:', err);
    return false;
  }
}

export default {
  openPopoChat
};