import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    return (
        <div className="bg-sss-ebony text-sss-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                    Your Security, <span className="text-sss-sage">Our Mission</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-sss-silver mb-8">
                    To provide seamless, professional security services through innovative technology that connects qualified guards with clients, ensuring safety, accountability, and operational excellence in every mission.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link 
                        to="/register/Client" 
                        className="bg-sss-sage text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                    >
                        New Client
                    </Link>
                    <Link 
                        to="/register/Guard" 
                        className="bg-sss-grey text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                    >
                        New Guard
                    </Link>
                    <Link 
                        to="/register/Supervisor" 
                        className="border-2 border-sss-sage text-sss-sage font-bold py-3 px-6 rounded-lg hover:bg-sss-sage hover:text-white transition-all duration-300 shadow-lg"
                    >
                        New Supervisor
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;