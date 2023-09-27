import { XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface Props {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  fullScreen?: boolean;
}

export const SimpleModal: React.FCC<Props> = ({
  title,
  open,
  setOpen,
  fullScreen,
  children,
}) => {
  if (!open) return null;
  return (
    <div
      className={classNames('fixed shadow-md p-4 rounded opacity-100 w-full', {
        'top-0 h-full text-white': fullScreen,
        'top-16 md:max-w-[70%] bg-white': !fullScreen,
      })}
    >
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="text-lg font-bold">{title}</div>
        {!fullScreen && (
          <XMarkIcon
            className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
      {children}
    </div>
  );
};
