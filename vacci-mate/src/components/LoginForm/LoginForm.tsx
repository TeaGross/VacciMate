import { useContext, useState, type FormEvent } from 'react';
import './LoginForm.scss';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { patterns } from '../../validation/validationPatterns';

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
        formState: { errors },
        } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        const success = login(data.email, data.password);

        if (success) {
            navigate('/home');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Logga in</h2>

            <label>
            E-postadress
                <input
                type="text"
                placeholder="E-postadress"
                {...register('email', {
                required: 'E-post krävs',
                pattern: patterns.email,
                })}
                />

                {errors.email && (
                    <span className="form-error">{errors.email.message}</span>
                )}
            </label>

            <label>
            Lösenord
                <input
                type="password"
                placeholder="Lösenord"
                {...register('password', {
                required: 'Lösenord krävs',
                })}
                />

                {errors.password && (
                    <span className="form-error">{errors.password.message}</span>
                )}
            </label>

            <PrimaryButton type="submit">Logga in</PrimaryButton>
            <BackToStartLink></BackToStartLink>
        </form>
    );
};