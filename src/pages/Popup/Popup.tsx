import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import Button from '../content/components/core/ui/Button';

const Popup = () => {
  return (
    <div className="text-center bg-white p-8 text-black-700">
      <header className="flex items-center justify-center flex-col gap-4">
        <div>
          <img src={logo} className="h-[30vmin]" alt="logo" />
        </div>
        <p className="text-black-700 text-base">
          You can start booking your train tickets right away!
        </p>
        <a
          href="https://www.letskorail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Start Booking!</Button>
        </a>
      </header>
    </div>
  );
};

export default withSuspense(Popup);
