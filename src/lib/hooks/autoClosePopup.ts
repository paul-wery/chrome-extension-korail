import { useEffect } from 'react';
import { getUrlLast } from '../utils/getUrlLast';
import { KORAIL_ROUTES } from '../constants';

export function useAutoClosePopup() {
  useEffect(() => {
    if (getUrlLast() === KORAIL_ROUTES.popup) {
      window.close();
    }
  }, []);
}
