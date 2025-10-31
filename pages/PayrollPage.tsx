import React from 'react';
import { useMissions } from '../context/MissionContext';
import { Mission } from '../types';
import { useAuth } from '../context/AuthContext';

const PayrollPage: React.FC = () => {
    const { missions, updateMissionPaymentStatus } = useMissions();
    const { users } = useAuth();

    // In a real app, "Completed" status would be set upon mission checkout.
    // For this demo, we'll consider any mission with guards as potentially completable.
    const completedMissions = missions.filter(m => m.assignedGuards.length > 0);

    const handleMarkAsPaid = (missionId: number) => {
        updateMissionPaymentStatus(missionId, 'Paid');
        alert('Mission marked as paid. Guard will be prompted to confirm receipt.');
    };

    const getStatusBadge = (status: Mission['paymentStatus']) => {
        switch (status) {
            case 'Pending':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pending</span>;
            case 'Paid':
                return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Paid</span>;
            case 'Received':
                return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Received</span>;
        }
    }
    
    const getGuardNames = (emails: string[]) => {
        return emails.map(email => {
            const user = users.find(u => u.email === email);
            return user ? user.name : email;
        }).join(', ');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-2">Payroll Management</h1>
            <p className="text-lg text-sss-grey mb-8">Review completed missions and process payments for guards.</p>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Mission</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Guard(s)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Amount</th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {completedMissions.map(mission => (
                            <tr key={mission.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-sss-ebony">{mission.title}</div>
                                    <div className="text-sm text-sss-grey">{mission.client}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{getGuardNames(mission.assignedGuards)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-ebony font-semibold">${(mission.payRate * 8).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(mission.paymentStatus)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {mission.paymentStatus === 'Pending' && (
                                        <button 
                                            onClick={() => handleMarkAsPaid(mission.id)}
                                            className="bg-sss-sage text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs"
                                        >
                                            Mark as Paid
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {completedMissions.length === 0 && <p className="text-center text-sss-grey py-8">No completed missions to process.</p>}
            </div>
        </div>
    );
};

export default PayrollPage;