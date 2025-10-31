import React from 'react';

const Step: React.FC<{ number: string, title: string, description: string }> = ({ number, title, description }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-sss-sage text-white font-bold">
                    {number}
                </div>
            </div>
            <div className="w-px h-full bg-gray-300"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-xl font-bold text-sss-ebony">{title}</p>
            <p className="text-sss-grey">{description}</p>
        </div>
    </div>
);


const HowItWorksPage: React.FC = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sss-ebony mb-4">A Seamless Process for Guards & Clients</h1>
                    <p className="max-w-3xl mx-auto text-lg text-sss-grey">
                        Our platform is designed for efficiency and transparency. Follow these simple steps to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* For Guards */}
                    <div>
                        <h2 className="text-3xl font-bold text-center text-sss-ebony mb-8">For Guards</h2>
                        <div className="mx-auto">
                            <Step 
                                number="1" 
                                title="Apply Online" 
                                description="Submit your application through our secure portal. We'll verify your licenses and experience to get you ready for approval."
                            />
                             <Step 
                                number="2" 
                                title="Complete Training" 
                                description="Access our Training Center to complete modules for different mission types. Passing quizzes unlocks more work opportunities."
                            />
                             <Step 
                                number="3" 
                                title="Claim Missions" 
                                description="Browse the Mission Board for available shifts that match your training. Claim missions with a single click and get instant confirmation."
                            />
                             <Step 
                                number="4" 
                                title="Execute & Get Paid" 
                                description="Use the app to check-in, manage your mission, and check-out. Your pay is calculated automatically and processed weekly."
                            />
                        </div>
                    </div>

                     {/* For Clients */}
                    <div>
                        <h2 className="text-3xl font-bold text-center text-sss-ebony mb-8">For Clients</h2>
                        <div className="mx-auto">
                           <Step 
                                number="1" 
                                title="Register Your Business" 
                                description="Submit your company details for verification. Our team will review your application and set up your client account."
                            />
                           <Step 
                                number="2" 
                                title="Set Up Your Contract" 
                                description="Define your security needs, budget, and contract terms. Our flexible plans allow for both long-term and pay-per-use services."
                            />
                           <Step 
                                number="3" 
                                title="Post Your Missions" 
                                description="Use your dashboard to post security missions, specifying the date, time, location, and required guard qualifications."
                            />
                           <Step 
                                number="4" 
                                title="Monitor & Manage" 
                                description="Receive real-time updates as guards are assigned. Monitor mission progress and manage all your security operations from one central dashboard."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;