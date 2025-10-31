import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { teams } from '../data/teams';
import { trainingModules } from '../data/training';
import { useNotification } from '../context/NotificationContext';
import { UserRole } from '../types';

const ProfilePage: React.FC = () => {
    const { email } = useParams<{ email: string }>();
    const { users, user: loggedInUser, applyForPromotion } = useAuth();
    const { addNotification } = useNotification();
    
    const decodedEmail = email ? decodeURIComponent(email) : undefined;
    const user = users.find(u => u.email === decodedEmail);

    if (!user) {
        return <Navigate to="/dashboard" replace />;
    }
    
    const isOwnProfile = loggedInUser?.email === user.email;

    const handleApplyForPromotion = () => {
        if (isOwnProfile) {
            applyForPromotion(user.email);
            addNotification({ type: 'success', message: 'Your application for promotion has been submitted!' });
        }
    };

    const getTeamName = (teamId?: number) => {
        if (!teamId) return 'N/A';
        return teams.find(t => t.id === teamId)?.name || 'Unknown Team';
    };
    
    const getTrainingTitle = (trainingId: string) => {
        return trainingModules.find(t => t.id === trainingId)?.title || 'Unknown Training';
    }
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-sss-ebony">User Profile</h1>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full bg-sss-grey flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-sss-ebony">{user.name}</h2>
                            {user.rank && <p className="text-sss-sage font-semibold text-lg">{user.rank}</p>}
                            <p className="text-sss-grey">{user.email}</p>
                        </div>
                    </div>
                     {isOwnProfile && user.role === UserRole.Guard && user.promotionStatus === 'None' && (
                        <div className="mt-4 md:mt-0">
                            <button 
                                onClick={handleApplyForPromotion}
                                className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md">
                                Apply for Promotion
                            </button>
                        </div>
                     )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-sss-grey">Status</p>
                        <p className={`font-semibold text-lg ${user.status === 'Active' ? 'text-green-600' : 'text-blue-600'}`}>{user.status}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-sss-grey">Role</p>
                        <p className="font-semibold text-lg text-sss-ebony">{user.title}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-sss-grey">Team</p>
                        <p className="font-semibold text-lg text-sss-ebony">{getTeamName(user.teamId)}</p>
                    </div>
                     <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-sss-grey">Subscription</p>
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-lg text-sss-ebony">{user.subscription || 'Basic'}</p>
                            {isOwnProfile && user.role === UserRole.Guard && <button className="text-xs font-bold text-sss-sage">Upgrade</button>}
                        </div>
                    </div>
                </div>
                
                <div>
                     <h3 className="text-xl font-bold text-sss-ebony mb-4">Completed Trainings</h3>
                     <div className="space-y-2">
                        {user.trainings.length > 0 ? (
                            user.trainings.map(trainingId => (
                                <div key={trainingId} className="bg-green-100 text-green-800 p-3 rounded-md font-medium">
                                    {getTrainingTitle(trainingId)}
                                </div>
                            ))
                        ) : (
                            <p className="text-sss-grey">No trainings completed yet.</p>
                        )}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;