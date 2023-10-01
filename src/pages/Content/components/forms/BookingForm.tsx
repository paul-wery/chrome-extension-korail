import {
  countriesOptions,
  trainStationsOptions,
} from '@root/src/lib/constants';
import { useBuildFormRegister } from '@root/src/lib/hooks/buildFormRegister';
import { selectors } from '@root/src/lib/utils/getElement';
import { getSelectOptionsFromDOM } from '@root/src/lib/utils/getSelectOptionsFromDOM';
import {
  LocalStorageKey,
  getLocalStorageItem,
} from '@root/src/lib/utils/localStorage';
import {
  BookingModel,
  Gender,
  YesNo,
  genderOptions,
  yesNoOptions,
} from '@root/src/types';
import { TrainClass, trainClassOptions } from '@root/src/types/trainClass';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import DateInput from '../DateInput';
import SelectInput from '../SelectInput';
import SimpleInputContainer from '../SimpleInputContainer';
import Button from '../core/ui/Button';
import TextField from '../core/ui/TextField';

const defaultValues = {
  departureDate: dayjs().add(1, 'day').unix(),
  departureTime: dayjs().set('hour', 15).format('HH:mm'),
  from: 'Yongsan',
  to: 'Iksan',
  trainType: '00',
  trainClass: String(TrainClass.economy),

  gender: String(Gender.Mr),
  firstName: '',
  lastName: '',
  country: 'FR',
  password: '',
  email: '',
  koreanCreditCard: String(YesNo.No),
};

interface Props {
  onConfirm: (form: BookingModel) => void;
}

export const BookingForm: React.FC<Props> = ({ onConfirm }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      ...(JSON.parse(
        getLocalStorageItem(LocalStorageKey.FORM)
      ) as BookingModel),
      departureDate: defaultValues.departureDate,
      departureTime: defaultValues.departureTime,
    },
  });

  const controls = useBuildFormRegister(register, Object.keys(defaultValues));

  const trainTypeOptions = useMemo(
    () => getSelectOptionsFromDOM(selectors.trainOptions),
    []
  );

  const onSubmit = (_form: typeof defaultValues): BookingModel => {
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
        <span className="basis-full" />
        <SimpleInputContainer>
          Type of train
          <SelectInput
            control={control}
            name="trainType"
            selected={watch('trainType')}
            options={trainTypeOptions}
            setValue={(value) => setValue('trainType', value as any)}
            error={errors.trainType}
            required
          />
        </SimpleInputContainer>
        <SimpleInputContainer>
          Seat type
          <SelectInput
            control={control}
            name="trainClass"
            selected={watch('trainClass')}
            options={trainClassOptions}
            setValue={(value) => setValue('trainClass', value as any)}
            error={errors.trainClass}
            required
          />
        </SimpleInputContainer>
        <span className="basis-full h-[1px] bg-gray-300 mt-4" />
        <SimpleInputContainer>
          Gender
          <SelectInput
            control={control}
            name="gender"
            selected={watch('gender')}
            options={genderOptions}
            setValue={(value) => setValue('gender', value as any)}
            error={errors.gender}
            required
          />
        </SimpleInputContainer>
        <TextField className="mt-4">
          <TextField.Label>
            First Name
            <TextField.Input
              {...controls.firstName}
              placeholder="..."
              required
            />
          </TextField.Label>
        </TextField>
        <TextField className="mt-4">
          <TextField.Label>
            Last Name
            <TextField.Input
              {...controls.lastName}
              placeholder="..."
              required
            />
          </TextField.Label>
        </TextField>
        <SimpleInputContainer>
          Country
          <SelectInput
            control={control}
            name="country"
            selected={watch('country')}
            options={countriesOptions}
            setValue={(value) => setValue('country', value as any)}
            error={errors.country}
            required
          />
        </SimpleInputContainer>
        <span className="basis-full" />
        <TextField className="mt-4">
          <TextField.Label>
            Email
            <TextField.Input
              {...controls.email}
              placeholder="..."
              required
              type="email"
            />
          </TextField.Label>
        </TextField>
        <TextField className="mt-4">
          <TextField.Label>
            Password (6 - 13 digit)
            <TextField.Input
              {...controls.password}
              placeholder="..."
              minLength={6}
              maxLength={13}
              allowedRegex={/^[0-9]*$/}
              required
            />
          </TextField.Label>
        </TextField>
        <SimpleInputContainer>
          Payment with Korean credit card
          <SelectInput
            control={control}
            name="koreanCreditCard"
            selected={watch('koreanCreditCard')}
            options={yesNoOptions}
            setValue={(value) => setValue('koreanCreditCard', value as any)}
            error={errors.koreanCreditCard}
            required
          />
        </SimpleInputContainer>
        <div className="basis-full flex justify-center">
          <Button>Find my train</Button>
        </div>
      </div>
    </form>
  );
};
