import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../models/User';
import type { LoginResult, RegisterResult } from './AuthTypes';
import {getUsers, saveUsers, getActiveUser, saveActiveUser} from '../utils/AuthStorage';
import { VaccinationContext } from './VaccinationContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<User[]>(() => getUsers());
    const [activeUser, setActiveUser] = useState<User | null>(() =>
        getActiveUser()
    );
    const { loadVaccinationsForUser, clearVaccinations } = useContext(VaccinationContext);

    useEffect(() => {
        if (activeUser) {
            loadVaccinationsForUser(activeUser.id);
        }   
    }, []);

    const register = (
        email: string,
        firstName: string,
        password: string
    ): RegisterResult => {

        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'EMAIL_EXISTS' };
        }

        const newUser: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        password,
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        saveUsers(updatedUsers);

        setActiveUser(newUser);
        saveActiveUser(newUser);
        loadVaccinationsForUser(newUser.id);
        

        return { success: true };
    };

    const login = (email: string, password: string): LoginResult => {
        const userByEmail = users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!userByEmail) {
        return { success: false, error: 'EMAIL_NOT_FOUND' };
        }

        if (userByEmail.password !== password) {
        return { success: false, error: 'WRONG_PASSWORD' };
        }

        setActiveUser(userByEmail);
        saveActiveUser(userByEmail);
        loadVaccinationsForUser(userByEmail.id);
        return { success: true };
    };

    const logout = () => {
        setActiveUser(null);
        saveActiveUser(null);
        clearVaccinations();
    };

    return (
        <AuthContext.Provider
        value={{ users, activeUser, register, login, logout }}
        >
        {children}
        </AuthContext.Provider>
    );
};
