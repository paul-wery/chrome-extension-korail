import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import { BookingForm } from './forms/BookingForm';
import { useFillForm } from '@root/src/lib/hooks/fillForm';
import { BookingModel } from '@root/src/types/booking-model';

export default function App() {
  const [open, setOpen] = useState(true);
  const { trigger } = useFillForm();

  const onConfirm = useCallback((form: BookingModel) => {
    trigger(form);
  }, []);

  if (!open) return null;
  return (
    <div className="flex w-full justify-center text-gray-800">
      <div className="fixed top-0 left-0 opacity-50 bg-black-500 w-screen h-screen" />
      <div className="fixed top-16 shadow-md p-4 rounded bg-white opacity-100 w-full md:max-w-[70%]">
        <div className="flex gap-2 items-center justify-between mb-4">
          <div className="text-lg font-bold">Easy Train - Train booking</div>
          <XMarkIcon
            className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="mb-4">
          Complete the following form to book your ticket
        </div>
        <BookingForm onConfirm={onConfirm} />
      </div>
    </div>
  );
}
