import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

const UniformsPage: React.FC = () => {
    const { users, updateUniformStatus } = useAuth();

    const usersNeedingUniforms = users.filter(u => u.uniformStatus === 'Needed' || u.uniformStatus === 'Shipped');

    const handleMarkAsShipped = (email: string) => {
        updateUniformStatus(email, 'Shipped');
        alert('Uniform marked as shipped. User will be prompted to confirm receipt.');
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

             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Employee</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usersNeedingUniforms.map(user => (
                            <tr key={user.email}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-sss-ebony">{user.name}</div>
                                    <div className="text-sm text-sss-grey">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{user.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.uniformStatus)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {user.uniformStatus === 'Needed' && (
                                        <button 
                                            onClick={() => handleMarkAsShipped(user.email)}
                                            className="bg-sss-sage text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs"
                                        >
                                            Mark as Shipped
                                        </button>
                                    )}
                                </td>
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