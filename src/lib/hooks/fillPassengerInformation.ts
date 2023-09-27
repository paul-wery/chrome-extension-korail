import { BookingModel, Gender } from '@root/src/types';
import { useCallback, useEffect, useState } from 'react';
import { getElement, selectors } from '../utils/getElement';
import { LocalStorageKey, getLocalStorageItem } from '../utils/localStorage';
import { retry } from '../utils/retry';

export function useFillPassengerInformation() {
  const [filling, setFilling] = useState(false);

  const callback = useCallback(async () => {
    const form = JSON.parse(
      getLocalStorageItem(LocalStorageKey.FORM)
    ) as BookingModel;

    const genderMr = getElement(selectors.genderMr);
    const genderMme = getElement(selectors.genderMme);
    const firstName = getElement(selectors.firstName);
    const lastName = getElement(selectors.lastName);
    const country = getElement(selectors.country);
    const password = getElement(selectors.password);
    const password2 = getElement(selectors.password2);
    const email = getElement(selectors.email);
    const checkAgree = getElement(selectors.checkAgree);

    if (form.gender === Gender.Mr) {
      genderMr.click();
    } else {
      genderMme.click();
    }
    firstName.value = form.firstName;
    lastName.value = form.lastName;
    country.value = form.country;
    password.value = form.password;
    password2.value = form.password;
    email.value = form.email;
    checkAgree.click();

    const submit = getElement(selectors.submit2) as unknown as HTMLLinkElement;
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
