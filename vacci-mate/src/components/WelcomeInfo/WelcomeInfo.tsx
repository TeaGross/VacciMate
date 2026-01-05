import './WelcomeInfo.scss';

export const WelcomeInfo = () => {
    return (
        <>
        <div className='welcome-container'>
            <div className='welcome-info'>
                <h2>Välkommen användarnamn! </h2>
                <p>Här hittar du en översikt över dina registrerade vaccinationer. 
                    Klicka på en vaccination för att se detaljer eller redigera den, 
                    eller lägg till en ny vaccination för att hålla din historik uppdaterad.</p>
            </div>
        </div>
        </>
    );
};