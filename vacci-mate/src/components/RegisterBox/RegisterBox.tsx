import { useState, type FormEvent } from 'react';
import { PrimaryButton } from '../Button/Button';
import './RegisterBox.scss';
import { Link } from 'react-router';

export const RegisterBox = () => {
    // TODO: koppla ihop logga in och register-email till samma state med context?
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log('E-postadress', email);
    }

    return <>
        <form onSubmit={handleSubmit} className='register-box-form'>
            <h3>Skapa ett konto och håll koll på dina vaccinationer helt gratis</h3>
            <input type="email"
            placeholder='E-postadress'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>

            <Link to="/register">
                <PrimaryButton type='submit'>Registrera dig</PrimaryButton>
            </Link>
        </form>
    </>;
};