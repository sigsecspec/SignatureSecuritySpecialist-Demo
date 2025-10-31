import React, { useState } from 'react';

// Mock Chart Component
const Chart: React.FC<{ data: any, title: string }> = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md h-80 flex flex-col">
        <h3 className="text-lg font-bold text-sss-ebony mb-4">{title}</h3>
        <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-sss-grey">Chart for {title} would be here.</p>
        </div>
    </div>
);


const AnalyticsPage: React.FC = () => {
    const [team, setTeam] = useState('all');
    const [dateRange, setDateRange] = useState('30d');
    
    // Mock data would be filtered based on state in a real app
    const revenueData = {};
    const missionStatusData = {};
    const guardPerformanceData = {};
    const clientSatisfactionData = {};

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-sss-ebony">Analytics Dashboard</h1>
                    <p className="text-lg text-sss-grey">Data-driven insights for your operations.</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                     <select value={team} onChange={e => setTeam(e.target.value)} className="border-gray-300 rounded-md shadow-sm focus:ring-sss-sage focus:border-sss-sage">
                        <option value="all">All Teams</option>
                        <option value="1">Team Alpha</option>
                        <option value="2">Team Bravo</option>
                    </select>
                     <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="border-gray-300 rounded-md shadow-sm focus:ring-sss-sage focus:border-sss-sage">
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Chart data={revenueData} title="Revenue Over Time" />
                <Chart data={missionStatusData} title="Mission Status Breakdown" />
                <Chart data={guardPerformanceData} title="Top Guard Performance" />
                <Chart data={clientSatisfactionData} title="Client Satisfaction Ratings" />
            </div>
        </div>
    );
};

export default AnalyticsPage;