export interface User {
    id: string;
    email: string;
    username: string;
    password: string; // TODO: hasha lösenord i produktion?
}