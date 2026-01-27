import { demoVaccinations } from '../data/MockVaccinations';
import type { Vaccination } from '../models/Vaccinations';

const STORAGE_KEY = 'vaccinationsByUser';
const DEMO_USER_ID = 'demo-user';

type VaccinationMap = {
    [userId: string]: Vaccination[];
    };

    const getAll = (): VaccinationMap => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
    };

    const saveAll = (map: VaccinationMap) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    };


    export const getVaccinationsForUser = (userId: string): Vaccination[] => {
        try {
            const map = getAll();

            // Seed vaccinations for demo user on first app load
            if (!map[userId] && userId === DEMO_USER_ID) {
                map[userId] = demoVaccinations;
                saveAll(map);
                return demoVaccinations;
            }

            // Return empty array if user has no vaccinations
            return map[userId] ?? [];
        } catch (error) {
            console.error('Failed to read vaccinations from localStorage', error);
            return [];
        }

    };

    export const saveVaccinationsForUser = (
    userId: string,
    vaccinations: Vaccination[]
    ) => {
    const map = getAll();
    map[userId] = vaccinations;
    saveAll(map);
};
