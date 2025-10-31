import React from 'react';

const mockTeam = [
    { id: 1, name: 'John Smith', rank: 'OFC', status: 'On Mission' },
    { id: 2, name: 'Jane Doe', rank: 'PVT', status: 'Available' },
    { id: 3, name: 'Mike Johnson', rank: 'OFC', status: 'On Mission' },
];

const mockSpotChecks = [
    { id: 1, guard: 'John Smith', mission: 'Corporate Office Security', time: '14:30', status: 'Passed' },
    { id: 2, guard: 'Emily White', mission: 'Retail Loss Prevention', time: '11:00', status: 'Passed' },
];

const SupervisorDashboard: React.FC = () => {
    return (
        <div className="border-t pt-8 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Team Overview</h2>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Guard Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Rank</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockTeam.map(guard => (
                                <tr key={guard.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{guard.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{guard.rank}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guard.status === 'On Mission' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {guard.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-sss-sage hover:text-opacity-80">Message</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Recent Spot Checks</h2>
                <div className="space-y-3">
                    {mockSpotChecks.map(check => (
                         <div key={check.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sss-black">Guard: <span className="font-normal">{check.guard}</span></p>
                                <p className="text-sm text-sss-grey">{check.mission}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">{check.status}</p>
                                <p className="text-xs text-sss-grey">at {check.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupervisorDashboard;
