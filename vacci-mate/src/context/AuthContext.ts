import { createContext } from 'react';
import type { User } from '../models/User';
import type { LoginResult, RegisterResult } from '../pages/Layout';


type AuthContext = {
    users: User[];
    activeUser: User | null;
    register: (email: string, username: string, password: string) => RegisterResult;
    login: (email: string, password: string) => LoginResult;
    logout: () => void;
};

export const AuthContext = createContext<AuthContext>(
    {} as AuthContext
);  