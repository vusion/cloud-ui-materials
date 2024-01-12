/**
 * @param {string} pcURL <true> pc端跳转地址
 * @param {string} h5URL <true> h5端跳转地址
 * @returns {string} result
 */
export default (pcURL, h5URL) => {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // 检测是否为移动设备
  if (
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    // 移动设备，跳转到h5Url
    window.location.href = h5URL;
  } else {
    // 非移动设备，跳转到pcUrl
    window.location.href = pcURL;
  }
};
