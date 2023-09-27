import { getAllElement } from './getElement';

export function getSelectOptionsFromDOM(selector: string) {
  const options = getAllElement(selector) as HTMLOptionElement[];

  return options.map((option) => ({
    key: option.value,
    value: option.text,
  }));
}
