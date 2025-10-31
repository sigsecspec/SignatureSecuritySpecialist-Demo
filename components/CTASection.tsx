import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-sss-ebony">Ready to Elevate Your Security Operations?</h2>
                <p className="mt-4 text-lg text-sss-grey max-w-2xl mx-auto">Join the new standard in security workforce management. Whether you're a guard seeking missions or a client needing protection, we have you covered.</p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link 
                        to="/apply/client" 
                        className="bg-sss-sage text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                    >
                        Become a Client
                    </Link>
                    <Link 
                        to="/apply/guard" 
                        className="bg-sss-grey text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                    >
                        Join as a Guard
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTASection;