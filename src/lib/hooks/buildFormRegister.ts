import { useMemo } from 'react';
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';

export function useBuildFormRegister<T extends FieldValues>(
  register: UseFormRegister<T>,
  _fields: string[]
) {
  const controls = useMemo(() => {
    const fields = _fields as Path<T>[];
    const controls: Record<Path<T>, UseFormRegisterReturn> = {} as any;

    fields.forEach((field) => {
      controls[field] = register(field as Path<T>, { value: '' as any });
    });
    return controls;
  }, [_fields, register]);

  return controls;
}
