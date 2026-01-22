import '@nasl/types';

import { pp } from '@popo-bridge/web';


declare global {
  interface Window {
    __popo__: typeof pp;
  }
}
window.__popo__ = pp;
/**
 * @NaslLogic
 * @type both
 * @title 唤起选人
 * @desc 请在这里添加描述
 * @param image 
 * @param text 
 * @returns return
 */
export function chooseContactsAndSendMessage(
  image?: nasl.core.String,
  text: nasl.core.String = '',
) {
  pp.chooseContactsAndSendMessage({
    defaultSession: {
      sessionId: '',
      sessionType: 0,
    },
    message: {
      image,
      text,
    },
  });
}

/**
 * @NaslLogic
 * @type both
 * @title 唤起选人组件
 * @desc 唤起选人组件，并给指定的联系人发送网页链接
 * @param url 
 * @param urlTitle 
 * @returns return
 */
export async function chooseContactsAndSendUrl(
  url?: nasl.core.String,
  urlTitle?: nasl.core.String,
)  {
  const result = await pp.chooseContactsAndSendUrl({
    url: (url as unknown as string) ?? 'https://www.163.com/',
    urlTitle: (urlTitle as unknown as string) ?? '设置的Title',
  });
}

/**
 * @NaslLogic
 * @type both
 * @title shareAppToFriend
 * @desc 分享小程序给好友
 * @param shmobileurl 
 * @param shtitle 
 * @param shcontent 
 * @param shpcurl 
 * @param shiconurl 
 * @returns return
 */
export function shareAppToFriend(
  shmobileurl?: nasl.core.String,
  shtitle?: nasl.core.String,
  shcontent?: nasl.core.String,
  shpcurl?: nasl.core.String,
  shiconurl?: nasl.core.String,
) {
  pp.shareAppToFriend({
    shmobileurl,
    shtitle,
    shcontent,
    shpcurl,
    shiconurl,
  });
}

/**
 * @NaslLogic
 * @type both
 * @title navigateBack
 * @desc 关闭当前页面，返回上一页面
 */
export function navigateBack() {
  pp.navigateBack();
}

/**
 * @NaslLogic
 * @type both
 * @title share
 * @desc 分享到POPO聊天会话
 * @param mobileurl 
 * @param title 
 * @param content 
 * @param contentUrl 
 * @returns result
 */
export async function share(
  mobileurl?: nasl.core.String,
  title?: nasl.core.String,
  content?: nasl.core.String,
  contentUrl?: nasl.core.String,
): Promise<boolean> {
    const isShared = await pp.share({
      mobileurl,
      title: (title as unknown as string) ?? '分享标题',
      content: (content as unknown as string) ?? '分享内容',
      contentUrl: (contentUrl as unknown as string) ?? 'https://www.163.com/',
    });
    return isShared;
}

/**
 * @NaslLogic
 * @type both
 * @title getPlatformInfo
 * @desc 获取系统信息
 * @returns result
 */
export async function getPlatformInfo() :Promise<nasl.core.String> {
  const platformInfo = await pp.getPlatformInfo();
  return JSON.stringify(platformInfo) as nasl.core.String;
}

/**
 * @NaslLogic
 * @type both
 * @title login
 * @desc 调用login获取登录凭证code
 * @returns result
 */
export async function login():Promise<nasl.core.String>  {
  const code = await pp.login();
  return code as nasl.core.String; 
}

/**
 * @NaslLogic
 * @type both
 * @title startWebView
 * @desc 打开原生WebView
 * @param url 网页链接
 * @returns 返回结果描述
 */
export function startWebView(url: nasl.core.String) {
  pp.startWebView({ url, params: {}, headers: {} });
}

/**
 * @NaslLogic
 * @type both
 * @title downloadFile
 * @desc 下载文件到本地
 * @param url 这是一个描述
 * @param path 这是一个描述
 * @returns return
 */
export async function downloadFile(
  url?: nasl.core.String,
  path?: nasl.core.String,
): Promise<nasl.core.String> {
    const result = await pp.downloadFile({
      url: (url as unknown as string) ?? 'https://www.163.com/',
      headers: {},
      path,
      onprogress: (progress: any) => {
        console.log('progress:', progress);
      },
    });

    if (!result.success) {
      throw new Error('下载失败');
    }

    await pp.previewFile({ path: result.uri });
    return result.uri as nasl.core.String;
}
