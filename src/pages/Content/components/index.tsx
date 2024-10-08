import { createRoot } from 'react-dom/client';
import App from '@src/pages/content/components/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';
import { ROOT_ID } from '@root/src/lib/constants';

refreshOnUpdate('pages/content');

let isInit = false;

function init() {
  isInit = true;

  const root = document.createElement('div');
  root.id = ROOT_ID;

  document.body?.append(root);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(rootIntoShadow);

  /**
   * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
   *
   * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
   * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
   */
  attachTwindStyle(rootIntoShadow, shadowRoot);

  document.documentElement.style.visibility = 'hidden';
  createRoot(rootIntoShadow).render(<App />);
}

if (document.body) {
  init();
} else {
  const observer = new MutationObserver(() => {
    if (document.body) {
      observer.disconnect();
      if (!isInit) {
        init();
      }
    }
  });
  observer.observe(document.documentElement, { childList: true });
}
