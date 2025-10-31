import React from 'react';
import { Mission, UserTrainingStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { useMissions } from '../context/MissionContext';
import { trainingModules } from '../data/training';


const MissionCard: React.FC<{ mission: Mission, trainingStatus: UserTrainingStatus, onClaim: (id: number) => void, hasClaimed: boolean }> = ({ mission, trainingStatus, onClaim, hasClaimed }) => {
    
    const isFull = mission.assignedGuards.length >= mission.capacity;

    const getStatusStyles = () => {
        if (hasClaimed) {
             return {
                button: <button disabled className="bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm cursor-not-allowed">Claimed</button>,
                badge: <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Claimed</span>
            };
        }

        if (isFull) {
            return {
                button: <button disabled className="bg-red-400 text-white font-bold py-2 px-4 rounded-md text-sm cursor-not-allowed">Full</button>,
                badge: <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Filled</span>
            };
        }
        
        switch (trainingStatus) {
            case 'Available':
                return {
                    button: <button onClick={() => onClaim(mission.id)} className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all duration-300 text-sm shadow-sm hover:shadow-md">Claim Mission</button>,
                    badge: <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Available</span>
                };
            case 'Training Needed':
                return {
                    button: <button disabled className="bg-sss-grey text-white font-bold py-2 px-4 rounded-md text-sm cursor-not-allowed">Claim Mission</button>,
                    badge: <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Training Needed</span>
                };
            case 'Pending':
                 return {
                    button: <button disabled className="bg-sss-grey text-white font-bold py-2 px-4 rounded-md text-sm cursor-not-allowed">Claim Mission</button>,
                    badge: <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pending Review</span>
                };
            default: return {};
        }
    }
    
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${trainingStatus === 'Available' && !isFull ? 'border-sss-sage' : 'border-sss-grey'} transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}>
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-sss-ebony">{mission.title}</h3>
                        <p className="text-sm text-sss-grey">{mission.client}</p>
                    </div>
                    {getStatusStyles().badge}
                </div>
                <div className="mt-4 space-y-2 text-sm text-sss-black">
                    <p><span className="font-semibold">Location:</span> {mission.location}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(mission.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><span className="font-semibold">Time:</span> {mission.time}</p>
                    <div className="flex justify-between items-baseline pt-2">
                        <p className="text-lg font-bold text-sss-sage">${mission.payRate}/hr</p>
                        <p className="text-sm font-semibold">{mission.assignedGuards.length}/{mission.capacity} Guards</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end items-center space-x-3">
                <p className="text-xs text-sss-grey">Requires: <span className="font-semibold">{trainingModules.find(t => t.missionType === mission.missionType)?.title || 'General Training'}</span></p>
                {getStatusStyles().button}
            </div>
        </div>
    )
};


const MissionBoard: React.FC = () => {
    const { user } = useAuth();
    const { missions, claimMission } = useMissions();

    const userMissions = missions.filter(m => m.teamId === user?.teamId);

    const getTrainingStatus = (missionType: string): UserTrainingStatus => {
        const requiredTraining = trainingModules.find(t => t.missionType === missionType);
        if (!requiredTraining) return 'Available'; 
        if (user?.trainings.includes(requiredTraining.id)) {
            return 'Available';
        }
        if (user?.pendingTrainings.includes(requiredTraining.id)) {
            return 'Pending';
        }
        return 'Training Needed';
    };

    const handleClaim = (missionId: number) => {
        claimMission(missionId);
        alert(`You have claimed the mission. View it in 'My Missions'.`);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sss-ebony">Available Missions</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-sss-grey">Sort by:</span>
                    <select className="border-gray-300 rounded-md text-sm focus:ring-sss-sage focus:border-sss-sage">
                        <option>Pay Rate</option>
                        <option>Date</option>
                        <option>Level</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {userMissions.length > 0 ? (
                    userMissions.map(mission => (
                        <MissionCard 
                            key={mission.id} 
                            mission={mission} 
                            trainingStatus={getTrainingStatus(mission.missionType)}
                            onClaim={handleClaim}
                            hasClaimed={user?.assignedMissions.includes(mission.id) || false}
                        />
                    ))
                ) : (
                    <p className="text-sss-grey col-span-full text-center py-8">No available missions for your team at this time. Check back soon!</p>
                )}
            </div>
        </div>
    );
};

export default MissionBoard;