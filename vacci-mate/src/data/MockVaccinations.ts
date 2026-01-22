import type { Vaccination } from '../models/Vaccinations';

export const demoVaccinations: Vaccination[] = [
    {
        id: crypto.randomUUID(),
        vaccineName: 'Covid-19',
        totalDoses: '5',
        doses: [
        {
            id: crypto.randomUUID(),
            date: '2022-01-15',
            doseNumber: '1',
            location: 'Vårdcentralen',
            comment: 'Inga biverkningar',
            reminder: false,
        },
        {
            id: crypto.randomUUID(),
            date: '2022-03-15',
            doseNumber: '2',
            location: 'Vårdcentralen',
            comment: '',
            reminder: false,
        },
        ],
    },
    {
        id: crypto.randomUUID(),
        vaccineName: 'TBE',
        totalDoses: '3',
        doses: [
        {
            id: crypto.randomUUID(),
            date: '2023-06-10',
            doseNumber: '1',
            location: 'Vårdcentralen',
            comment: '',
            reminder: true,
            reminderDate: '2024-06-01',
        },
        ],
    },
];
