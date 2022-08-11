import styles from './inputHookForm.module.scss';
import { InputHookFormProps } from './inputHookForm.props';

const InputHookForm = ({
                           page,
                           disabled,
                           value,
                           label,
                           name,
                           register,
                           required,
                           pattern,
                           errors,
                           type = 'text',
                           autoComplete = 'on',
                           setValue
                       }: InputHookFormProps<Record<string, unknown>>): JSX.Element => {
    const options: Record<string, unknown> = {};
    if (required) options.required = required;
    if (pattern) options.pattern = pattern;
    if (value) options.value = value;
    if (setValue) setValue(name, value);

    return (
        <div className={`
                            ${styles.inputWrapper} 
                            ${page === 'auth'? styles.auth: ''}
                            ${page === 'contacts'? styles.contacts: ''}
                        `}
        >
            {label &&
                <label
                    className={`${styles.label} ${styles.className}`}
                    htmlFor={name}>
                    {label}
                </label>
            }
            <input
                {...register(name, options)}
                className={`${styles.input} ${errors[name]? styles.error : ''}`}
                type={type}
                autoComplete={autoComplete}
                disabled={disabled}
            />
            {errors[name]?.type === 'required' &&
                <span className={styles.errorRequired}>{errors[name]?.message}</span>}
        </div>
    );
};

export default InputHookForm;