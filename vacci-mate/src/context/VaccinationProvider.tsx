import React, { useContext, useEffect, useState } from 'react';
import { VaccinationContext } from './VaccinationContext';
import type { Vaccination, VaccinationDose } from '../models/Vaccinations';
import {
    getVaccinationsForUser,
    saveVaccinationsForUser,
} from '../utils/VaccinationStorage';
import { AuthContext } from './AuthContext';

export const VaccinationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { activeUser } = useContext(AuthContext);
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

    useEffect(() => {
        if (!activeUser) {
            setVaccinations([]);
            return;
        }

        const data = getVaccinationsForUser(activeUser.id);
        setVaccinations(data);
    }, [activeUser?.id]);

    const updateVaccinations = (updated: Vaccination[]) => {
        if (!activeUser) {
            return;
        }
        
        setVaccinations(updated);
        saveVaccinationsForUser(activeUser.id, updated);
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