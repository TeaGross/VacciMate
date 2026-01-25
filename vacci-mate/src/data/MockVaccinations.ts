import type { Vaccination } from '../models/Vaccinations';

export const demoVaccinations: Vaccination[] = [
    {
        id: crypto.randomUUID(),
        vaccineName: 'Hepatit A + B',
        totalDoses: '3',
        doses: [
        {
            id: crypto.randomUUID(),
            date: '2025-02-15',
            doseNumber: '1',
            location: 'Svea Vaccin',
            comment: 'Inför planerad resa till Thailand',
            reminder: false,
        },
        {
            id: crypto.randomUUID(),
            date: '2025-03-15',
            doseNumber: '2',
            location: 'Svea Vaccin',
            comment: '',
            reminder: true,
            reminderDate: '2026-02-01',
        },
        ],
    },
    {
        id: crypto.randomUUID(),
        vaccineName: 'Gula febern',
        totalDoses: '1',
        doses: [
        {
            id: crypto.randomUUID(),
            date: '2022-04-05',
            doseNumber: '1',
            location: 'VaccinDirekt',
            comment: 'Giltigt livslångt, internationellt intyg utfärdat',
            reminder: false,
        },
        ],
    },
    {
        id: crypto.randomUUID(),
        vaccineName: 'Tyfoid',
        totalDoses: '1',
        doses: [
        {
            id: crypto.randomUUID(),
            date: '2024-04-12',
            doseNumber: '1',
            location: 'VaccinDirekt',
            comment: 'Skydd i ca 3 år',
            reminder: true,
            reminderDate: '2028-04-01',
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
            date: '2024-06-20',
            doseNumber: '1',
            location: 'Vårdcentralen',
            comment: '',
            reminder: false,
        },
        {
            id: crypto.randomUUID(),
            date: '2024-07-20',
            doseNumber: '2',
            location: 'Vårdcentralen',
            comment: '',
            reminder: true,
            reminderDate: '2026-06-01',
        },
        ],
    },
];
