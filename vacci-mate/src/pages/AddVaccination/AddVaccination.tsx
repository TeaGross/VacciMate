import { VaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import './AddVaccination.scss';

export const AddVaccinationPage = () => {
    return (
    <>
    <div className='add-vaccination-page'>
        <h2>Lägg till en vaccination</h2>
        <VaccinationForm></VaccinationForm>
    </div>

    </>
    );
};