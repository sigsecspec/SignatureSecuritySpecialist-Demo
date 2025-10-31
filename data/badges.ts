import React from 'react';
import type { Badge } from '../types';

// Fix: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
const StarIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "text-yellow-400" }, React.createElement('path', { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }));
const ShieldIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "text-blue-500" }, React.createElement('path', { d: "M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" }));
const ClockIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "text-green-500" }, React.createElement('path', { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H11v-6h2v4h3.5v2z" }));
const TrophyIcon = () => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "text-purple-500" }, React.createElement('path', { d: "M20.2 6c-1.38 0-2.68.6-3.6 1.59C15.68 6.6 14.38 6 13 6c-1.54 0-2.94.7-3.9 1.84L8.5 2.5 5 2.5v5.03c0 3.82 2.66 7.06 6.22 7.43L11 22h2l-.22-7.54C16.34 14.09 19 10.85 19 7.03V2.5H15.5l-.6 5.34C16.22 7 17.44 6.5 18.5 6.5c.34 0 .68.04 1 .11V6c.06 0 .04 0 .04 0h.66z" }));

export const badges: Badge[] = [
    {
        id: 'top-performer',
        title: 'Top Performer',
        description: 'Maintained a 5-star rating over 10+ missions.',
        // Fix: Call icon component as a function or use React.createElement.
        icon: React.createElement(StarIcon)
    },
    {
        id: 'mission-specialist',
        title: 'Mission Specialist',
        description: 'Completed over 50 missions successfully.',
        icon: React.createElement(ShieldIcon)
    },
    {
        id: 'iron-guard',
        title: 'Iron Guard',
        description: 'Worked over 100 hours in a single month.',
        icon: React.createElement(ClockIcon)
    },
    {
        id: 'guard-of-the-month',
        title: 'Guard of the Month',
        description: 'Awarded for outstanding service and professionalism.',
        icon: React.createElement(TrophyIcon)
    }
];