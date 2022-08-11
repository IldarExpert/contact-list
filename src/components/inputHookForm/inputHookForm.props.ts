import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export interface InputHookFormProps<T> {
    page?: string;
    disabled?: boolean;
    value?: string;
    label?: string,
    type?: string,
    autoComplete?: string
    name: keyof T,
    required?: string,
    pattern?: {
        value: RegExp,
        message: string,
    },
    errors:  FieldErrors<T>,
    register: UseFormRegister<T>;
    setValue?:  UseFormSetValue<Record<string, unknown>>
}