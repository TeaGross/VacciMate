import { demoUser } from '../data/MockUser';
import type { User } from '../models/User';

const USERS_KEY = 'users';
const ACTIVE_USER_KEY = 'activeUser';

/**
 * Reads all registered users from localStorage.
 *
 * - Seeds a demo user on first app load
 * - Falls back to demo user if stored data is corrupted
 */
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

/**
 * Stores the full user list to localStorage
 */
export const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Returns the currently active (logged-in) user.
 *
 * - Used to restore login state on page refresh
 */
export const getActiveUser = (): User | null => {
    const data = localStorage.getItem(ACTIVE_USER_KEY);
    return data ? JSON.parse(data) : null;
};

/**
 * Stores the active user to localStorage.
 *
 * - When user is null, the active user is cleared
 *   (e.g. on logout)
 */
export const saveActiveUser = (user: User | null) => {
    if (!user) {
        localStorage.removeItem(ACTIVE_USER_KEY);
    } else {
        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
    }
};
