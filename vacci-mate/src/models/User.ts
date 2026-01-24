export interface User {
    id: string;
    email: string;
    firstName: string;
    password: string; // TODO: hasha lösenord i produktion?
}