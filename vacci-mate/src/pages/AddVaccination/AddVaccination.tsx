import { useNavigate } from 'react-router';
import { VaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import { Breadcrumb, type BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb';

export const AddVaccinationPage = () => {
    const navigate = useNavigate();

    const items: BreadcrumbItem[] = [
        { label: 'Hem', path: '/home' },
        { label: 'Lägg till en vaccination' },
        ]; 
    return (
    <>
    <Breadcrumb items={items}></Breadcrumb>
    <div className='page'>
        <h2>Lägg till en vaccination</h2>
        <VaccinationForm onSuccess={() => navigate('/home')}></VaccinationForm>
    </div>

    </>
    );
};