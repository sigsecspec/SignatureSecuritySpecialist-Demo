import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMissions } from '../context/MissionContext';
import CameraComponent from '../components/CameraComponent';
import { useAuth } from '../context/AuthContext';

type SpotCheckStage = 'CheckIn' | 'SpotChecking' | 'FinalReport' | 'Completed';
type CheckStage = 'First' | 'Mid' | 'Last';

const SpotCheckPage: React.FC = () => {
    const { missionId } = useParams();
    const navigate = useNavigate();
    const { getMissionById } = useMissions();
    const { users } = useAuth();
    
    const [stage, setStage] = useState<SpotCheckStage>('CheckIn');
    const [currentCheck, setCurrentCheck] = useState<CheckStage | null>(null);
    const [completedChecks, setCompletedChecks] = useState<CheckStage[]>([]);
    const [checkedGuards, setCheckedGuards] = useState<{[key: string]: boolean}>({});

    const mission = getMissionById(Number(missionId));

    if (!mission) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold text-red-600">Mission Not Found</h1>
                <p className="text-sss-grey mt-2">Could not find details for this spot check.</p>
                <button onClick={() => navigate('/dashboard')} className="mt-4 bg-sss-sage text-white font-bold py-2 px-4 rounded-md">Go to Dashboard</button>
            </div>
        );
    }
    
    const handleCheckIn = (imageData: string) => {
        alert("Spot check attendance verified. You may now begin checks.");
        setStage('SpotChecking');
    };

    const handleFinalReport = (imageData: string) => {
        alert("Final report submitted. Spot check complete.");
        setStage('Completed');
        setTimeout(() => navigate('/dashboard'), 2000);
    }
    
    const handleGuardPhotoUpload = (guardEmail: string) => {
        const guardName = users.find(u => u.email === guardEmail)?.name || guardEmail;
        alert(`Photo uploaded for ${guardName}.`);
        setCheckedGuards(prev => ({...prev, [guardEmail]: true}));
    }

    const completeCurrentCheck = () => {
        if (currentCheck) {
            setCompletedChecks(prev => [...prev, currentCheck]);
            setCurrentCheck(null);
            setCheckedGuards({});
        }
    };

    const allChecksDone = completedChecks.length === 3;

    const renderGuardChecklist = () => (
        <div>
            <h3 className="text-xl font-bold text-sss-ebony mb-4">{currentCheck} Spot Check</h3>
            <div className="space-y-3">
            {(mission.assignedGuards || []).map(guardEmail => {
                const guard = users.find(u => u.email === guardEmail);
                const guardName = guard ? guard.name : guardEmail;
                return (
                    <div key={guardEmail} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                        <p>{guardName}</p>
                        {checkedGuards[guardEmail] ? (
                             <span className="text-green-600 font-semibold">Checked</span>
                        ) : (
                            <button onClick={() => handleGuardPhotoUpload(guardEmail)} className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md">
                                Check & Upload Photo
                            </button>
                        )}
                    </div>
                );
            })}
            </div>
             <button 
                onClick={completeCurrentCheck} 
                disabled={Object.keys(checkedGuards).length < (mission.assignedGuards || []).length}
                className="mt-6 w-full bg-sss-sage text-white font-bold py-2 rounded-md disabled:bg-sss-grey disabled:cursor-not-allowed">
                Complete {currentCheck} Check
            </button>
        </div>
    );

    const renderContent = () => {
        switch (stage) {
            case 'CheckIn':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-sss-ebony mb-4">Spot Check Check-In</h2>
                        <p className="text-sss-grey mb-6">Take a selfie to verify your attendance.</p>
                        <CameraComponent onCapture={handleCheckIn} />
                    </div>
                );
            case 'SpotChecking':
                if (currentCheck) {
                    return renderGuardChecklist();
                }
                return (
                     <div>
                        <h2 className="text-2xl font-bold text-sss-ebony mb-6">Spot Check Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <button onClick={() => setCurrentCheck('First')} disabled={completedChecks.includes('First')} className="bg-sss-sage text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 disabled:bg-sss-grey disabled:cursor-not-allowed">
                                {completedChecks.includes('First') ? 'First Check (Done)' : 'Start First Spot Check'}
                            </button>
                             <button onClick={() => setCurrentCheck('Mid')} disabled={!completedChecks.includes('First') || completedChecks.includes('Mid')} className="bg-sss-sage text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 disabled:bg-sss-grey disabled:cursor-not-allowed">
                                {completedChecks.includes('Mid') ? 'Mid Check (Done)' : 'Start Mid Spot Check'}
                            </button>
                             <button onClick={() => setCurrentCheck('Last')} disabled={!completedChecks.includes('Mid') || completedChecks.includes('Last')} className="bg-sss-sage text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-80 disabled:bg-sss-grey disabled:cursor-not-allowed">
                                {completedChecks.includes('Last') ? 'Last Check (Done)' : 'Start Last Spot Check'}
                             </button>
                        </div>
                        <button onClick={() => setStage('FinalReport')} disabled={!allChecksDone} className="mt-8 w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Proceed to Final Report
                        </button>
                    </div>
                );
            case 'FinalReport':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-sss-ebony mb-4">Final Report</h2>
                        <textarea className="w-full h-40 p-2 border rounded-md" placeholder="Enter your final mission report..."></textarea>
                        <p className="text-sm text-sss-grey my-4">Take a final selfie to complete the spot check process.</p>
                        <CameraComponent onCapture={handleFinalReport} />
                    </div>
                );
            case 'Completed':
                 return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Spot Check Completed!</h2>
                        <p className="text-sss-grey">Thank you. Redirecting you to the dashboard...</p>
                    </div>
                );
        }
    };
    
     return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="border-b pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-sss-ebony">Spot Check: {mission.title}</h1>
                        <p className="text-md text-sss-grey">{mission.client} at {mission.location}</p>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default SpotCheckPage;