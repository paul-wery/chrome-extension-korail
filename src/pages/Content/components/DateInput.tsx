import { dateInputStringToUnix } from '@lib/utils/dateInputStringToUnix';
import { getShadowRoot } from '@root/src/lib/utils/getShadowRoot';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

interface Props {
  id?: string;
  value: number;
  setValue: (value: number) => void;
  placeholder?: string;
  max?: number;
  required?: boolean;
}

const DateInput: React.FC<Props> = ({
  id = 'date-input',
  value,
  setValue,
  placeholder,
  max,
  required,
}) => {
  const ref = useRef(null);

  const handleChange = useCallback(
    (range: DateValueType) => {
      const unix = dateInputStringToUnix(range?.startDate as string);

      setValue(unix);
    },
    [setValue]
  );

  // Force input attribute
  useEffect(() => {
    const element = getShadowRoot().getElementById(id) as any;

    if (ref.current && element) {
      element.required = required;
      element.pattern = '[0-9]{2}/[0-9]{2}/[0-9]{4}';
    }
  }, [id, ref, required]);

  return (
    <div ref={ref} className="relative">
      <Datepicker
        inputId={id}
        asSingle={true}
        useRange={false}
        displayFormat={'DD/MM/YYYY'}
        maxDate={max ? dayjs.unix(max).toDate() : undefined}
        placeholder={placeholder}
        value={{
          startDate: value ? dayjs.unix(value).format('YYYY-MM-DD') : '',
          endDate: value ? dayjs.unix(value).format('YYYY-MM-DD') : '',
        }}
        onChange={handleChange}
        inputClassName="h-10 flex-1 rounded-md bg-transparent px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-30 w-full"
        containerClassName={classNames(
          'active-within:ring-2 h-10 w-full rounded-md border border-gray-200 bg-white font-medium text-gray-800 shadow-sm ring-primary-200 ring-offset-1 transition-all focus-within:ring-2 hover:border-gray-300 hover:bg-gray-50 lg:text-sm'
        )}
      />
    </div>
  );
};

export default DateInput;
