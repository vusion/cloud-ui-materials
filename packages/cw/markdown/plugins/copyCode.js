export default function copy(options) {
  function createElement(tag, innerHTML, className, id) {
    const element = document.createElement(tag);
    element.className = className;
    id ? (element.id = id) : "";
    element.innerHTML = innerHTML;
    return element;
  }
  function copyCode(node, pre) {
    node.onclick = () => {
      let str = pre.querySelector('code').textContent;
      navigator.clipboard.writeText(str).then(
        () => {
          function handleMouseOut() {
            node.innerText = options.copyText;
            node.classList.remove("copy-success");
            node.removeEventListener("mouseout", handleMouseOut);
          }

          // 添加鼠标移出事件监听器
          node.addEventListener("mouseout", handleMouseOut);

          node.classList.add("copy-success");
          options.copySuccess ? options.copySuccess(str) : "";
          node.innerText = "复制成功";
        },
        () => {
          options.copyError ? options.copyError() : "";
        }
      );
    };
  }
  return {
    viewerEffect({ markdownBody }) {
      (async (markdownBody) => {
        const els = markdownBody.querySelectorAll("pre");
        els.forEach((el) => {
          const operateBtn = createElement("div", "", "operate-btn");
          operateBtn.classList.add("operate-btn");
          // lang
          const lang = el.querySelector('code').result ? (el.querySelector('code').result.language || 'bash') : 'bash'
          if (lang) {
            const langBtn = createElement("span", lang, "lang-btn");
            operateBtn.appendChild(langBtn);
          }
          el.appendChild(operateBtn);
          // copy
          let copyEl = createElement("span", options.copyText, "copy-btn");
          operateBtn.appendChild(copyEl);
          copyCode(copyEl, el);
        });
      })(markdownBody);
    },
  };
}
