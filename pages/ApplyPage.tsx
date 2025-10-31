import React from 'react';
import { Link } from 'react-router-dom';

const ApplicationCard: React.FC<{ title: string, description: string, linkTo: string, linkText: string }> = ({ title, description, linkTo, linkText }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sss-sage transform hover:-translate-y-2 transition-transform duration-300">
        <h3 className="text-2xl font-bold text-sss-ebony mb-3">{title}</h3>
        <p className="text-sss-grey mb-6">{description}</p>
        <Link 
            to={linkTo}
            className="inline-block bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-md"
        >
            {linkText}
        </Link>
    </div>
);

const ApplyPage: React.FC = () => {
    return (
        <div className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sss-ebony">Join Our Team</h1>
                    <p className="mt-4 text-lg text-sss-grey max-w-2xl mx-auto">
                        Whether you're a client seeking elite protection or a professional looking to advance your security career, your journey starts here.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <ApplicationCard 
                        title="For Clients"
                        description="Register your business to gain access to our network of professional, trained, and reliable security officers."
                        linkTo="/apply/client"
                        linkText="Register as a Client"
                    />
                    <ApplicationCard 
                        title="For Guards"
                        description="Apply to become a Signature Security Specialist and get access to exclusive missions, training, and career advancement."
                        linkTo="/apply/guard"
                        linkText="Apply as a Guard"
                    />
                    <ApplicationCard 
                        title="For Supervisors"
                        description="Experienced professionals can apply for leadership roles to oversee missions, conduct spot checks, and manage field teams."
                        linkTo="/apply/supervisor"
                        linkText="Apply as a Supervisor"
                    />
                     <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-sss-sage transform hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-sss-ebony mb-3">Operations & Management</h3>
                        <p className="text-sss-grey mb-6">Senior roles are created internally. To inquire about a position, please contact us directly with your qualifications.</p>
                        <Link 
                            to="/contact"
                            className="inline-block bg-sss-ebony text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-md"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyPage;