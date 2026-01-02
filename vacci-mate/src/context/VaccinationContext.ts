import React, { createContext } from 'react';
import type { Vaccination } from '../models/Vaccinations';


type VaccinationContext = {
    vaccinations: Vaccination[];
    setVaccinations: React.Dispatch<React.SetStateAction<Vaccination[]>>;
};

export const VaccinationContext = createContext<VaccinationContext>({
    vaccinations: [],
    setVaccinations: () => {},
});