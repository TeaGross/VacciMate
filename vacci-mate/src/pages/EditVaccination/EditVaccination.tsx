import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { VaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import { SecondaryButton } from '../../components/Button/Button';

export const EditVaccinationPage = () => {
  const { vaccinations, deleteVaccinationDose } = useContext(VaccinationContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const doseToEdit = vaccinations
    .flatMap(v => v.doses)
    .find(d => d.id === id);

  const parentVaccination = vaccinations.find(v =>
    v.doses.some(d => d.id === id)
  );

  if (!doseToEdit || !parentVaccination) {
  return <h2>Vaccination not found</h2>;
}

  const handleDelete = () => {
    if (id && confirm('Är du säker på att du vill ta bort denna dos?')) {
      deleteVaccinationDose(id);
      
      if (parentVaccination?.id) {
        navigate(`/home/${parentVaccination.id}`);
      } else {
        navigate('/home');
      }
    }
  };

  if (!doseToEdit) {
    console.log(id, doseToEdit);
    return <h2>Vaccination not found</h2>;
  }


  return (
    <>
    <div className='page'>
      <h2>Uppdatera vaccination</h2>
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
        <SecondaryButton onClick={handleDelete}>Ta bort dos</SecondaryButton>
    </div>
    </>
  );
};