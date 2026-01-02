import './VaccinationForm.scss';
import { useContext, useState, type FormEvent } from 'react';
import { addVaccinationDose, getVaccinations } from '../../utils/VaccinationStorage';
import type { VaccinationDose } from '../../models/Vaccinations';
import { PrimaryButton } from '../Button/Button';
import { VaccinationContext } from '../../context/VaccinationContext';

interface AddVaccinationFormProps {
    initialData?: VaccinationDose & { vaccineName: string; totalDoses: string };
    onSubmit?: (_dose: VaccinationDose) => void;
    buttonLabel?: string;
}

export const AddVaccinationForm = ({ 
    initialData, 
    onSubmit,
    buttonLabel = 'Spara'
}: AddVaccinationFormProps = {}) => {
    const {setVaccinations } = useContext(VaccinationContext);
    const [vaccineName, setVaccineName] = useState(initialData?.vaccineName || '');
    const [date, setDate] = useState(initialData?.date || '');
    const [doseNumber, setDoseNumber] = useState(initialData?.doseNumber || '');
    const [totalDoses, setTotalDoses] = useState(initialData?.totalDoses || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [comment, setComment] = useState(initialData?.comment || '');
    const [reminder, setReminder] = useState(initialData?.reminder || false);
    const [reminderDate, setReminderDate] = useState(initialData?.reminderDate || '');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dose: VaccinationDose = {
        id: initialData?.id || crypto.randomUUID(),
        date,
        doseNumber,
        location,
        comment,
        reminder,
        reminderDate: reminder ? reminderDate : null,
        };

        if (onSubmit) {
            onSubmit(dose);
        } else {
            addVaccinationDose(vaccineName, totalDoses, dose);
            setVaccinations(getVaccinations());
        }

        console.log('Vaccinationsdos sparad', dose);

        // Only reset form if not editing
        if (!initialData) {
            setVaccineName('');
            setDate('');
            setDoseNumber('');
            setTotalDoses('');
            setLocation('');
            setComment('');
            setReminder(false);
            setReminderDate('');
        }

        // TODO: navigera till home
    };

    return (
        <form onSubmit={handleSubmit} className='add-vaccination-form'>
            <label>
                Vaccinationens namn
                <input
                    type='text'
                    placeholder='Vaccinationens namn'
                    value={vaccineName}
                    onChange={(e) => setVaccineName(e.target.value)}
                    required
                />
            </label>

            <label>
                Datum
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <div className='dose-container'>
                <label>
                    Dosnummer
                    <input
                        type='text'
                        value={doseNumber}
                        min={1}
                        max={totalDoses}
                        onChange={(e) => setDoseNumber(e.target.value)}
                    />
                </label>

                <label>
                    Totala doser
                    <input
                        type='text'
                        value={totalDoses}
                        min={1}
                        onChange={(e) => setTotalDoses(e.target.value)}
                    />
                </label>
            </div>

            <label>
                Plats för vaccination
                <input
                    type='text'
                    placeholder='T.ex. Vårdcentral'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>

            <label>
                Kommentar
                <textarea
                placeholder='Kommentar'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            </label>
            

            <label className='reminder'>
                <input
                type='checkbox'
                checked={reminder}
                onChange={(e) => setReminder(e.target.checked)}
                />
                Sätt påminnelse för framtida doser  
            </label>

            {reminder && (
                <label>
                    Datum för påminnelse
                    <input
                    type='date'
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    required
                    />
                </label>
            )}

            <PrimaryButton type='submit'>{buttonLabel}</PrimaryButton>
        </form>
    );
};
