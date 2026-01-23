import { useContext} from 'react';
import './LoginForm.scss';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { patterns } from '../../validation/validationPatterns';
import { errorClass } from '../../utils/formUtils';

type LoginFormValues = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        const result = login(data.email, data.password);

        if (!result.success) {
            if (result.error === 'EMAIL_NOT_FOUND') {
            setError('email', {
                message: 'Det finns inget konto med denna e-postadress',
            });
            }

            if (result.error === 'WRONG_PASSWORD') {
            setError('password', {
                message: 'Lösenordet stämmer inte',
            });
            }

            return;
        }
    };

    return (
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <h2>Logga in</h2>

            <label>
            E-postadress
                <input
                type='text'
                className={errorClass(errors.email)}
                placeholder='E-postadress'
                {...register('email', {
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
                <input
                type='password'
                className={errorClass(errors.password)}
                placeholder='Lösenord'
                {...register('password', {
                required: 'Lösenord krävs',
                })}
                />

                {errors.password && (
                    <span className='form-error'>{errors.password.message}</span>
                )}
            </label>

            <PrimaryButton type='submit'>Logga in</PrimaryButton>
            <BackToStartLink></BackToStartLink>
        </form>
    );
};