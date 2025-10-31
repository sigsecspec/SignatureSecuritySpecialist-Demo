import React from 'react';
import { vehicles } from '../data/vehicles';

const ShopPage: React.FC = () => {
    return (
         <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-2">Vehicle Management (Shop)</h1>
            <p className="text-lg text-sss-grey mb-8">Oversee the status and assignment of the company's vehicle fleet.</p>

             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Vehicle</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Assigned To</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Location</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sss-ebony">{vehicle.name}</td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        vehicle.status === 'Available' ? 'bg-green-100 text-green-800' :
                                        vehicle.status === 'In Use' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {vehicle.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{vehicle.assignedTo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-sss-grey">{vehicle.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-sss-sage hover:text-opacity-80">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShopPage;
