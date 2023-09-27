import { useCallback } from 'react';
import Button from '../core/ui/Button';
import { SimpleModal } from '../modals/SimpleModal';
import {
  getElement,
  getAllElement,
  selectors,
} from '@root/src/lib/utils/getElement';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const RootView: React.FC<Props> = ({ open, setOpen }) => {
  const goBookingPage = useCallback(() => {
    const lang = getAllElement(selectors.lang);
    const english = lang.find((el) => el.textContent === selectors.englishText);

    if (english) {
      const link = english.querySelector(
        selectors.englishLink
      ) as HTMLLinkElement;

      link?.click();
    }
  }, []);

  return (
    <SimpleModal
      title="Easy Train - Train booking"
      open={open}
      setOpen={setOpen}
    >
      <div className="basis-full flex justify-center">
        <Button onClick={goBookingPage}>Start booking</Button>
      </div>
    </SimpleModal>
  );
};
