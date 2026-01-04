import { iconProductPath } from '@/config';
export function stoB(str, type = 'image/svg+xml') {
  return new Blob([str], { type });
}

export function simpleColor(svg) {
  const temp1 = svg.replace(/(fill=)("([\s\S]*?)")/g, (p1, p2) => {
    return `${p2}"currentColor"`;
  });
  const temp2 = temp1.replace(/(fill:)(([\s\S]*?);)/g, (p1, p2) => {
    return `${p2}currentColor;`;
  });

  // 如何这个svg里面没有fill属性，那么就加上fill:currentColor，避免设置颜色不生效
  if (temp2.indexOf('fill') === -1) {
    return temp2.replace(/<svg/, '<svg fill="currentColor"');
  }

  return temp2;
}

export function getName(name, list = []) {
  const item = list.find((v) => v.font_class === name);
  // create和添加图标重复，兼容下掉的create图标返显选择框
  if (name === 'create') {
    return '添加';
  }
  return name && ((item && item.name) || '默认');
}

export function toName(name, list = []) {
  const item = list.find((v) => v.name === name);
  return name && ((item && item.font_class) || 'default');
}

export function isSvgUrl(name) {
  return name && name.startsWith('//') && /\.svg/i.test(name);
}

// 获取图标存储地址
export function getIconSrc(iconImg) {
  // 1.以/upload/开头
  if (iconImg?.startsWith('/upload/')) {
    return `${iconProductPath}${iconImg}`;
  }
  // 2.以//lcap-static-saas开头
  else if (iconImg?.startsWith('//lcap-static-saas')) {
    return `https:${iconImg}`;
  }
  return iconImg; // Fallback for cases not covered
}

export function isSameUrl(url1, url2) {
  const removeProtocol = (urlParam) => {
    return urlParam?.replace(/^https:?/, '').replace(/^http:?/, '');
  };
  if (/^[https:|http:]/.test(url1)) {
    return url1 === url2;
  } else {
    return removeProtocol(url1) === removeProtocol(url2);
  }
}
