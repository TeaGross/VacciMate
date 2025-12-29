import { PrimaryButton } from '../Button/Button';
import './RegisterBox.scss';

export const RegisterBox = () => {
    return <>
        <div className='register-box-container'>
            <h3>Skapa ett konto och håll kolla på dina vaccinationer helt gratis</h3>
            <form>
                <input type="email" />
                <PrimaryButton>Registrera dig</PrimaryButton>
            </form>
        </div>
    </>;
};