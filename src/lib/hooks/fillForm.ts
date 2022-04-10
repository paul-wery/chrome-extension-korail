import { BookingModel } from '@root/src/types/booking-model';
import dayjs from 'dayjs';
import { useCallback } from 'react';

const selectors = {
  year: '#slt_y01',
  month: '#slt_m01',
  day: '#slt_d01',
  hour: '#slt_h01',
  from: '[name="txtGoStart"]',
  to: '[name="txtGoEnd"]',
  submit: '.m_conbtn01>li>a',
};

function getElement(selector: string) {
  return document.querySelector(selector) as HTMLInputElement;
}

function callClickEvent(element: any) {
  let clickEvent = new Event('click');

  element.addEventListener('click', () => {
    console.log('PUTE');
  });
  element.dispatchEvent(clickEvent);
}

function callClickEvent2(element: any) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent(
    'click',
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  element.dispatchEvent(evt);
}

export function useFillForm() {
  const callback = useCallback((form: BookingModel) => {
    console.log('fillForm');
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

    const submit = getElement(selectors.submit);

    submit.click();
    // console.log(submit);
    // callClickEvent(submit);
    // console.log(submit);
    // console.log(submit.getAttribute('href'));
    // submit.click();
    // console.log((submit as unknown as HTMLLinkElement).href);
  }, []);

  return { trigger: callback };
}
