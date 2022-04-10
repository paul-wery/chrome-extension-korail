import { useForm } from 'react-hook-form';
import TextField from '../core/ui/TextField';
import { BookingModel } from '@root/src/types/booking-model';
import { useBuildFormRegister } from '@root/src/lib/hooks/buildFormRegister';
import Button from '../core/ui/Button';
import DateInput from '../DateInput';
import SimpleInputContainer from '../SimpleInputContainer';
import dayjs from 'dayjs';
import SelectInput from '../SelectInput';
import { trainStations, trainStationsOptions } from '@root/src/lib/constants';

const defaultValues = {
  departureDate: dayjs().add(1, 'day').unix(),
  departureTime: dayjs().add(1, 'h').format('HH:mm'),
  from: trainStations[0],
  to: trainStations[1],
};

interface Props {
  onConfirm: (form: BookingModel) => void;
}

export const BookingForm: React.FC<Props> = ({ onConfirm }) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const controls = useBuildFormRegister(register, Object.keys(defaultValues));

  const onSubmit = (_form: typeof defaultValues): BookingModel => {
    console.log(_form);
    const hour = parseInt(_form.departureTime.split(':')[0]);
    const minute = parseInt(_form.departureTime.split(':')[1]);
    const date = dayjs
      .unix(_form.departureDate)
      .set('hours', hour)
      .set('minutes', minute);

    return {
      ..._form,
      departureDate: date.unix(),
    };
  };

  return (
    <form
      onSubmit={handleSubmit((value) => {
        return onConfirm(onSubmit(value));
      })}
    >
      <div className="flex flex-wrap items-stretch gap-x-4 [&>div]:mt-4 [&>div]:w-full md:[&>div]:w-[300px]">
        <SimpleInputContainer>
          Departure Date
          <DateInput
            value={watch('departureDate')}
            setValue={(value) => setValue('departureDate', value)}
            placeholder="../../.."
            required
          />
        </SimpleInputContainer>
        <TextField className="mt-4">
          <TextField.Label>
            Departure Time
            <TextField.Input {...controls.departureTime} type="time" required />
          </TextField.Label>
        </TextField>
        <span className="basis-full" />
        <SimpleInputContainer>
          From
          <SelectInput
            control={control}
            name="from"
            selected={watch('from')}
            options={trainStationsOptions}
            setValue={(value) => setValue('from', value as any)}
            error={errors.from}
            required
          />
        </SimpleInputContainer>
        <SimpleInputContainer>
          To
          <SelectInput
            control={control}
            name="to"
            selected={watch('to')}
            options={trainStationsOptions}
            setValue={(value) => setValue('to', value as any)}
            error={errors.to}
            required
          />
        </SimpleInputContainer>
        <div className="basis-full flex justify-center">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};
