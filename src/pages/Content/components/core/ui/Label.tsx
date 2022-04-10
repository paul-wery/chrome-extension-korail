import { createElement } from 'react';
import classNames from 'classnames';

type Props = React.LabelHTMLAttributes<unknown> & {
  as?: string;
  noMargin?: boolean;
};

const Label: React.FCC<Props> = ({
  noMargin,
  children,
  className,
  as,
  ...props
}) => {
  const tag = as ?? `label`;

  return createElement(
    tag,
    {
      className: classNames(
        `w-full text-sm font-medium text-gray-500 dark:text-gray-400`,
        className,
        {
          '[&>*]:mt-[0.35rem]': !noMargin,
        }
      ),
      ...props,
    },
    children
  );
};

export default Label;
