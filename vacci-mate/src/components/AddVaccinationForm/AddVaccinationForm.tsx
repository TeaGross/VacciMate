import './AddVaccinationForm.scss';
import { useState, type FormEvent } from 'react';
import { addVaccinationDose } from '../../utils/VaccinationStorage';
import type { VaccinationDose } from '../../models/Vaccinations';
import { PrimaryButton } from '../Button/Button';

export const AddVaccinationForm = () => {
    const [vaccineName, setVaccineName] = useState('');
    const [date, setDate] = useState('');
    const [doseNumber, setDoseNumber] = useState('');
    const [totalDoses, setTotalDoses] = useState('');
    const [location, setLocation] = useState('');
    const [comment, setComment] = useState('');
    const [reminder, setReminder] = useState(false);
    const [reminderDate, setReminderDate] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dose: VaccinationDose = {
        id: crypto.randomUUID(),
        date,
        doseNumber,
        location,
        comment,
        reminder,
        reminderDate: reminder ? reminderDate : null,
        };

        addVaccinationDose(vaccineName, totalDoses, dose);

        console.log('Vaccinationsdos sparad', dose);

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

            <PrimaryButton type='submit'>Spara</PrimaryButton>
        </form>
    );
};
