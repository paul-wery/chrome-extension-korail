export enum LocalStorageKey {
  FORM = 'chrome-extension-korail-form',
}

export function setLocalStorageItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function setLocalStorageKey(key: string) {
  localStorage.setItem(key, key);
}

export function getLocalStorageItem(key: string) {
  return localStorage.getItem(key) || '{}';
}

export function removeLocalStorageItem(key: string) {
  localStorage.removeItem(key);
}
