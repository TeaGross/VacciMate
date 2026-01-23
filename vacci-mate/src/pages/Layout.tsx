import './Layout.scss';
import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import { useState } from 'react';
import type { Vaccination, VaccinationDose } from '../models/Vaccinations';
import { VaccinationContext } from '../context/VaccinationContext';
import type { User } from '../models/User';
import { AuthContext } from '../context/AuthContext';
import { getVaccinationsForUser, saveVaccinationsForUser} from '../utils/VaccinationStorage';
import { getUsers, saveUsers, getActiveUser, saveActiveUser} from '../utils/AuthStorage';

export type RegisterResult =
    | { success: true }
    | { success: false; error: 'EMAIL_EXISTS' | 'USERNAME_EXISTS' };

export const Layout = () => {
    const [users, setUsers] = useState<User[]>(() => getUsers());
    const [activeUser, setActiveUser] = useState<User | null>(() => getActiveUser());
    const [vaccinations, setVaccinations] = useState<Vaccination[]>(() => {
        const user = getActiveUser();
        return user ? getVaccinationsForUser(user.id) : [];
        });
    

    // auth logic
    const register = (email: string, username: string, password: string): RegisterResult => {
        
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            return { success: false, error: 'USERNAME_EXISTS' };
        }

        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, error: 'EMAIL_EXISTS' };
        }

        const newUser: User = {
        id: crypto.randomUUID(),
        email,
        username,
        password,
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveUsers(updatedUsers);

        setActiveUser(newUser);
        saveActiveUser(newUser);

        setVaccinations([]);
        saveVaccinationsForUser(newUser.id, []);

        login(email, password);
        return { success: true };
    };

    const login = (email: string, password: string) => {
        const user = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) {
            return false;
        }

        setActiveUser(user);
        saveActiveUser(user);
        setVaccinations(getVaccinationsForUser(user.id));
        return true;
    };

    const logout = () => {
        setActiveUser(null);
        saveActiveUser(null);
        setVaccinations([]);
    };

    const updateVaccinations = (newVaccinations: Vaccination[]) => {
        setVaccinations(newVaccinations);

        if (activeUser) {
            saveVaccinationsForUser(activeUser.id, newVaccinations);
    }
    };

    // Vaccination logic
    const addVaccinationDose = (
        vaccineName: string,
        totalDoses: string,
        dose: VaccinationDose
        ) => {
        const updated = [...vaccinations];

        const existing = updated.find(
            v => v.vaccineName.toLowerCase() === vaccineName.toLowerCase()
        );

        if (existing) {
            existing.doses.push(dose);
        } else {
            updated.push({
            id: crypto.randomUUID(),
            vaccineName,
            totalDoses,
            doses: [dose],
            });
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

        console.log('user:', users);
        console.log('Active user:', activeUser);
        console.log('Vaccinations:', vaccinations);

    return (
        <>
        <AuthContext.Provider value={{users, activeUser, register, login, logout}}>
            <VaccinationContext.Provider 
            value={{
                vaccinations,
                addVaccinationDose,
                updateVaccinationDose,
                updateVaccination,
                deleteVaccinationDose,
                deleteVaccination
            }}>
                <div className='vacci-mate-layout-container'>
                    <Header></Header>
                    <main>
                        <Outlet></Outlet>
                    </main>
                    <footer>footer</footer>
                </div>
            </VaccinationContext.Provider>
        </AuthContext.Provider>
        </>
    );
};