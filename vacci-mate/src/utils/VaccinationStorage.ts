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
    ): Vaccination[] => {
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
    return vaccinations;
};

/** Uppdatera en dos */
export const updateVaccinationDose = (doseId: string, updatedDose: VaccinationDose) => {
    const vaccinations = getVaccinations();
    
    vaccinations.forEach(vaccination => {
        const doseIndex = vaccination.doses.findIndex(d => d.id === doseId);
        if (doseIndex !== -1) {
            vaccination.doses[doseIndex] = updatedDose;
        }
    });
    
    saveAll(vaccinations);
};

/** Ta bort en dos */
export const deleteVaccinationDose = (doseId: string) => {
    const vaccinations = getVaccinations();
    
    vaccinations.forEach(vaccination => {
        vaccination.doses = vaccination.doses.filter(d => d.id !== doseId);
    });
    
    // Ta bort vaccinationen helt om det inte finns några doser kvar
    const filtered = vaccinations.filter(v => v.doses.length > 0);
    saveAll(filtered);
};
