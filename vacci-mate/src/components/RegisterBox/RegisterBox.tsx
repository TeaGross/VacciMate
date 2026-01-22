import { PrimaryButton } from '../Button/Button';
import './RegisterBox.scss';
import { Link } from 'react-router';

type RegisterBoxProps = {
    title?: string;
    buttonText?: string;
    to?: string;
};

export const RegisterBox = ({title = 'Skapa ett konto och håll koll på dina vaccinationer helt gratis', buttonText = 'Registrera dig', to = '/register',}: RegisterBoxProps) => {
    return (

        <div className='register-box'>
            <h3>{title}</h3>

            <Link to={to} className='register-box-link link'>
                <PrimaryButton type='submit'>{buttonText}</PrimaryButton>
            </Link>

        </div>
    );
};