import { useFillForm } from '@root/src/lib/hooks/fillForm';
import { BookingModel } from '@root/src/types/booking-model';
import { useCallback } from 'react';
import { BookingForm } from '../forms/BookingForm';
import { SimpleModal } from '../modals/SimpleModal';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FormView: React.FC<Props> = ({ open, setOpen }) => {
  const { trigger } = useFillForm();

  const onConfirm = useCallback((form: BookingModel) => {
    trigger(form);
  }, []);

  return (
    <SimpleModal
      title="Korea Easy Train - Train booking"
      open={open}
      setOpen={setOpen}
    >
      <div className="mb-4">
        Complete the following form to book your ticket
      </div>
      <BookingForm onConfirm={onConfirm} />
    </SimpleModal>
  );
};
