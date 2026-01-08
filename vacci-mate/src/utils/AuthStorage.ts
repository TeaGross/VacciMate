import type { User } from '../models/User';

const USERS_KEY = 'users';
const ACTIVE_USER_KEY = 'activeUser';

export const getUsers = (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
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
