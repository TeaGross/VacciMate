import './RegisterForm.scss';
import { useContext, useState, type FormEvent } from 'react';
import { PrimaryButton } from '../Button/Button';
import { BackToStartLink } from '../BackToStartLink/BackToStartLink';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

export const RegisterForm = () => {
    const [userName, setUserName]= useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Lösenorden matchar inte');
            return;
        }

        const result = register(email, userName, password);

        if (!result.success) {
            if (result.error === 'USERNAME_EXISTS') {
                setError('Användarnamnet är redan taget');
            }
            if (result.error === 'EMAIL_EXISTS') {
                setError('E-postadressen används redan');
            }
            return;
            }

        setError(null);
        navigate('/home');

        console.log('Registrera:', { email, password, userName });
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
        <h2>Skapa konto</h2>

        <label>
        Användarnamn
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Användarnamn"
            />
        </label>

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

        {error && <p className="register-form-error">{error}</p>}

        <PrimaryButton type="submit">
        Registrera
        </PrimaryButton>

        <BackToStartLink></BackToStartLink>
    </form>
    );
};