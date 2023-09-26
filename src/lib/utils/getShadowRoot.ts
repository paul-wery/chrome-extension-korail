import { ROOT_ID } from '../constants';

export function getShadowRoot() {
  return document.getElementById(ROOT_ID)!.shadowRoot!;
}
