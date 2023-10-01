import { BookingModel } from '@root/src/types/booking-model';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { KORAIL_ROUTES } from '../constants';
import { getElement, selectors } from '../utils/getElement';
import { getUrlLast } from '../utils/getUrlLast';
import { LocalStorageKey, getLocalStorageItem } from '../utils/localStorage';
import { TrainClass } from '@root/src/types/trainClass';
import { retry } from '../utils/retry';

export function useLookForTrain() {
  const [searching, setSearching] = useState(false);

  const search = useCallback(async () => {
    const form = JSON.parse(
      getLocalStorageItem(LocalStorageKey.FORM)
    ) as BookingModel;
    const date = dayjs.unix(form.departureDate);
    const hour = date.hour();
    const minute = date.minute();

    const trainTable = getElement(selectors.trainTable);
    const rows = Array.from(trainTable.querySelectorAll('tr'))
      .filter((row) => {
        const cols = Array.from(row.querySelectorAll('td'));
        const departureTime = cols[5].textContent?.trim();
        const departureHour = parseInt(departureTime?.split(':')[0]!);
        const departureMinute = parseInt(departureTime?.split(':')[1]!);

        return !(hour > departureHour || minute > departureMinute);
      })
      .map((row, index) => {
        const cols = Array.from(row.querySelectorAll('td'));
        // const departureTime = cols[5].textContent?.trim();
        // const departureHour = parseInt(departureTime?.split(':')[0]!);
        // const departureMinute = parseInt(departureTime?.split(':')[1]!);
        // TODO use when time range
        if (index > 0) return null; // TODO remove if time range
        return form.trainClass === TrainClass.first ? cols[7] : cols[8];
      })
      .filter(Boolean) as HTMLElement[];
    const row = rows.find((row) => getElement(selectors.train, row));
    let train: HTMLInputElement | HTMLLinkElement | undefined = row
      ? getElement(selectors.train, row)
      : undefined;

    if (!train) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
      return;
    }

    train = train.parentElement as HTMLLinkElement;

    const href = train.href;

    train.href = '#';
    train.setAttribute('onclick', href);
    train.click();
  }, []);

  useEffect(() => {
    if (getUrlLast() === KORAIL_ROUTES.search && !searching) {
      setSearching(true);
      retry(search);
    }
  }, []);
}
