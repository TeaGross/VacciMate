import { createContext } from 'react';
import type { Vaccination, VaccinationDose } from '../models/Vaccinations';

export type VaccinationContextType = {
    vaccinations: Vaccination[];

    addVaccinationDose: (
        _vaccineName: string,
        _totalDoses: string,
        _dose: VaccinationDose
    ) => void;

    updateVaccinationDose: (_dose: VaccinationDose) => void;

    updateVaccination: (
    _vaccinationId: string,
    _updates: Partial<Pick<Vaccination, 'vaccineName' | 'totalDoses'>>
    ) => void;

    deleteVaccinationDose: (_doseId: string) => void;
    deleteVaccination: (_vaccinationId:string) => void;
    };

 

    export const VaccinationContext = createContext<VaccinationContextType>({
    vaccinations: [],
    addVaccinationDose: () => {},
    updateVaccinationDose: () => {},
    updateVaccination: () => {},
    deleteVaccinationDose: () => {},
    deleteVaccination: () => {}
});
