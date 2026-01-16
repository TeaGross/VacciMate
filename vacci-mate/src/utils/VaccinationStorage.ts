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

    // export const getVaccinationsForUser = (userId: string): Vaccination[] => {
    // const map = getAll();
    // return map[userId] ?? [];
    // };

    export const getVaccinationsForUser = (userId: string): Vaccination[] => {
        const map = getAll();

        // 👇 Seed demo-data första gången
        if (!map[userId] && userId === DEMO_USER_ID) {
            map[userId] = demoVaccinations;
            saveAll(map);
            return demoVaccinations;
        }

        return map[userId] ?? [];
    };

    export const saveVaccinationsForUser = (
    userId: string,
    vaccinations: Vaccination[]
    ) => {
    const map = getAll();
    map[userId] = vaccinations;
    saveAll(map);
};
