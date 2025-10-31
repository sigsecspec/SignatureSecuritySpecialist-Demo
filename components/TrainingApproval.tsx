
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { trainingModules } from '../data/training';

const TrainingApproval: React.FC = () => {
    const { users, reviewTraining } = useAuth();
    const guardsWithPendingTraining = users.filter(u => u.pendingTrainings && u.pendingTrainings.length > 0);

    const getTrainingTitle = (id: string) => {
        return trainingModules.find(t => t.id === id)?.title || 'Unknown Training';
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-4">Pending Training Approvals</h2>
            {guardsWithPendingTraining.length > 0 ? (
                <div className="space-y-4">
                    {guardsWithPendingTraining.map(guard => (
                        <div key={guard.email} className="bg-gray-50 rounded-lg p-4 shadow-sm border">
                            <p className="font-semibold text-sss-black">{guard.name}</p>
                            <div className="mt-2 space-y-2">
                                {guard.pendingTrainings.map(trainingId => (
                                    <div key={trainingId} className="flex justify-between items-center bg-white p-2 rounded">
                                        <p className="text-sm text-sss-grey">{getTrainingTitle(trainingId)}</p>
                                        <div className="space-x-2">
                                            <button onClick={() => reviewTraining(guard.email, trainingId, 'approve')} className="bg-sss-sage text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs">Approve</button>
                                            <button onClick={() => reviewTraining(guard.email, trainingId, 'deny')} className="bg-sss-grey text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs">Deny</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sss-grey text-center py-4">No pending training approvals.</p>
            )}
        </div>
    );
};

export default TrainingApproval;
