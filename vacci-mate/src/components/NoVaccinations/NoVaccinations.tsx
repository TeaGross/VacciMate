import { Link } from 'react-router';
import { PrimaryButton } from '../Button/Button';
import './NoVaccinations.scss';

export const NoVaccinations = () => {
    return (
        <>
        <div className='no-vaccinations-page'>
            <div className='no-vaccination-info'>
                <h3>Inga vaccinationer registrerade än</h3>
                <p>Det är tomt här just nu men det är enkelt att börja.
                    Registrera din första vaccination för att skapa din översikt.</p>

                <PrimaryButton as={Link} to={'/home/add'} className='add-vaccination-btn'><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> Ny vaccination</PrimaryButton>
            </div>
        </div>
        </>
    );
};