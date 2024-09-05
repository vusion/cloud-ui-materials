export function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = window.location.origin + window.location.pathname + text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  alert("Link copied to clipboard");
}

function copyLinkPlugin(md, options = {}) {
  // 默认配置
  const defaultOptions = {
    slugify: (text) =>
      text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-"),
    includeLevel: [2, 3], // 默认包含的标题级别
    format: (text) => text, // 默认的格式化方法，原样返回
  };

  // 合并用户传入的配置与默认配置
  const config = { ...defaultOptions, ...options };

  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const level = parseInt(token.tag.slice(1), 10);

    if (!config.includeLevel.includes(level)) {
      return self.renderToken(tokens, idx, options);
    }

    const content = tokens[idx + 1].content;
    const formattedContent = config.format(content);
    const slug = config.slugify(formattedContent);

    token.attrSet("id", slug);

    return (
      self.renderToken(tokens, idx, options) +
      `<copy-link slug="#${slug}" @copied="handleLinkCopied"></copy-link>`
    );
  };
}


export default copyLinkPlugin;
