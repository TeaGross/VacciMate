import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../models/User';
import type { LoginResult, RegisterResult } from './AuthTypes';
import {getUsers, saveUsers, getActiveUser, saveActiveUser} from '../utils/AuthStorage';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<User[]>(() => getUsers());
    const [activeUser, setActiveUser] = useState<User | null>(() =>
        getActiveUser()
    );

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

        // har tagit bort TODO
        // setVaccinations([]);
        //         saveVaccinationsForUser(newUser.id, []);
        
        //         login(email, password)

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
        // Tagit bort 
        // setVaccinations(getVaccinationsForUser(userByEmail.id));

        return { success: true };
    };

    const logout = () => {
        setActiveUser(null);
        saveActiveUser(null);
        // tagit bort setVaccinations([]);
    };

    return (
        <AuthContext.Provider
        value={{ users, activeUser, register, login, logout }}
        >
        {children}
        </AuthContext.Provider>
    );
};
