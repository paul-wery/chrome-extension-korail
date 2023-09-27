import { KORAIL_ROUTES } from '@root/src/lib/constants';
import { useAutoClosePopup } from '@root/src/lib/hooks/autoClosePopup';
import { DisplayPageAfterRenderer } from '@root/src/lib/hooks/displayPageAfterRenderer';
import { getUrlLast } from '@root/src/lib/utils/getUrlLast';
import { useMemo, useState } from 'react';
import { FormView } from './views/FormView';
import { RootView } from './views/RootView';
import { SearchView } from './views/SearchView';
import { PassengerView } from './views/PassengerView';
import { PaymentView } from './views/PaymentView';

export default function App() {
  const currentRoot = useMemo(() => getUrlLast(), []);
  const [open, setOpen] = useState(true);

  useAutoClosePopup();
  if (!open) return null;
  return (
    <div className="flex w-full justify-center text-gray-800">
      {Object.values(KORAIL_ROUTES).includes(currentRoot) &&
        currentRoot !== KORAIL_ROUTES.payment && (
          <div className="fixed top-0 left-0 opacity-50 bg-black-500 w-screen h-screen" />
        )}
      {
        {
          [KORAIL_ROUTES.root]: <RootView open={open} setOpen={setOpen} />,
          [KORAIL_ROUTES.form]: <FormView open={open} setOpen={setOpen} />,
          [KORAIL_ROUTES.search]: <SearchView open={open} setOpen={setOpen} />,
          [KORAIL_ROUTES.passenger]: (
            <PassengerView open={open} setOpen={setOpen} />
          ),
          [KORAIL_ROUTES.payment]: (
            <PaymentView open={open} setOpen={setOpen} />
          ),
        }[currentRoot]
      }
      <DisplayPageAfterRenderer />
    </div>
  );
}
