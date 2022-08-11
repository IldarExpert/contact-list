import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/store';
import { addContact } from '../../store/user-slice/user-slice';
import Button from '../button/button';
import InputHookForm from '../inputHookForm/inputHookForm';
import Title from '../title/title';
import styles from './add-contact-form.module.scss';
import { AddContactFormProps } from './add-contact-form.props';

const AddContactForm = ({}: AddContactFormProps): JSX.Element => {
    const appDispatch = useAppDispatch();

    const {register, handleSubmit, reset, formState: {errors}} = useForm<Record<string, unknown>>({mode: 'onChange'});

    const handleClickSave: SubmitHandler<Record<string, unknown>> = (data) => {
        appDispatch(addContact(data));
        reset();
    }

    return (
        <>
            <Title text={'Добавить пользователя'}/>
            <div className={styles.addContactForm}>
                <InputHookForm
                    type={'text'}
                    name={'contactName'}
                    label={'имя'}
                    errors={errors}
                    register={register}
                    required={'Обязательное поле'}
                    autoComplete={'off'}
                />
                <InputHookForm
                    type="email"
                    name={'contactEmail'}
                    label={'email'}
                    errors={errors}
                    register={register}
                    required={'Обязательное поле'}
                    autoComplete={'off'}
                />
                <Button
                    onClick={handleSubmit(handleClickSave)}
                    type="submit"
                >
                    добавить
                </Button>
            </div>
        </>
    );
};

export default AddContactForm;