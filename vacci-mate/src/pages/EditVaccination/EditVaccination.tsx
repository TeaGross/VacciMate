import './EditVaccination.scss';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { VaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import { SecondaryButton } from '../../components/Button/Button';

export const EditVaccinationPage = () => {
  const { vaccinations, deleteVaccinationDose } = useContext(VaccinationContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Find dose to edit
  const doseToEdit = vaccinations
    .flatMap(v => v.doses.map(d => ({ ...d, vaccineName: v.vaccineName, totalDoses: v.totalDoses, vaccinationId: v.id })))
    .find(d => d.id === id);


  const handleDelete = () => {
    if (id && confirm('Är du säker på att du vill ta bort denna dos?')) {
      deleteVaccinationDose(id);
      
      if (doseToEdit?.vaccinationId) {
        navigate(`/home/${doseToEdit.vaccinationId}`);
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
      <h2>Edit vaccination</h2>
      <VaccinationForm 
        initialData={doseToEdit}
        buttonLabel="Uppdatera"
        onSuccess={() => {
          if (doseToEdit?.vaccinationId) {
            navigate(`/home/${doseToEdit.vaccinationId}`);
          } else {
            navigate('/home');
          }
        }}
      />
        <SecondaryButton onClick={handleDelete}>Ta bort dos</SecondaryButton>
    </>
  );
};