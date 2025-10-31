import React, { useState } from 'react';
import type { Mission, Contract, Invoice } from '../types';
import { useMissions } from '../context/MissionContext';
import { useAuth } from '../context/AuthContext';
import { contracts as mockContracts } from '../data/contracts';
import { trainingModules } from '../data/training';
import { useNotification } from '../context/NotificationContext';

const ClientDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('missions');
    
    return (
        <div>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                     <button
                        onClick={() => setActiveTab('missions')}
                        className={`${
                            activeTab === 'missions'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Mission Management
                    </button>
                    <button
                        onClick={() => setActiveTab('contracts')}
                        className={`${
                            activeTab === 'contracts'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Contract Oversight
                    </button>
                    <button
                        onClick={() => setActiveTab('guards')}
                        className={`${
                            activeTab === 'guards'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Guard Management
                    </button>
                     <button
                        onClick={() => setActiveTab('sites')}
                        className={`${
                            activeTab === 'sites'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Site Management
                    </button>
                     <button
                        onClick={() => setActiveTab('billing')}
                        className={`${
                            activeTab === 'billing'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Billing & Invoices
                    </button>
                </nav>
            </div>
            {activeTab === 'missions' && <MissionManagementTab />}
            {activeTab === 'contracts' && <ContractOversightTab />}
            {activeTab === 'guards' && <GuardManagementTab />}
            {activeTab === 'sites' && <SiteManagementTab />}
            {activeTab === 'billing' && <BillingTab />}
        </div>
    );
}


const MissionManagementTab: React.FC = () => {
    const { missions, addMission } = useMissions();
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addNotification } = useNotification();

    if (!user) return null;
    const clientMissions = missions.filter(m => m.client === user.name);

    const handleAddMission = (newMissionData: Omit<Mission, 'id' | 'client' | 'assignedGuards' | 'status' | 'paymentStatus' | 'leadGuardEmail'>) => {
        if (!user) return;
        addMission({
            client: user.name,
            ...newMissionData
        });
        setIsModalOpen(false);
        addNotification({ type: 'success', message: 'Mission posted successfully!' });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sss-ebony">Your Posted Missions</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md">
                    Post New Mission
                </button>
            </div>
             <div className="space-y-4">
                {clientMissions.length > 0 ? (
                    clientMissions.map(mission => (
                        <div key={mission.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-sss-ebony">{mission.title}</h3>
                                <p className="text-sm text-sss-grey">{mission.location} | {new Date(mission.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-sss-sage">${mission.payRate}/hr</p>
                                <p className="text-xs text-sss-grey">{mission.assignedGuards.length}/{mission.capacity} Guards</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-sss-ebony">No Missions Posted</h3>
                        <p className="text-sss-grey mt-1">Click "Post New Mission" to get started.</p>
                    </div>
                )}
            </div>
            {isModalOpen && <PostMissionForm onAddMission={handleAddMission} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

const ContractOversightTab: React.FC = () => {
    const { user } = useAuth();
    const contracts = mockContracts.filter(c => c.clientName === user?.name);

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">Your Service Contracts</h2>
            <div className="space-y-6">
                {contracts.length > 0 ? (
                    contracts.map(contract => (
                        <div key={contract.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sss-sage">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-sss-ebony">Contract #{contract.id}</h3>
                                    <p className="text-sm text-sss-grey">
                                        {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {contract.status}
                                </span>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-sss-grey">Budget Usage</span>
                                    <span className="text-sm font-medium text-sss-ebony">${(contract.usedHours/contract.totalHours * contract.budget).toLocaleString()} / ${contract.budget.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-sss-sage h-2.5 rounded-full" style={{ width: `${(contract.usedHours / contract.totalHours) * 100}%` }}></div>
                                </div>
                                <p className="text-right text-xs text-sss-grey mt-1">{contract.usedHours} of {contract.totalHours} hours used</p>
                            </div>
                        </div>
                    ))
                ) : (
                     <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-sss-ebony">No Contracts Found</h3>
                        <p className="text-sss-grey mt-1">Contact operations to set up a new service contract.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const GuardManagementTab: React.FC = () => {
    const { users } = useAuth();
    const { addNotification } = useNotification();
    // In a real app, this would be a list of guards who have worked for this client
    const clientGuards = users.filter(u => u.role === 'Guard' || u.role === 'Supervisor').slice(0, 4); 

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">Manage Your Guards</h2>
            <p className="text-sss-grey mb-6">Whitelist preferred guards to give them priority, blacklist guards you do not want on your missions, or request a specific guard to act as Lead Guard for your contract.</p>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Guard</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clientGuards.map(guard => (
                            <tr key={guard.email}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="font-semibold text-sss-ebony">{guard.name}</p>
                                    <p className="text-sm text-sss-grey">{guard.rank}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <button onClick={() => addNotification({type: 'info', message: `${guard.name} added to your whitelist.`})} className="text-xs font-semibold bg-green-100 text-green-800 py-1 px-3 rounded-full hover:bg-green-200">Whitelist</button>
                                    <button onClick={() => addNotification({type: 'error', message: `${guard.name} has been blacklisted.`})} className="text-xs font-semibold bg-red-100 text-red-800 py-1 px-3 rounded-full hover:bg-red-200">Blacklist</button>
                                    <button onClick={() => addNotification({type: 'success', message: `Request sent to make ${guard.name} a Lead Guard.`})} className="text-xs font-semibold bg-blue-100 text-blue-800 py-1 px-3 rounded-full hover:bg-blue-200">Request as Lead</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const SiteManagementTab: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold text-sss-ebony mb-6">Manage Your Sites & Posts</h2>
        <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-sss-ebony">Coming Soon</h3>
            <p className="text-sss-grey mt-1">This feature will allow you to manage multiple locations, define security posts, and set site-specific instructions.</p>
        </div>
    </div>
);

const BillingTab: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    const handlePay = (invoiceId: string) => {
        setInvoices(prev => prev.map(inv => inv.id === invoiceId ? {...inv, status: 'Paid'} : inv));
        addNotification({type: 'success', message: `Payment for ${invoiceId} was successful.`});
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-6">Billing & Invoices</h2>
             <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Invoice ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Due Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-sss-grey uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.map(invoice => (
                             <tr key={invoice.id}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-sss-ebony">{invoice.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sss-grey">${invoice.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sss-grey">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {invoice.status !== 'Paid' && (
                                        <button onClick={() => handlePay(invoice.id)} className="text-sm font-semibold text-white bg-sss-sage py-1 px-3 rounded-md hover:bg-opacity-80">Pay Now</button>
                                    )}
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
                 {invoices.length === 0 && (
                    <div className="text-center py-10">
                        <h3 className="text-lg font-semibold text-sss-ebony">No Invoices</h3>
                        <p className="text-sss-grey mt-1">Your invoices will appear here.</p>
                    </div>
                )}
             </div>
        </div>
    )
}

const PostMissionForm: React.FC<{ onAddMission: (mission: Omit<Mission, 'id' | 'client' | 'assignedGuards' | 'status' | 'paymentStatus' | 'leadGuardEmail'>) => void; onClose: () => void; }> = ({ onAddMission, onClose }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [payRate, setPayRate] = useState(25);
    const [requiredLevel, setRequiredLevel] = useState(1);
    const [missionType, setMissionType] = useState(trainingModules[0]?.missionType || '');
    const [capacity, setCapacity] = useState(1);
    const [teamId, setTeamId] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddMission({ title, location, date, time, payRate, requiredLevel, missionType, capacity, teamId });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-sss-ebony mb-6">Post a New Mission</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Mission Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                    <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                        <input type="text" placeholder="Time (e.g., 09:00 - 17:00)" value={time} onChange={e => setTime(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sss-grey">Mission Type</label>
                        <select value={missionType} onChange={e => setMissionType(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage">
                            {trainingModules.map(module => <option key={module.id} value={module.missionType}>{module.title}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-sss-grey">Assign to Team</label>
                        <select value={teamId} onChange={e => setTeamId(Number(e.target.value))} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage">
                            <option value={1}>Team Alpha</option>
                            <option value={2}>Team Bravo</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-sss-grey">Pay Rate ($/hr)</label>
                            <input type="number" value={payRate} onChange={e => setPayRate(Number(e.target.value))} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-sss-grey">Required Guard Level</label>
                            <select value={requiredLevel} onChange={e => setRequiredLevel(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage">
                                {[1,2,3,4,5].map(level => <option key={level} value={level}>Level {level}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sss-grey">Capacity (Number of Guards)</label>
                        <input type="number" min="1" value={capacity} onChange={e => setCapacity(Number(e.target.value))} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sss-sage focus:border-sss-sage"/>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-sss-grey text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">Cancel</button>
                        <button type="submit" className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">Post Mission</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default ClientDashboard;