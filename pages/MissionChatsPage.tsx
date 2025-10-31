
import React from 'react';
import { useMissions } from '../context/MissionContext';
import { MissionStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MissionChatsPage: React.FC = () => {
    const { missions } = useMissions();
    const { users } = useAuth();
    const activeMissions = missions.filter(m => m.status === 'In Progress' || m.status === 'Available' || m.status === 'Filled');
    
    const getGuardNames = (emails: string[]) => {
        if (emails.length === 0) return 'No guards assigned';
        return emails.map(email => users.find(u => u.email === email)?.name || email).join(', ');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-2">Active Mission Chats</h1>
            <p className="text-lg text-sss-grey mb-8">Oversee and join real-time communications for ongoing missions.</p>

            <div className="space-y-4">
                {activeMissions.length > 0 ? (
                    activeMissions.map(mission => (
                         <div key={mission.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-sss-sage flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-sss-ebony">{mission.title}</h3>
                                <p className="text-sm text-sss-grey">{mission.client} | {mission.location}</p>
                                <p className="text-xs text-sss-black mt-1">
                                    <span className="font-semibold">Guards:</span> {getGuardNames(mission.assignedGuards)}
                                </p>
                            </div>
                            {/* In a real app, this would link to a live chat interface for this specific mission */}
                            <Link 
                                to={`/mission/${mission.id}`}
                                className="bg-sss-ebony text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md"
                            >
                                Join Chat
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-sss-ebony">No Active Missions</h3>
                        <p className="text-sss-grey mt-1">There are no missions currently in progress to monitor.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionChatsPage;
