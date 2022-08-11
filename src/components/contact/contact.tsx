import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/store';
import { deleteContact, patchContact } from '../../store/user-slice/user-slice';
import Button from '../button/button';
import InputHookForm from '../inputHookForm/inputHookForm';
import styles from './contact.module.scss';
import { ContactProps } from './contact.props';

const Contact = ({contact}: ContactProps): JSX.Element => {
    const [disabled, setDisabled] = useState(true);
    const appDispatch = useAppDispatch();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<Record<string, unknown>>({mode: 'onChange'});

    const handleEditClick = () => {

        setDisabled(false);
    }

    const handleDeleteClick = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        appDispatch(deleteContact(id));
    }

    const handleClickSave: SubmitHandler<Record<string, unknown>> = (data) => {
        appDispatch(patchContact({contactId: contact.id, newContactData: data}));
    }

    return (
        <li className={styles.contact}>
            <div className={styles.inputs}>
                <InputHookForm
                    label={'имя'}
                    type={'text'}
                    register={register}
                    name={'contactName'}
                    errors={errors}
                    required={'Обязательное поле'}
                    value={contact.name}
                    page={`contacts`}
                    autoComplete={'off'}
                    disabled={disabled}
                    setValue={setValue}
                />
                <InputHookForm
                    label={'email'}
                    type="email"
                    name={'contactEmail'}
                    errors={errors}
                    register={register}
                    value={contact.email}
                    page={`contacts`}
                    required={'Обязательное поле'}
                    autoComplete={'off'}
                    disabled={disabled}
                    setValue={setValue}
                />
            </div>
            <div className={styles.buttons}>
                <Button
                    onClick={handleEditClick}
                    disabled={!disabled}
                >редактировать</Button>
                <Button
                    onClick={handleSubmit(handleClickSave)}
                    type="submit"
                    disabled={disabled}
                >
                    сохранить
                </Button>
                <Button
                    onClick={handleDeleteClick(contact.id)}
                    color={'red'}
                >удалить</Button>
            </div>
        </li>
    );
};

export default Contact;