import { createContext } from 'react';
import type { User } from '../models/User';
import type { LoginResult, RegisterResult } from './AuthTypes';


type AuthContext = {
    users: User[];
    activeUser: User | null;
    register: (email: string, firstName: string, password: string) => RegisterResult;
    login: (email: string, password: string) => LoginResult;
    logout: () => void;
};

export const AuthContext = createContext<AuthContext>(
    {} as AuthContext
);  