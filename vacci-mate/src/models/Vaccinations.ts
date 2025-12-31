export interface VaccinationDose {
  id: string;
  date: string;
  doseNumber: string;
  location: string;
  comment?: string;
  reminder: boolean;
  reminderDate?: string | null;
}

export interface Vaccination {
  id: string;
  vaccineName: string;
  totalDoses: string;
  doses: VaccinationDose[];
}