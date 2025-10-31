
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    );
};

export default HomePage;
