
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useMissions } from '../context/MissionContext';
import { MissionStatus } from '../types';
import { canApprovePromotions, canApproveTraining } from '../utils/permissions';
import PromotionReview from './PromotionReview';
import TrainingApproval from './TrainingApproval';

const OperationsDashboard: React.FC = () => {
    const { user, users, approveUser } = useAuth();
    const { missions } = useMissions();
    const pendingApprovals = users.filter(user => user.status === 'Pending');
    const activeMissions = missions.filter(m => m.status !== MissionStatus.Completed);

    return (
        <div className="border-t pt-8 space-y-8">
             <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Quick Actions</h2>
                <Link to="/create-user" className="inline-block bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md">
                    Create New Staff User
                </Link>
            </div>
            
            {canApprovePromotions(user) && <PromotionReview />}
            {canApproveTraining(user) && <TrainingApproval />}

            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Active Missions Oversight</h2>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Mission Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Guards Assigned</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activeMissions.map(mission => (
                                <tr key={mission.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{mission.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{mission.assignedGuards.length}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {mission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-sss-sage hover:text-opacity-80">View Details</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {activeMissions.length === 0 && (
                        <p className="text-center py-8 text-sss-grey">No active missions.</p>
                    )}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Pending Approvals ({pendingApprovals.length})</h2>
                {pendingApprovals.length > 0 ? (
                    <div className="space-y-3">
                        {pendingApprovals.map(approval => (
                            <div key={approval.email} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sss-black">{approval.role} Application</p>
                                    <p className="text-sm text-sss-grey">{approval.name} ({approval.email})</p>
                                </div>
                                <button 
                                    onClick={() => approveUser(approval.email)}
                                    className="bg-sss-sage text-white font-bold py-1 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm">
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sss-grey text-center py-4">No pending approvals.</p>
                )}
            </div>
        </div>
    );
};

export default OperationsDashboard;
