
import React from 'react';
import type { Stat } from '../types';

const stats: Stat[] = [
    { value: "1,200+", label: "Guards Served" },
    { value: "500+", label: "Clients Satisfied" },
    { value: "15,000+", label: "Missions Completed" },
    { value: "99.8%", label: "Completion Rate" },
];

const StatsSection: React.FC = () => {
    return (
        <section className="bg-sss-ebony text-sss-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <p className="text-4xl md:text-5xl font-extrabold text-sss-sage">{stat.value}</p>
                            <p className="mt-2 text-lg text-sss-silver">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
