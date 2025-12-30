import './RegisterForm.scss';
import { useState, type FormEvent } from 'react';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';

export const RegisterForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte');
            return;
        }

        setError(null);

        console.log('Registrera:', { email, password });
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
        <h2>Skapa konto</h2>

        <label>
        E-postadress
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="E-postadress"
            />
        </label>

        <label>
        Lösenord
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Lösenord"
            />
        </label>

        <label>
        Bekräfta lösenord
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Bekräfta lösenord"
            />
        </label>

        {error && <p className="register-form__error">{error}</p>}

        <PrimaryButton type="submit">
        Registrera
        </PrimaryButton>

        <BackToStartLink></BackToStartLink>
    </form>
    );
};