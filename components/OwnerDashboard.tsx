import React from 'react';
import type { Stat } from '../types';

const ownerStats: Stat[] = [
    { value: "1,258", label: "Total Users" },
    { value: "75", label: "Active Missions" },
    { value: "32", label: "Pending Approvals" },
    { value: "$12,450", label: "Revenue (Month)" },
];

const mockUsers = [
    { id: 1, name: 'Demo Guard', role: 'Guard', status: 'Active' },
    { id: 2, name: 'Demo Client', role: 'Client', status: 'Active' },
    { id: 3, name: 'New Applicant', role: 'Guard', status: 'Pending' },
    { id: 4, name: 'James Lyons', role: 'Operations Director', status: 'Active' },
];

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
        <p className="text-3xl font-bold text-sss-ebony">{stat.value}</p>
        <p className="text-sm text-sss-grey mt-1">{stat.label}</p>
    </div>
);

const OwnerDashboard: React.FC = () => {
    return (
        <div className="border-t pt-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">System Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ownerStats.map(stat => <StatCard key={stat.label} stat={stat} />)}
                </div>
            </div>

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
                            {mockUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-sss-sage hover:text-opacity-80">
                                            {user.status === 'Pending' ? 'Review' : 'Manage'}
                                        </a>
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