
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import { useNotification } from '../context/NotificationContext';

const UniformsPage: React.FC = () => {
    const { user: loggedInUser, users, updateUniformStatus } = useAuth();
    const { addNotification } = useNotification();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    
    // Management sees all users needing uniforms
    const usersNeedingUniforms = users.filter(u => u.uniformStatus === 'Needed' || u.uniformStatus === 'Shipped');
    
    // A single user sees only their own status
    const myUniformStatus = users.find(u => u.email === loggedInUser?.email)?.uniformStatus;

    const handleMarkAsShipped = () => {
        selectedUsers.forEach(email => {
            updateUniformStatus(email, 'Shipped', 'send');
        });
        addNotification({type: 'info', message: `${selectedUsers.length} uniform(s) marked as shipped.`});
        setSelectedUsers([]);
    };
    
    const handleConfirmReceipt = () => {
        if (loggedInUser) {
            updateUniformStatus(loggedInUser.email, 'Received', 'receive');
            addNotification({type: 'success', message: 'Uniform receipt confirmed. Thank you!'});
        }
    };

    const toggleUserSelection = (email: string) => {
        setSelectedUsers(prev => prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]);
    };

     const getStatusBadge = (status: User['uniformStatus']) => {
        switch (status) {
            case 'Needed':
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Needs Shipment</span>;
            case 'Shipped':
                return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Shipped</span>;
            case 'Received':
                return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Received</span>;
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-2">Uniform Distribution</h1>
            <p className="text-lg text-sss-grey mb-8">Manage and track uniform shipments for new and promoted staff.</p>

            {myUniformStatus === 'Shipped' && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-8" role="alert">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold">Your Uniform is on its way!</p>
                            <p>Please confirm receipt once your package arrives.</p>
                        </div>
                         <button 
                            onClick={handleConfirmReceipt}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-all text-sm shadow-md">
                            Confirm Receipt (Scan QR)
                        </button>
                    </div>
                </div>
            )}

             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-xl font-semibold text-sss-ebony">Distribution Queue</h2>
                    <button 
                        onClick={handleMarkAsShipped}
                        disabled={selectedUsers.length === 0}
                        className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm disabled:bg-sss-grey disabled:cursor-not-allowed">
                        Mark Selected as Shipped
                    </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-sss-sage rounded" onChange={e => setSelectedUsers(e.target.checked ? usersNeedingUniforms.filter(u => u.uniformStatus === 'Needed').map(u => u.email) : [])} />
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Employee</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usersNeedingUniforms.map(user => (
                            <tr key={user.email}>
                                <td className="px-6 py-4">
                                    {user.uniformStatus === 'Needed' && <input type="checkbox" className="form-checkbox h-4 w-4 text-sss-sage rounded" checked={selectedUsers.includes(user.email)} onChange={() => toggleUserSelection(user.email)} />}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-sss-ebony">{user.name}</div>
                                    <div className="text-sm text-sss-grey">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{user.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.uniformStatus)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {usersNeedingUniforms.length === 0 && <p className="text-center text-sss-grey py-8">No uniforms currently need to be distributed.</p>}
            </div>
        </div>
    );
};

export default UniformsPage;
