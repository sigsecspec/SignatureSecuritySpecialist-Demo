
import type { Contract } from '../types';

export const contracts: Contract[] = [
    {
        id: 'WE-2024-01',
        clientName: 'Wayne Enterprises',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        totalHours: 1000,
        usedHours: 320,
        status: 'Active',
        budget: 50000,
    },
    {
        id: 'SI-2024-01',
        clientName: 'Stark Industries',
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        totalHours: 2500,
        usedHours: 850,
        status: 'Active',
        budget: 120000,
    },
];
