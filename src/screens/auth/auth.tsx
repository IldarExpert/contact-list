import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from '../../components/button/button';
import Checkbox from '../../components/checkbox/checkbox';
import ErrorMessage from '../../components/error-message/error-message';
import InputHookForm from '../../components/inputHookForm/inputHookForm';
import { AppRoute } from '../../config/consts';
import { UseRedirectWhenAuth } from '../../hooks/useRedirectWhenAuth';
import { withLayout } from '../../layout/layout';
import { useAppDispatch } from '../../store/store';
import { authorizeUser } from '../../store/user-slice/user-slice';
import { getUserInfoError, getUserInfoLoadingStatus } from '../../store/user-slice/user-slice.selectors';
import styles from './auth.module.scss';
import { AuthProps } from './auth.props';

const Auth = ({}: AuthProps): JSX.Element => {
    UseRedirectWhenAuth(AppRoute.Contacts);

    const appDispatch = useAppDispatch();
    const isLoading = useSelector(getUserInfoLoadingStatus);
    const usersErrorMessage = useSelector(getUserInfoError)
    const [checked, setChecked] = useState(false);

    const {register, handleSubmit, control, formState: {errors}} = useForm<Record<string, unknown>>({mode: 'onChange'});

    const handleCheckBoxClick = () => {
        setChecked((prev) => !prev);
    }

    const handleOnSubmit: SubmitHandler<Record<string, unknown>> = (data: Record<string, any>) => {
        appDispatch(authorizeUser({email: data['user-email'], checked}));
    }

    return (
        <div className={styles.auth}>
            <form
                onSubmit={handleSubmit(handleOnSubmit)}
                action="#"
                className={styles.form}
            >
                {
                    usersErrorMessage &&
                    <ErrorMessage errorMessage={usersErrorMessage.message}/>
                }

                {
                    errors['user-password']?.type === 'pattern' &&
                    <ErrorMessage errorMessage={errors['user-password']?.message}/>
                }

                {
                    errors['user-email']?.type === 'pattern' &&
                    <ErrorMessage errorMessage={errors['user-email']?.message}/>
                }

                <div className={styles.inputWrapper}>
                    <InputHookForm
                        name={'user-email'}
                        label={'Логин'}
                        required={'Обязательное поле'}
                        pattern={{
                            value: /[-.\w]+@([\w-]+\.)+[\w-]+/g,
                            message: 'Введите корректный email (например test@test.ru)',
                        }}
                        errors={errors}
                        register={register}
                        page={'auth'}
                    />
                    <InputHookForm
                        name={'user-password'}
                        type={'password'}
                        label={'Пароль'}
                        required={'Обязательное поле'}
                        pattern={{
                            value: /(?=.*[a-zA-Z])(?=.*\d)/,
                            message: 'Пароль должен состоять минимум из одной буквы и цифры'
                        }}
                        errors={errors}
                        register={register}
                        page={'auth'}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading === 'pending'}
                >Войти
                </Button>
            </form>
        </div>
    );
};

export default withLayout(Auth);