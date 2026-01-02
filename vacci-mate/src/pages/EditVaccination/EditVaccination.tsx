import './EditVaccination.scss';
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { VaccinationContext } from '../../context/VaccinationContext';
import { deleteVaccinationDose, getVaccinations, updateVaccinationDose } from '../../utils/VaccinationStorage';
import { AddVaccinationForm } from '../../components/AddVaccinationForm/VaccinationForm';
import { SecondaryButton } from '../../components/Button/Button';
import type { VaccinationDose } from '../../models/Vaccinations';

export const EditVaccinationPage = () => {
  const { vaccinations, setVaccinations } = useContext(VaccinationContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Find dose to edit
  const doseToEdit = vaccinations
    .flatMap(v => v.doses.map(d => ({ ...d, vaccineName: v.vaccineName, totalDoses: v.totalDoses, vaccinationId: v.id })))
    .find(d => d.id === id);

  const handleEditSubmit = (updatedDose: VaccinationDose) => {
    if (id) {
      updateVaccinationDose(id, updatedDose);
      setVaccinations(getVaccinations());

      if (doseToEdit?.vaccinationId) {
        navigate(`/home/${doseToEdit.vaccinationId}`);
      } else {
        navigate('/home');
      }
    }
  };

  const handleDelete = () => {
    if (id && confirm('Är du säker på att du vill ta bort denna dos?')) {
      deleteVaccinationDose(id);
      setVaccinations(getVaccinations());
      
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
      <AddVaccinationForm 
        initialData={doseToEdit}
        onSubmit={handleEditSubmit}
        buttonLabel="Uppdatera"
      />
        <SecondaryButton onClick={handleDelete}>Ta bort dos</SecondaryButton>
    </>
  );
};