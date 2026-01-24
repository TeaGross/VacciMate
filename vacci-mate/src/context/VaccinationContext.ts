import { createContext } from 'react';
import type { Vaccination, VaccinationDose } from '../models/Vaccinations';

export type VaccinationContextType = {
    vaccinations: Vaccination[];

    addVaccinationDose: (
        vaccineName: string,
        totalDoses: string,
        dose: VaccinationDose
    ) => void;

    updateVaccinationDose: (dose: VaccinationDose) => void;

    updateVaccination: (
    vaccinationId: string,
    updates: Partial<Pick<Vaccination, 'vaccineName' | 'totalDoses'>>
    ) => void;

    deleteVaccinationDose: (doseId: string) => void;
    deleteVaccination: (vaccinationId:string) => void;
    };

 

    export const VaccinationContext = createContext<VaccinationContextType>({
    vaccinations: [],
    addVaccinationDose: () => {},
    updateVaccinationDose: () => {},
    updateVaccination: () => {},
    deleteVaccinationDose: () => {},
    deleteVaccination: () => {}
});
