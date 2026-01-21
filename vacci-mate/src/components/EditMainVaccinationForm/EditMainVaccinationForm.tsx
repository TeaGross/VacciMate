import { useContext} from 'react';
import { PrimaryButton } from '../Button/Button';
import type { Vaccination } from '../../models/Vaccinations';
import { VaccinationContext } from '../../context/VaccinationContext';
import './EditMainVaccination.scss';
import { useForm } from 'react-hook-form';
import { patterns } from '../../validation/validationPatterns';

type EditMainVaccinationFormValues = {
    vaccineName: string;
    totalDoses: string;
};

interface Props {
    vaccination: Vaccination;
    onSuccess: () => void;
}

export const EditMainVaccinationForm = ({ vaccination, onSuccess }: Props) => {
    const { updateVaccination } = useContext(VaccinationContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<EditMainVaccinationFormValues>({
        defaultValues: {
            vaccineName: vaccination.vaccineName,
            totalDoses: vaccination.totalDoses,
        },
    });

    const onSubmit = (data: EditMainVaccinationFormValues) => {
        updateVaccination(vaccination.id, {
            vaccineName: data.vaccineName,
            totalDoses: data.totalDoses,
        });

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='edit-main-vaccination-form'>
        <label className='edit-main-vaccination-label'>
            Vaccinationens namn
            <input
            {...register('vaccineName', {
                required: 'Vaccinationens namn krävs',
            })}
            />
            {errors.vaccineName && (
            <span className="form-error">{errors.vaccineName.message}</span>
            )}
        </label>

        <label className='edit-main-vaccination-label'>
            Totala doser
            <input
            type="text"
            {...register('totalDoses', {
                required: 'Totala doser krävs',
                pattern: patterns.onlyNumbers,
                validate: (value) =>
                +value >= vaccination.doses.length ||
                'Kan inte vara lägre än befintliga doser',
            })}
            />
            {errors.totalDoses && (
            <span className="form-error">{errors.totalDoses.message}</span>
            )}
        </label>


        <PrimaryButton type="submit">Spara</PrimaryButton>
        </form>
    );
};
