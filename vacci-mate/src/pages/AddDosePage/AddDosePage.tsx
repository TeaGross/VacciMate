import { useParams, useNavigate } from 'react-router';
import { useContext } from 'react';
import { VaccinationContext } from '../../context/VaccinationContext';
import { VaccinationForm } from '../../components/VaccinationForm/VaccinationForm';
import { Breadcrumb, type BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb';
import { ErrorPage } from '../Error/Error';

export const AddDosePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vaccinations } = useContext(VaccinationContext);

    const vaccination = vaccinations.find(v => v.id === id);

    if (!vaccination) {
        return <ErrorPage message='Den här vaccinationen verkar ha tagits bort eller så är länken inte längre giltig.'/>;
    } 

    const items: BreadcrumbItem[] = [
        { label: 'Hem', path: '/home' },
        { label: vaccination.vaccineName, path: `/home/${vaccination.id}` },
        { label: 'Lägg till en en ny dos' },
    ]; 

    return (
        <>
        <Breadcrumb items={items}/>
        <div className='page'>
            <h2>Lägg till ny dos av {vaccination.vaccineName}</h2>

            <VaccinationForm
                initialVaccine={{
                vaccineName: vaccination.vaccineName,
                totalDoses: vaccination.totalDoses,
                }}
                buttonLabel="Spara dos"
                onSuccess={() => navigate(`/home/${vaccination.id}`)}
            />
        </div>
        </>
    );
};
