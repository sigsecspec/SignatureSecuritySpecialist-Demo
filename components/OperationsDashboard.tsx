import React from 'react';

const mockActiveMissions = [
    { id: 1, title: 'Downtown Music Festival', guards: 5, status: 'Active' },
    { id: 2, title: 'Corporate Office Security', guards: 2, status: 'Active' },
];

const mockPendingApprovals = [
    { id: 1, type: 'New Guard Application', name: 'Emily White' },
    { id: 2, type: 'Client Contract', name: 'Tech Solutions LLC' },
];

const OperationsDashboard: React.FC = () => {
    return (
        <div className="border-t pt-8 space-y-8">
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
                            {mockActiveMissions.map(mission => (
                                <tr key={mission.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{mission.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{mission.guards}</td>
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
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Pending Approvals</h2>
                <div className="space-y-3">
                    {mockPendingApprovals.map(approval => (
                         <div key={approval.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sss-black">{approval.type}</p>
                                <p className="text-sm text-sss-grey">{approval.name}</p>
                            </div>
                            <button className="bg-sss-sage text-white font-bold py-1 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm">
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OperationsDashboard;
