import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-sss-ebony mb-4">About Us</h1>
                <p className="text-lg text-sss-grey">
                    This is the About Us page for Signature Security Specialist. 
                    Information about the company's story, leadership team, service capabilities, and industry expertise will be displayed here.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
