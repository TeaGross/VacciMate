import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { VaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import { Breadcrumb, type BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb';

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
    return <h2>Vaccinationen kunde ej hittas</h2>;
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