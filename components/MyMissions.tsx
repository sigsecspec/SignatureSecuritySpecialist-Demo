import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMissions } from '../context/MissionContext';
import { Link } from 'react-router-dom';

const MyMissions: React.FC = () => {
    const { user } = useAuth();
    const { missions } = useMissions();

    if (!user) {
        return <p>Please log in to see your missions.</p>;
    }

    const myMissions = missions.filter(mission => user.assignedMissions.includes(mission.id));

    return (
         <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">My Upcoming Missions</h2>
            <div className="space-y-4">
                {myMissions.length > 0 ? (
                    myMissions.map(mission => (
                        <div key={mission.id} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-sss-sage flex justify-between items-center transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <h3 className="text-xl font-bold text-sss-ebony">{mission.title}</h3>
                                <p className="text-sm text-sss-grey">{mission.client} - {mission.location}</p>
                                <p className="text-sm text-sss-black mt-2">
                                    {new Date(mission.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {mission.time}
                                </p>
                            </div>
                            <Link
                                to={`/mission/${mission.id}`}
                                className="bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md"
                            >
                                Start Mission
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-sss-grey text-center py-8">You have not claimed any missions yet. Visit the "Available Missions" tab to find work.</p>
                )}
            </div>
        </div>
    )
}

export default MyMissions;