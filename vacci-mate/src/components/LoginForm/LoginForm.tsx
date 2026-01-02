import { useState, type FormEvent } from 'react';
import './LoginForm.scss';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Lösenord:', password);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Logga in</h2>

            <label>
            E-postadress
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='E-postadress'
            />
            </label>

            <label>
            Lösenord
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Lösenord'
            />
            </label>

            <PrimaryButton type="submit">Logga in</PrimaryButton>
            <BackToStartLink></BackToStartLink>
        </form>
    );
};