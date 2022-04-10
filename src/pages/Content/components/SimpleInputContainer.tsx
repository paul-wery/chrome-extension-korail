import classNames from 'classnames';

interface Props {
  className?: string;
  customWidth?: boolean;
}

const SimpleInputContainer: React.FCC<Props> = ({
  className,
  customWidth,
  children,
}) => {
  return (
    <div
      className={classNames('flex w-full flex-col gap-2 ', className ?? '', {
        '[&>*]:w-full': !customWidth,
      })}
    >
      {children}
    </div>
  );
};

export default SimpleInputContainer;
