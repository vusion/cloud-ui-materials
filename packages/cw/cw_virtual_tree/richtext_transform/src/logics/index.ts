import '@nasl/types';

export {};

/**
 * @NaslLogic
 * @type both
 * @title 内容转化
 * @desc 内容转化
 * @param str 参数描述
 * @returns 返回结果描述
 */
export function transform(richText: nasl.core.String) {
  const stripHTML = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return stripHTML(richText);
}
