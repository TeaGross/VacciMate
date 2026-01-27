import { demoUser } from '../data/MockUser';
import type { User } from '../models/User';

const USERS_KEY = 'users';
const ACTIVE_USER_KEY = 'activeUser';

export const getUsers = (): User[] => {
    try {
        const data = localStorage.getItem(USERS_KEY);

        if (!data) {
            // Seed demo user on first app load
            localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]));
            return [demoUser];
        }

        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read users from localStorage', error);
        return [demoUser];
    }
};

export const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getActiveUser = (): User | null => {
    const data = localStorage.getItem(ACTIVE_USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const saveActiveUser = (user: User | null) => {
    if (!user) {
        localStorage.removeItem(ACTIVE_USER_KEY);
    } else {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    }
};
