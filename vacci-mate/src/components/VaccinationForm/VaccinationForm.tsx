import './VaccinationForm.scss';
import { useContext} from 'react';
import type { VaccinationDose } from '../../models/Vaccinations';
import { PrimaryButton } from '../Button/Button';
import { VaccinationContext } from '../../context/VaccinationContext';
import { createReminder } from '../../services/reminderService';
import { AuthContext } from '../../context/AuthContext';
import { useForm, useWatch } from 'react-hook-form';
import { patterns } from '../../validation/validationPatterns';
import { validators } from '../../validation/validators';
import { errorClass } from '../../utils/formUtils';

type VaccinationFormValues = {
    vaccineName: string;
    totalDoses: string;
    date: string;
    doseNumber: string;
    location?: string;
    comment?: string;
    reminder: boolean;
    reminderDate?: string;
};

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
    const {activeUser} = useContext(AuthContext);
    const isVaccineLocked = Boolean(initialVaccine);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        } = useForm<VaccinationFormValues>({
        defaultValues: {
            vaccineName: initialVaccine?.vaccineName ?? '',
            totalDoses: initialVaccine?.totalDoses ?? '',
            date: initialDose?.date ?? '',
            doseNumber: initialDose?.doseNumber ?? '',
            location: initialDose?.location ?? '',
            comment: initialDose?.comment ?? '',
            reminder: initialDose?.reminder ?? false,
            reminderDate: initialDose?.reminderDate ?? '',
        },
    });

    // A11y for name, date and dose error
    const vaccineNameDescribedBy = [errors.vaccineName ? 'vaccineName-error' : null, isVaccineLocked ? 'vaccineName-locked' : null,].filter(Boolean).join(' ');
    const dateDescribedBy = ['date-hint', errors.date ? 'date-error' : null, ].filter(Boolean).join(' ');
    const totalDosesDescribedBy = [ errors.totalDoses ? 'totalDoses-error' : null, isVaccineLocked ? 'totalDoses-locked' : null, ].filter(Boolean).join(' ');

    const totalDoses = useWatch({
    control,
    name: 'totalDoses',
    });

    const reminder = useWatch({
    control,
    name: 'reminder',
    });

    
    const onSubmit = async (data: VaccinationFormValues) => {
        const dose: VaccinationDose = {
            id: initialDose?.id ?? crypto.randomUUID(),
            date: data.date,
            doseNumber: data.doseNumber,
            location: data.location ?? '',
            comment: data.comment ?? '',
            reminder: data.reminder,
            reminderDate: data.reminder ? data.reminderDate! : null,
        };

        const reminderDateChanged =
            data.reminder &&
            data.reminderDate &&
            data.reminderDate !== initialDose?.reminderDate;

        if (initialDose) {
            updateVaccinationDose(dose);
        } else {
            addVaccinationDose(data.vaccineName, data.totalDoses, dose);
        }

        if (reminderDateChanged && activeUser) {
            await createReminder({
            id: crypto.randomUUID(),
            doseId: dose.id,
            email: activeUser.email,
            remindAt: data.reminderDate!,
            vaccineName: data.vaccineName,
            });
        }

        // Reset form if not editing
        if (!initialDose) {
            reset();
        }

        onSuccess?.();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='add-vaccination-form'>
            <label>
                Vaccinationens namn*
                <input 
                type='text'
                className={errorClass(errors.vaccineName)}
                placeholder='Vaccinationens namn'
                disabled={isVaccineLocked}
                aria-invalid={!!errors.vaccineName}
                aria-describedby={vaccineNameDescribedBy}                
                {...register('vaccineName', {
                    required: 'Vaccinationens namn krävs',
                })} />

                {errors.vaccineName && (
                    <span id='vaccineName-error' className='form-error'>{errors.vaccineName.message}</span>
                )}

                {isVaccineLocked && 
                    <small id='vaccineName-locked' className='form-error'>
                        Kan inte ändras här
                    </small>
                }
            </label>

            <label>
                Datum för vaccination*
                <small id="date-hint" className='hint'>Ange datum i formatet ÅÅÅÅ-MM-DD</small>

                <input 
                type='date'
                className={errorClass(errors.date)}
                aria-describedby={dateDescribedBy}
                aria-invalid={!!errors.date}
                {...register('date', {
                    required: 'Datum krävs'
                })} />

                {errors.date && <span id='date-error' className='form-error'>{errors.date.message}</span>}
            </label>
            <div className='dose-container'>
                <label>
                    Dosnummer*
                    <input
                    type='text'
                    className={errorClass(errors.doseNumber)}
                    aria-invalid={!!errors.doseNumber}
                    aria-describedby={errors.doseNumber ? 'doseNumber-error' : undefined}
                    {...register('doseNumber', {
                        required: 'Dosnummer krävs',
                        pattern: patterns.onlyNumbers,
                        validate: {
                            minValue: validators.minValue(1),
                            MaxValue: validators.maxValue(totalDoses, 'Kan ej vara högre än totala doser')
                        }
                    })}
                    />

                    {errors.doseNumber && (
                    <span id='doseNumber-error' className='form-error'>{errors.doseNumber.message}</span>
                    )}
    
                </label>
                <label>
                    Totala doser*
                    <input
                    type='text'
                    className={errorClass(errors.totalDoses)}
                    aria-invalid={!!errors.totalDoses}
                    aria-describedby={totalDosesDescribedBy}
                    {...register('totalDoses', {
                        required: 'Totala doser krävs',
                        pattern: patterns.onlyNumbers,
                        validate: validators.minValue(1),
                    })}
                    disabled={isVaccineLocked}
                    />

                    {errors.totalDoses && (
                    <span id='totalDoses-error' className='form-error'>{errors.totalDoses.message}</span>
                    )}

                    {isVaccineLocked && 
                    <span id='totalDoses-locked' className='form-error'>
                        Kan inte ändras här
                    </span>
                    }
                </label>
            </div>

            <label>
                Plats för vaccination
                <input
                type='text'
                placeholder='T.ex. Vårdcentral'
                {...register('location')} />
            </label>

            <label>
                Kommentar
                <textarea
                placeholder='Biverkningar, upplevelse eller annan anteckning'
                {...register('comment')} 
            />
            </label>
            
            <label className='reminder'>
                <input type='checkbox' {...register('reminder')} />
                Sätt påminnelse för framtida dos  
            </label>

            {reminder && (
                <label>
                    Datum för påminnelse*
                    <input
                    type='date'
                    className={errorClass(errors.reminderDate)}
                    aria-invalid={!!errors.reminderDate}
                    aria-describedby={errors.reminderDate ? 'reminderDate-error' : undefined}
                    {...register('reminderDate', {
                    required: 'Datum för påminnelse krävs',
                    validate: validators.notBeforeToday(),
                    })}

                    />

                    {errors.reminderDate && (
                    <span id='reminderDate-error' className='form-error'>{errors.reminderDate.message}</span>
                    )}
                </label>
            )}
            <PrimaryButton type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Sparar...' : buttonLabel}
            </PrimaryButton>
        </form>
    );
};
