import React, { useContext, useState } from 'react';
import { VaccinationContext } from './VaccinationContext';
import type { Vaccination, VaccinationDose } from '../models/Vaccinations';
import {
    getVaccinationsForUser,
    saveVaccinationsForUser,
} from '../utils/VaccinationStorage';

export const VaccinationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const loadVaccinationsForUser = (userId: string) => {
        setCurrentUserId(userId);
        const data = getVaccinationsForUser(userId);
        setVaccinations(data);
    };

    const clearVaccinations = () => {
        setCurrentUserId(null);
        setVaccinations([]);
    };

    const updateVaccinations = (newVaccinations: Vaccination[]) => {
        setVaccinations(newVaccinations);

        if (!currentUserId) {
            return;
        }

        saveVaccinationsForUser(currentUserId, newVaccinations);
    };

    const addVaccinationDose = (vaccineName: string, totalDoses: string, dose: VaccinationDose) => {   
            const existing = vaccinations.find(
                v => v.vaccineName.toLowerCase() === vaccineName.toLowerCase()
            );
                
            let updated: Vaccination[];

            if (existing) {
                updated = vaccinations.map(v =>
                v.id === existing.id
                    ? { ...v, doses: [...v.doses, dose] }
                    : v
                );
            } else {
                updated = [
                ...vaccinations,
                {
                    id: crypto.randomUUID(),
                    vaccineName,
                    totalDoses,
                    doses: [dose],
                },
                ];
            }
            updateVaccinations(updated);
    };

        const updateVaccinationDose = (updatedDose: VaccinationDose) => {
            const updated = vaccinations.map(v => ({
                ...v,
                doses: v.doses.map(d =>
                d.id === updatedDose.id ? updatedDose : d
                ),
            }));

            updateVaccinations(updated);
        };

        const updateVaccination = (
            vaccinationId: string,
            updates: Partial<Pick<Vaccination, 'vaccineName' | 'totalDoses'>>
            ) => {
            const updated = vaccinations.map(v =>
                v.id === vaccinationId
                ? { ...v, ...updates }
                : v
            );

            updateVaccinations(updated);
        };

        const deleteVaccinationDose = (doseId: string) => {
            const updated = vaccinations.map(v => ({
                ...v,
                doses: v.doses.filter(d => d.id !== doseId),
            }));
            updateVaccinations(updated);
        };

        const deleteVaccination = (vaccinationId: string) => {
            const updated = vaccinations.filter(v => v.id !== vaccinationId);
            updateVaccinations(updated);
        };

        return (
    <VaccinationContext.Provider
        value={{
            vaccinations,
            loadVaccinationsForUser,
            clearVaccinations,
            addVaccinationDose,
            updateVaccinationDose,
            updateVaccination,
            deleteVaccinationDose,
            deleteVaccination,
        }}
        >
        {children}
        </VaccinationContext.Provider>
    );
};