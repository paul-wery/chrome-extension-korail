import { Control, Controller, FieldError } from 'react-hook-form';

interface Props {
  control: Control<any>;
  name: string;
  selected: string;
  setValue: (value: string) => void;
  options: { key: string; value: string }[];
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
}

const SelectInput: React.FC<Props> = ({
  control,
  name,
  selected,
  options,
  setValue,
  placeholder,
  error,
  required,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="active-within:ring-2 relative flex h-10 w-full items-center rounded-md border border-gray-200 bg-white font-medium text-gray-800 shadow-sm ring-primary-200 ring-offset-1 transition-all focus-within:ring-2hover:border-gray-300 hover:bg-gray-50">
          <select
            className="h-10 flex-1 rounded-md bg-transparent px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-30 mr-3"
            value={selected}
            onChange={(e) => setValue(e.target.value)}
          >
            {options.map((option) => (
              <option selected={option.key === selected}>{option.value}</option>
            ))}
          </select>
        </div>
      )}
      rules={{ required }}
    />
  );
};

export default SelectInput;
