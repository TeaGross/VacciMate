import { demoVaccinations } from '../data/MockVaccinations';
import type { Vaccination } from '../models/Vaccinations';

const STORAGE_KEY = 'vaccinationsByUser';
const DEMO_USER_ID = 'demo-user';

/**
 * Maps userId -> list of vaccinations
 * Used to keep vaccination data separated per user in localStorage
 */
type VaccinationMap = {
    [userId: string]: Vaccination[];
    };

    /**
     * Reads the entire vaccination map from localStorage
     */
    const getAll = (): VaccinationMap => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
    };

    /**
     * Stores the entire vaccination map to localStorage
     */
    const saveAll = (map: VaccinationMap) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    };

    /**
     * Returns vaccinations for a specific user.
     *
     * - Each user has their own entry in localStorage
     * - The demo user is automatically seeded with demo vaccinations
     *   on first app load
     * - Other users start with an empty list
     */
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
    /**
     * Saves vaccinations for a specific user.
     * Overwrites the existing vaccination list for that user.
     */
    export const saveVaccinationsForUser = (
    userId: string,
    vaccinations: Vaccination[]
    ) => {
    const map = getAll();
    map[userId] = vaccinations;
    saveAll(map);
};
