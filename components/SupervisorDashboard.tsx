
import React, { useState } from 'react';
import { useMissions } from '../context/MissionContext';
import { useNavigate } from 'react-router-dom';
import TrainingApproval from './TrainingApproval';

const SupervisorDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('spotChecks');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'spotChecks':
                return <SpotCheckTabContent />;
            case 'training':
                return <TrainingApproval />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                     <button
                        onClick={() => setActiveTab('spotChecks')}
                        className={`${
                            activeTab === 'spotChecks'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Spot Check Assignments
                    </button>
                    <button
                        onClick={() => setActiveTab('training')}
                        className={`${
                            activeTab === 'training'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Training Management
                    </button>
                </nav>
            </div>
            {renderTabContent()}
        </div>
    );
};

const SpotCheckTabContent: React.FC = () => {
    const { missions } = useMissions();
    const navigate = useNavigate();
    const spotCheckMissions = missions.filter(m => m.assignedGuards.length > 0 && m.status !== 'Completed');

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-4">Missions Requiring Spot Checks</h2>
            <div className="space-y-4">
                {spotCheckMissions.length > 0 ? spotCheckMissions.map(mission => (
                    <div key={mission.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sss-black">{mission.title}</p>
                            <p className="text-sm text-sss-grey">Guards: {mission.assignedGuards.join(', ') || 'None'}</p>
                        </div>
                        <button 
                            onClick={() => navigate(`/spotcheck/${mission.id}`)}
                            className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm">
                            Start Spot Check
                        </button>
                    </div>
                )) : <p className="text-sss-grey text-center py-4">No active missions require a spot check at this time.</p>}
            </div>
        </div>
    );
};

export default SupervisorDashboard;
