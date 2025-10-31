import { Team } from '../types';

export const teams: Team[] = [
    {
        id: 1,
        name: "Team Alpha",
        // Fix: Separated director and manager based on user roles in users.ts
        director: "James Lyons",
        manager: "Tommy Moreno",
    },
    {
        id: 2,
        name: "Team Bravo",
        // Fix: Added manager based on user roles in users.ts
        director: "Brandon Baker",
        manager: "Ronald Granum",
    },
];