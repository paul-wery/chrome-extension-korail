import logo from '@assets/img/logo.svg';
import { SimpleModal } from '../modals/SimpleModal';
import Spinner from '../core/ui/Spinner';
import { useLookForTrain } from '@root/src/lib/hooks/lookForTrain';
import { useFillPassengerInformation } from '@root/src/lib/hooks/fillPassengerInformation';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PassengerView: React.FC<Props> = ({ open, setOpen }) => {
  useFillPassengerInformation();
  return (
    <SimpleModal
      title="Korea Easy Train - Train booking - Filling..."
      open={open}
      setOpen={setOpen}
      fullScreen
    >
      <div className="flex justify-center items-center h-full flex-col gap-4">
        <img
          src={chrome.runtime.getURL(logo)}
          className="w-[300px] h-[300px]"
          alt="logo"
        />
        <Spinner className="w-20 h-20" />
      </div>
    </SimpleModal>
  );
};
