import { createContext } from 'react';
import type { User } from '../models/User';
import type { LoginResult, RegisterResult } from './AuthTypes';


type AuthContext = {
    users: User[];
    activeUser: User | null;
    register: (_email: string, _firstName: string, _password: string) => RegisterResult;
    login: (_email: string, _password: string) => LoginResult;
    logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
    users: [],
    activeUser: null,
    register: (_email, _firstName, _password) => {
        void _email;
        void _firstName;
        void _password;
        throw new Error('AuthContext not initialized');
    },
    login: (_email, _password) => {
        void _email;
        void _password;
        throw new Error('AuthContext not initialized');
    },
    logout: () => {},

});  