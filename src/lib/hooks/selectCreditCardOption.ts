import { BookingModel } from '@root/src/types/booking-model';
import { useCallback, useEffect, useState } from 'react';
import { getElement, selectors } from '../utils/getElement';
import { LocalStorageKey, getLocalStorageItem } from '../utils/localStorage';
import { YesNo } from '@root/src/types';
import { retry } from '../utils/retry';

export function useSelectCreditCardOption() {
  const [filling, setFilling] = useState(false);

  const callback = useCallback(async () => {
    const form = JSON.parse(
      getLocalStorageItem(LocalStorageKey.FORM)
    ) as BookingModel;

    const overseasCB = getElement(selectors.overseasCB);
    const koreanCB = getElement(selectors.koreanCB);

    if (form.koreanCreditCard === YesNo.Yes) {
      koreanCB.click();
    } else {
      overseasCB.click();
    }

    const submit = getElement(selectors.submit3) as unknown as HTMLLinkElement;
    const href = submit.href;

    submit.href = '#';
    submit.setAttribute('onclick', href);
    submit.click();
  }, []);

  useEffect(() => {
    if (!filling) {
      setFilling(true);
      retry(callback);
    }
  }, []);
}
