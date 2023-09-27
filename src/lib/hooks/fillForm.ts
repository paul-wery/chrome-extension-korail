import { BookingModel } from '@root/src/types/booking-model';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { getElement, selectors } from '../utils/getElement';
import { LocalStorageKey, setLocalStorageItem } from '../utils/localStorage';

export function useFillForm() {
  const callback = useCallback(async (form: BookingModel) => {
    const departureDate = dayjs.unix(form.departureDate);

    const year = getElement(selectors.year);
    const month = getElement(selectors.month);
    const day = getElement(selectors.day);
    const hour = getElement(selectors.hour);

    year.value = departureDate.year().toString();
    month.value = (departureDate.month() + 1).toString().padStart(2, '0');
    day.value = departureDate.date().toString().padStart(2, '0');
    hour.value = departureDate.hour().toString().padStart(2, '0');

    const from = getElement(selectors.from);
    const to = getElement(selectors.to);

    from.value = form.from;
    to.value = form.to;

    const trainType = getElement(selectors.trainType);

    trainType.value = form.trainType;

    setLocalStorageItem(LocalStorageKey.FORM, JSON.stringify(form));

    const submit = getElement(selectors.submit) as unknown as HTMLLinkElement;
    const href = submit.href;

    submit.href = '#';
    submit.setAttribute('onclick', href);
    submit.click();
  }, []);

  return { trigger: callback };
}
