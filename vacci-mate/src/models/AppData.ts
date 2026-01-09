import type { User } from "./User";
import type { Vaccination } from "./Vaccinations";


export interface AppData {
    users: User[];
    activeUserId: string | null;
    vaccinationsByUser: {
        [userId: string]: Vaccination[];
    };
}