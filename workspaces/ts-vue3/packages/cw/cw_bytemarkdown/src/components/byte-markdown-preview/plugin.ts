import type { BytemdPlugin } from 'bytemd';

/**
 * 1. 显示代码类型
 * 2. 增加复制代码按钮
 */
export function codeBlockPlugin(): BytemdPlugin {
  const clipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
  const clipboardCheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;
  const successTip = `<span style="font-size: 14px;">复制成功!</span>`;

  return {
    viewerEffect({ markdownBody }) {
      const preElements = Array.from(markdownBody.querySelectorAll('pre'));

      preElements.forEach((el) => {
        const code = el.querySelector('code');
        const langClass = code?.className
          ?.split(' ')
          .find((cs) => cs.startsWith('language'));
        const language = langClass?.split('-')[1]?.split(':')[0];

        el.setAttribute('data-language', language ?? 'unknown');

        if (el.querySelector('.copy-code-button')) {
          return;
        }
        const copyBtn = document.createElement('div');
        copyBtn.setAttribute('class', 'copy-code-button');
        copyBtn.innerHTML = clipboardIcon;

        el.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
          let codeText = el.textContent ?? '';
          if (codeText.startsWith('$')) {
            codeText = codeText.slice(1).trim();
          }

          navigator.clipboard
            .writeText(codeText)
            .then(() => {
              copyBtn.innerHTML = clipboardCheckIcon + successTip;
              window.setTimeout(() => {
                copyBtn.innerHTML = clipboardIcon;
              }, 3000);
            })
            .catch(() => {
              window.alert('复制代码出错');
            });
        });
      });
    },
  };
}

/**
 * 将内容里面的外部链接打开方式为_blank
 */
export function modifyHrefTargetPlugin(): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      Array.from(markdownBody.querySelectorAll('a'))
        .filter((a) => {
          const href = a.getAttribute('href');
          return Boolean(href && href.startsWith('http'));
        })
        .forEach((a) => {
          a.setAttribute('target', '_blank');
        });
    },
  };
}
