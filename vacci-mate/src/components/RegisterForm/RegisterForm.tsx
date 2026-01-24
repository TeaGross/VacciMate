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
    firstName: string;
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
            firstName: '',
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
        const result = register(data.email, data.firstName, data.password);

        if (!result.success) {
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
        Förnamn
            <input
            type='text'
            className={errorClass(errors.firstName)}
            placeholder='Förnamn'
            {...formRegister('firstName', {
                required: 'Användarnamn krävs',
            })}
            />

            {errors.firstName && (
            <span className='form-error'>{errors.firstName.message}</span>
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
                required: 'Bekräfta lösenordet',
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

        <div className="demo-subtle">
            <p>Vill du se hur VacciMate fungerar med färdig data?
            Gå till Logga in och använd demo-inloggningen.</p>
            <p>💡 För att få riktiga mejlpåminnelser behöver du registrera ett konto med en giltig e-postadress.</p>
        </div>

    </form>
    );
};