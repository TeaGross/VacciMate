import { useContext } from 'react';
import './WelcomeInfo.scss';
import { AuthContext } from '../../context/AuthContext';

export const WelcomeInfo = () => {
    const { activeUser } = useContext(AuthContext);
    return (
        <>
        <div className='welcome-container'>
            <div className='welcome-info'>
                <h2>Välkommen {activeUser?.firstName}! </h2>
                <p>Här hittar du en översikt över dina registrerade vaccinationer. 
                    Klicka på en vaccination för att se detaljer eller redigera den, 
                    eller lägg till en ny vaccination för att hålla din historik uppdaterad.</p>
            </div>
        </div>
        </>
    );
};