
import React from 'react';
import type { Stat, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useMissions } from '../context/MissionContext';
import { MissionStatus } from '../types';
import PromotionReview from './PromotionReview';
import TrainingApproval from './TrainingApproval';

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
        <p className="text-3xl font-bold text-sss-ebony">{stat.value}</p>
        <p className="text-sm text-sss-grey mt-1">{stat.label}</p>
    </div>
);

const OwnerDashboard: React.FC = () => {
    const { users, approveUser } = useAuth();
    const { missions } = useMissions();
    const activeMissions = missions.filter(m => m.status !== MissionStatus.Completed).length;
    const revenue = 0; // Mock data removed
    
    const ownerStats: Stat[] = [
        { value: users.length.toString(), label: "Total Users" },
        { value: activeMissions.toString(), label: "Active Missions" },
        { value: users.filter(u => u.status === 'Pending').length.toString(), label: "Pending Approvals" },
        { value: `$${revenue.toLocaleString()}`, label: "Revenue (Month)" },
    ];

    return (
        <div className="border-t pt-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">System Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ownerStats.map(stat => <StatCard key={stat.label} stat={stat} />)}
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Quick Actions</h2>
                <Link to="/create-user" className="inline-block bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md">
                    Create New User
                </Link>
            </div>
            
            <PromotionReview />

            <TrainingApproval />

            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">User Management</h2>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                             <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user.email}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{user.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {user.status === 'Pending' ? (
                                             <button onClick={() => approveUser(user.email)} className="text-sss-sage hover:text-opacity-80">
                                                Approve
                                             </button>
                                        ) : (
                                            <Link to={`/profile/${encodeURIComponent(user.email)}`} className="text-sss-grey hover:text-opacity-80">Manage</Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;
