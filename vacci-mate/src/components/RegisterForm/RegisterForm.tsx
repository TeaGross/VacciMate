import './RegisterForm.scss';
import { useContext} from 'react';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import { patterns } from '../../validation/validationPatterns';
import { errorClass } from '../../utils/formUtils';


type RegisterFormValues = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        } = useForm<RegisterFormValues>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = useWatch({
        control,
        name: 'password',
    });

    const onSubmit = (data: RegisterFormValues) => {
        const result = register(data.email, data.userName, data.password);

        if (!result.success) {
            if (result.error === 'USERNAME_EXISTS') {
            setError('userName', {
                type: 'manual',
                message: 'Användarnamnet är redan taget',
            });
            }

            if (result.error === 'EMAIL_EXISTS') {
            setError('email', {
                type: 'manual',
                message: 'E-postadressen används redan',
            });
            }

            return;
        }

        navigate('/home');
    };

    return (
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
        <h2>Skapa konto</h2>

        <label>
        Användarnamn
            <input
            type='text'
            className={errorClass(errors.userName)}
            placeholder='Användarnamn'
            {...formRegister('userName', {
                required: 'Användarnamn krävs',
            })}
            />

            {errors.userName && (
            <span className='form-error'>{errors.userName.message}</span>
            )}
        </label>

        <label>
        E-postadress
            <input
            type='email'
            className={errorClass(errors.email)}
            placeholder='E-postadress'
            {...formRegister('email', {
                required: 'E-post krävs',
                pattern: patterns.email,
            })}
            />

            {errors.email && (
            <span className='form-error'>{errors.email.message}</span>
            )}
        </label>

        <label>
        Lösenord
            <small className='hint'>
            Minst 6 tecken, en bokstav och en siffra
            </small>
            <input
            type='password'
            className={errorClass(errors.password)}
            placeholder='Lösenord'
            {...formRegister('password', {
                required: 'Lösenord krävs',
                pattern: patterns.password,
            })}
            />

            {errors.password && (
            <span className='form-error'>{errors.password.message}</span>
            )}

        </label>

        <label>
        Bekräfta lösenord
            <input
            type='password'
            className={errorClass(errors.confirmPassword)}
            placeholder='Bekräfta lösenord'
            {...formRegister('confirmPassword', {
                required: 'Bekräfta lösenord krävs',
                validate: (value) =>
                value === password || 'Lösenorden matchar inte',
            })}
            />

            {errors.confirmPassword && (
            <span className='form-error'>{errors.confirmPassword.message}</span>
            )}
        </label>

        <PrimaryButton type='submit'>
        Registrera
        </PrimaryButton>

        <BackToStartLink></BackToStartLink>
    </form>
    );
};