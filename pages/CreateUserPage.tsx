
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { canCreateUsers } from '../utils/permissions';

const CreateUserPage: React.FC = () => {
    const { user, createUser } = useAuth();
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(UserRole.Guard);
    const [title, setTitle] = useState('');
    const [teamId, setTeamId] = useState(1);

    if (!canCreateUsers(user)) {
        navigate('/dashboard');
        return null;
    }
    
    const availableRoles = [
        { value: UserRole.Guard, label: 'Guard' },
        { value: UserRole.Supervisor, label: 'Supervisor' },
        { value: UserRole.Dispatch, label: 'Dispatch' },
        { value: UserRole.Secretary, label: 'Secretary' },
        { value: UserRole.TrainingOfficer, label: 'Training Officer' },
        { value: UserRole.OperationsManager, label: 'Operations Manager' },
        { value: UserRole.OperationsDirector, label: 'Operations Director' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createUser({ name, email, role, title, teamId });
        addNotification({ type: 'success', message: `User ${name} created successfully!` });
        navigate('/dashboard');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-8">Create New Staff User</h1>
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-sss-grey">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-sss-grey">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-sss-grey">Role</label>
                        <select value={role} onChange={e => setRole(e.target.value as UserRole)} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md">
                            {availableRoles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-sss-grey">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Lead Dispatcher" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-sss-grey">Assign to Team</label>
                        <select value={teamId} onChange={e => setTeamId(Number(e.target.value))} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value={1}>Team Alpha</option>
                            <option value={2}>Team Bravo</option>
                        </select>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-sss-sage text-white font-bold py-2 px-6 rounded-md">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPage;
