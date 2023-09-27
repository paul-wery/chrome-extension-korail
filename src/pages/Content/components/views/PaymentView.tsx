import { useSelectCreditCardOption } from '@root/src/lib/hooks/selectCreditCardOption';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PaymentView: React.FC<Props> = ({ open, setOpen }) => {
  useSelectCreditCardOption();
  return <></>;
};
