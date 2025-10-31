import React, { useState } from 'react';
import type { Mission } from '../types';

const mockClientMissions: Mission[] = [
  {
    id: 1,
    title: 'Corporate Office Security',
    client: 'Innovate Corp',
    location: '123 Tech Avenue, Silicon Valley',
    date: '2024-08-15',
    time: '08:00 - 16:00',
    payRate: 28,
    requiredLevel: 3,
  },
  {
    id: 2,
    title: 'Downtown Music Festival',
    client: 'City Events Co.',
    location: 'Central Park, Downtown',
    date: '2024-08-18',
    time: '18:00 - 02:00',
    payRate: 35,
    requiredLevel: 4,
  },
];

const PostMissionForm: React.FC<{ onAddMission: (mission: Omit<Mission, 'id' | 'client'>) => void; onClose: () => void; }> = ({ onAddMission, onClose }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [payRate, setPayRate] = useState(25);
    const [requiredLevel, setRequiredLevel] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddMission({ title, location, date, time, payRate, requiredLevel });
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
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-sss-grey text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">Cancel</button>
                        <button type="submit" className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all">Post Mission</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ClientDashboard: React.FC = () => {
    const [missions, setMissions] = useState(mockClientMissions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddMission = (newMissionData: Omit<Mission, 'id' | 'client'>) => {
        const newMission: Mission = {
            id: missions.length + 1,
            client: "Demo Client", // In a real app, this would come from the logged-in user
            ...newMissionData,
        };
        setMissions(prev => [...prev, newMission]);
        setIsModalOpen(false);
        alert('Mission posted successfully!');
    };

    return (
        <div className="border-t pt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sss-ebony">Your Posted Missions</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-sss-sage text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-transform transform hover:scale-105 duration-300 shadow-md">
                    Post New Mission
                </button>
            </div>
             <div className="space-y-4">
                {missions.length > 0 ? (
                    missions.map(mission => (
                        <div key={mission.id} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-sss-ebony">{mission.title}</h3>
                                <p className="text-sm text-sss-grey">{mission.location} | {new Date(mission.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-sss-sage">${mission.payRate}/hr</p>
                                <p className="text-xs text-sss-grey">Level {mission.requiredLevel}+</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sss-grey text-center py-8">You have not posted any missions yet.</p>
                )}
            </div>
            {isModalOpen && <PostMissionForm onAddMission={handleAddMission} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ClientDashboard;
