import '@nasl/types';

// Ensure MShare is globally available or import it if it's a module
declare const MShare: any;

export {};

/**
 * @NaslLogic
 * @type both
 * @title 游戏微信分享
 * @desc 初始化微信分享组件并设置分享内容（支持默认值与调试输出）
 *
 * @param title 分享标题
 * @param desc 分享描述
 * @param moments_title 分享朋友圈标题
 * @param url 分享链接
 * @param imgurl 分享封面图地址
 *
 * @returns 无返回值
 */
export function gameWechatShare(
  title: nasl.core.String = '这是默认的分享标题',
  desc: nasl.core.String = '这是默认的分享内容描述',
  moments_title: nasl.core.String = '这是分享朋友圈的标题',
  url: nasl.core.String = 'https://test.nie.163.com/test_html/xy2/163yun/home#myvideo',
  imgurl: nasl.core.String = 'https://webinput.nie.netease.com/img/hd/icon.png'
): void {
  // 判断 MShare 是否存在
  if (typeof MShare === 'undefined') {
    console.error('[gameWechatShare] MShare 未定义，请确认微信分享组件是否已正确引入');
    return;
  }

  // 初始化 MShare
  MShare.init({
    debug: false,
    hideMoments: false,
    hideFriend: false,
    wxapi: [],
    tag: [],
    ready: function () {
      console.log('[MShare] 微信 SDK 已就绪');
    },
    activity: '',
    is_random: false,
  });

  // 设置分享内容
  MShare.setShare({
    is_start: false,
    title,
    desc,
    moments_title,
    url,
    imgurl,
    callback: function (ret) {
      console.log('[MShare] 分享回调信息：', ret);
    },
  });
}

/**
 * @NaslLogic
 * @type both
 * @title 游戏埋点
 * @desc 游戏埋点
 * @param str 参数描述
 * @returns 返回结果描述
 */
export function gameTracker(str: nasl.core.String) {
    
}
