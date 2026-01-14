import './VaccinationForm.scss';
import { useContext, useState, type FormEvent } from 'react';
import type { VaccinationDose } from '../../models/Vaccinations';
import { PrimaryButton } from '../Button/Button';
import { VaccinationContext } from '../../context/VaccinationContext';

// interface AddVaccinationFormProps {
//     initialData?: VaccinationDose & {
//         vaccineName: string;
//         totalDoses: string;
//         };
//     onSubmit?: (_dose: VaccinationDose) => void;
//     buttonLabel?: string;
//     onSuccess?: () => void;
// }

interface VaccinationFormProps {
    initialVaccine?: {
        vaccineName: string;
        totalDoses: string;
    };
    initialDose?: VaccinationDose;
    buttonLabel?: string;
    onSuccess?: () => void;
}

export const VaccinationForm = ({ 
    initialVaccine,
    initialDose, 
    buttonLabel = 'Spara',
    onSuccess,
}: VaccinationFormProps = {}) => {
    const {addVaccinationDose, updateVaccinationDose } = useContext(VaccinationContext);

    const [vaccineName, setVaccineName] = useState(
        initialVaccine?.vaccineName ?? ''
    );
    const [totalDoses, setTotalDoses] = useState(
        initialVaccine?.totalDoses ?? ''
    );

    const [date, setDate] = useState(initialDose?.date ?? '');
    const [doseNumber, setDoseNumber] = useState(initialDose?.doseNumber ?? '');
    const [location, setLocation] = useState(initialDose?.location ?? '');
    const [comment, setComment] = useState(initialDose?.comment ?? '');
    const [reminder, setReminder] = useState(initialDose?.reminder ?? false);
    const [reminderDate, setReminderDate] = useState(
    initialDose?.reminderDate ?? ''
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const dose: VaccinationDose = {
        // id: initialData?.id || crypto.randomUUID(),
        // date,
        // doseNumber,
        // location,
        // comment,
        // reminder,
        // reminderDate: reminder ? reminderDate : null,
        // };

        // if (initialData) {
        //     updateVaccinationDose(dose);
        //     } else {
        //     addVaccinationDose(vaccineName, totalDoses, dose);

        //     }

        const dose: VaccinationDose = {
            id: initialDose?.id ?? crypto.randomUUID(),
            date,
            doseNumber,
            location,
            comment,
            reminder,
            reminderDate: reminder ? reminderDate : null,
            };

            if (initialDose) {
            updateVaccinationDose(dose);
            } else {
            addVaccinationDose(vaccineName, totalDoses, dose);
            }

        console.log('Vaccinationsdos sparad', dose);

        // Only reset form if not editing
        if (!initialDose) {
            setVaccineName('');
            setDate('');
            setDoseNumber('');
            setTotalDoses('');
            setLocation('');
            setComment('');
            setReminder(false);
            setReminderDate('');
        }

        if (onSuccess) {
            onSuccess();
        }

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
