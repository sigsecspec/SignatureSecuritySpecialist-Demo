import React, { useState } from 'react';
import type { Mission } from '../types';

// Mock Data for demonstration purposes
const mockMissions: Mission[] = [
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
  {
    id: 3,
    title: 'Retail Loss Prevention',
    client: 'Luxury Goods Inc.',
    location: '5th Avenue Shopping Center',
    date: '2024-08-16',
    time: '12:00 - 20:00',
    payRate: 30,
    requiredLevel: 2,
  },
  {
    id: 4,
    title: 'Residential Patrol',
    client: 'Oakwood Gated Community',
    location: '100 Oakwood Drive',
    date: '2024-08-17',
    time: '22:00 - 06:00',
    payRate: 25,
    requiredLevel: 1,
  },
    {
    id: 5,
    title: 'High-Value Asset Transport',
    client: 'Secure Logistics',
    location: 'City-wide',
    date: '2024-08-20',
    time: '10:00 - 14:00',
    payRate: 50,
    requiredLevel: 5,
  },
  {
    id: 6,
    title: 'Construction Site Overnight',
    client: 'BuildRight Contractors',
    location: 'Lot 42, Industrial Zone',
    date: '2024-08-19',
    time: '20:00 - 04:00',
    payRate: 29,
    requiredLevel: 2,
  },
];

const MissionCard: React.FC<{ mission: Mission }> = ({ mission }) => {
    const handleClaim = () => {
        alert(`You have claimed the mission: "${mission.title}" with ${mission.client}.`);
    };
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-sss-sage transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-sss-ebony">{mission.title}</h3>
                        <p className="text-sm text-sss-grey">{mission.client}</p>
                    </div>
                    <span className="bg-sss-silver text-sss-ebony text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Level {mission.requiredLevel}+
                    </span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-sss-black">
                    <p><span className="font-semibold">Location:</span> {mission.location}</p>
                    <p><span className="font-semibold">Date:</span> {new Date(mission.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><span className="font-semibold">Time:</span> {mission.time}</p>
                    <p className="text-lg font-bold text-sss-sage pt-2">${mission.payRate}/hr</p>
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button className="text-sm font-medium text-sss-grey hover:text-sss-ebony transition-colors">
                    View Details
                </button>
                <button 
                    onClick={handleClaim}
                    className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
                >
                    Claim Mission
                </button>
            </div>
        </div>
    )
};


const MissionBoard: React.FC = () => {
    const [missions, setMissions] = useState(mockMissions);

    return (
        <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-sss-ebony">Available Missions</h2>
                {/* Placeholder for sorting/filtering controls */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-sss-grey">Sort by:</span>
                    <select className="border-gray-300 rounded-md text-sm">
                        <option>Pay Rate</option>
                        <option>Date</option>
                        <option>Level</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {missions.length > 0 ? (
                    missions.map(mission => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))
                ) : (
                    <p className="text-sss-grey col-span-full text-center py-8">No available missions at this time. Check back soon!</p>
                )}
            </div>
        </div>
    );
};

export default MissionBoard;
