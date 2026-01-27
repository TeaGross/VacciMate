import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { VaccinationForm } from '../../components/VaccinationForm/VaccinationForm';
import { Breadcrumb, type BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb';
import { ErrorPage } from '../Error/Error';

export const EditVaccinationPage = () => {
  const { vaccinations } = useContext(VaccinationContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const doseToEdit = vaccinations
  .flatMap(v => v.doses)
  .find(d => d.id === id);
  
  const parentVaccination = vaccinations.find(v =>
    v.doses.some(d => d.id === id)
  );
  
  if (!doseToEdit || !parentVaccination) {
    return <ErrorPage message='Den här vaccinationen verkar ha tagits bort eller så är länken inte längre giltig.'/>;
  }
  
  const items: BreadcrumbItem[] = [
    { label: 'Hem', path: '/home' },
    { label: parentVaccination.vaccineName, path: `/home/${parentVaccination.id}` },
    { label: 'Redigera vaccination' },
  ];


  return (
    <>
    <Breadcrumb items={items}/>
    <div className='page'>
      <h2>Redigera vaccination</h2>
      <VaccinationForm 
        initialVaccine={{
          vaccineName: parentVaccination.vaccineName,
          totalDoses: parentVaccination.totalDoses,
        }}
        initialDose={doseToEdit}
        buttonLabel="Uppdatera"
        onSuccess={() => {
          if (parentVaccination?.id) {
            navigate(`/home/${parentVaccination.id}`);
          } else {
            navigate('/home');
          }
        }}
      />
    </div>
    </>
  );
};