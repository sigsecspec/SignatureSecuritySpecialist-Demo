
import React from 'react';
import type { Feature } from '../types';

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const GPRIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M12 21.22c-1.4-.06-2.62-.54-4-1.06"/></svg>
);

const TrainingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
);


const features: Feature[] = [
    {
        icon: <ShieldIcon />,
        title: "Technology Innovation",
        description: "Mobile-first platform connecting guards directly with missions via real-time scheduling and GPS verification."
    },
    {
        icon: <GPRIcon />,
        title: "GPS Verification",
        description: "Real-time mission scheduling with GPS verification and accountability systems ensuring guard presence on site."
    },
    {
        icon: <TrainingIcon />,
        title: "Training Integration",
        description: "Comprehensive training-based matching ensures only qualified and certified guards for each mission type."
    }
];

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sss-sage text-white mx-auto mb-4">
            {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-sss-ebony mb-2">{feature.title}</h3>
        <p className="text-sss-grey">{feature.description}</p>
    </div>
);

const FeaturesSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-sss-ebony">Why Choose SigSecSpec?</h2>
                    <p className="mt-4 text-lg text-sss-grey max-w-2xl mx-auto">We leverage technology to provide unmatched security workforce management, ensuring safety, accountability, and excellence.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
