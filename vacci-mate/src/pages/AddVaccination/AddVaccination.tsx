import { AddVaccinationForm } from '../../components/AddVaccinationForm/AddVaccinationForm';
import './AddVaccination.scss';

export const AddVaccinationPage = () => {
    return (
    <>
    <div className='add-vaccination-page'>
        <h2>Lägg till en vaccination</h2>
        <AddVaccinationForm></AddVaccinationForm>
    </div>

    </>
    );
};