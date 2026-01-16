import { useContext, useState, type FormEvent } from 'react';
import { PrimaryButton } from '../Button/Button';
import type { Vaccination } from '../../models/Vaccinations';
import { VaccinationContext } from '../../context/VaccinationContext';
import './EditMainVaccination.scss';

interface Props {
    vaccination: Vaccination;
    onSuccess: () => void;
}

export const EditMainVaccinationForm = ({ vaccination, onSuccess }: Props) => {
    const { updateVaccination } = useContext(VaccinationContext);

    const [name, setName] = useState(vaccination.vaccineName);
    const [totalDoses, setTotalDoses] = useState(vaccination.totalDoses);
    const [showDoseError, setShowDoseError] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (+totalDoses < vaccination.doses.length) {
            setShowDoseError(true);
            return;
        }

        updateVaccination(vaccination.id, {
        vaccineName: name,
        totalDoses,
        });

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className='edit-main-vaccination-form'>
        <label className='edit-main-vaccination-label'>
            Vaccinationens namn
            <input value={name} onChange={e => setName(e.target.value)} />
        </label>

        <label className='edit-main-vaccination-label'>
            Totala doser
            <input
            type="text"
            min={vaccination.doses.length}
            value={totalDoses}
            onChange={e => setTotalDoses(e.target.value)}
            />
        </label>

        {showDoseError && (
            <p className='form-error'>Antal doser kan inte vara lägre än befintliga doser</p>
        )}

        <PrimaryButton type="submit">Spara</PrimaryButton>
        </form>
    );
};
