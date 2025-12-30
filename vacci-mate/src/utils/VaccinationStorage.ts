import type { Vaccination, VaccinationDose } from '../models/Vaccinations';

const STORAGE_KEY = 'vaccinations';

/** Hämta alla vaccinationer */
export const getVaccinations = (): Vaccination[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

/** Spara alla vaccinationer */
const saveAll = (vaccinations: Vaccination[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vaccinations));
};

/** Lägg till en dos till en vaccination (eller skapa ny) */
export const addVaccinationDose = (
    vaccineName: string,
    totalDoses: string,
    dose: VaccinationDose
    ) => {
    const vaccinations = getVaccinations();

    const existingVaccination = vaccinations.find(
        (v) => v.vaccineName.toLowerCase() === vaccineName.toLowerCase()
    );

    if (existingVaccination) {
        existingVaccination.doses.push(dose);
    } else {
        const newVaccination: Vaccination = {
            id: crypto.randomUUID(),
            vaccineName,
            totalDoses,
            doses: [dose],
        };
        vaccinations.push(newVaccination);
    }

    saveAll(vaccinations);
};
