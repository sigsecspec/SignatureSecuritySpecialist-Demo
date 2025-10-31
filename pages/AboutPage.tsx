import React from 'react';
import { users } from '../data/users';
import { UserRole } from '../types';

const AboutPage: React.FC = () => {
    const leadershipTeam = users.filter(u => u.role !== UserRole.Guard && u.role !== UserRole.Client);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Mission & Vision */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sss-ebony mb-4">Our Commitment to Excellence</h1>
                    <p className="max-w-3xl mx-auto text-lg text-sss-grey">
                        At Signature Security Specialist, we are revolutionizing the private security industry through cutting-edge technology, comprehensive training, and an unwavering dedication to our clients and guards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-sss-sage">
                        <h2 className="text-3xl font-bold text-sss-ebony mb-3">Our Mission</h2>
                        <p className="text-sss-grey">
                            To provide seamless, professional security services through innovative technology that connects qualified guards with clients, ensuring safety, accountability, and operational excellence in every mission. We are committed to revolutionizing the private security industry through cutting-edge workforce management technology, comprehensive training programs, and unwavering dedication to client satisfaction and guard professional development.
                        </p>
                    </div>
                     <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-sss-sage">
                        <h2 className="text-3xl font-bold text-sss-ebony mb-3">Our Vision</h2>
                        <p className="text-sss-grey">
                            To become the leading technology-driven security workforce management platform, setting the industry standard for operational excellence, guard development, and client service delivery across all security sectors.
                        </p>
                    </div>
                </div>

                {/* Leadership Team */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-sss-ebony mb-12">Meet Our Leadership</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {leadershipTeam.map(leader => (
                            <div key={leader.email} className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-24 h-24 rounded-full mx-auto bg-sss-grey mb-4 flex items-center justify-center">
                                    <span className="text-3xl text-white font-bold">{leader.name.charAt(0)}</span>
                                </div>
                                <h3 className="text-xl font-bold text-sss-ebony">{leader.name}</h3>
                                <p className="text-sss-sage font-semibold">{leader.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service Capabilities */}
                <div>
                     <h2 className="text-3xl md:text-4xl font-extrabold text-center text-sss-ebony mb-12">Our Service Capabilities</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-xl mb-2 text-sss-ebony">Technology Platform</h3>
                            <p className="text-sss-grey">Our mobile-first platform provides real-time scheduling, GPS verification, integrated messaging, and complete transparency for both guards and clients.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-xl mb-2 text-sss-ebony">Professional Guards</h3>
                            <p className="text-sss-grey">We provide licensed, highly-trained professionals for armed/unarmed, event, corporate, retail, and construction security needs.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-xl mb-2 text-sss-ebony">Quality Assurance</h3>
                            <p className="text-sss-grey">Through supervisor spot checks, performance tracking, and a triple verification system, we ensure the highest standards of service excellence.</p>
                        </div>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;