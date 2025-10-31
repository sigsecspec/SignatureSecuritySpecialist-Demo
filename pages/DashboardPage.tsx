import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import ClientDashboard from '../components/ClientDashboard';
import SupervisorDashboard from '../components/SupervisorDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import OperationsDashboard from '../components/OperationsDashboard';
import { useMissions } from '../context/MissionContext';
import type { Badge } from '../types';
import { badges } from '../data/badges';
import MissionBoard from '../components/MissionBoard';
import MyMissions from '../components/MyMissions';

const StatCard: React.FC<{ title: string; value: string; icon?: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        {icon && <div className="mr-4 text-sss-sage">{icon}</div>}
        <div>
            <p className="text-sm font-medium text-sss-grey">{title}</p>
            <p className="text-2xl font-bold text-sss-ebony">{value}</p>
        </div>
    </div>
);


const ActionPrompt: React.FC<{ title: string, buttonText: string, onAction: () => void }> = ({ title, buttonText, onAction }) => (
    <div className="bg-sss-sage bg-opacity-10 p-4 rounded-lg flex items-center justify-between">
        <p className="font-semibold text-sss-ebony">{title}</p>
        <button onClick={onAction} className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all text-sm">
            {buttonText}
        </button>
    </div>
)

const GuardDashboard: React.FC = () => {
    const { user, updateUniformStatus } = useAuth();
    const { missions, updateMissionPaymentStatus } = useMissions();
    const [activeTab, setActiveTab] = useState('summary');

    if (!user) return null;

    const missionsToConfirm = missions.filter(m => m.assignedGuards.includes(user.email) && m.paymentStatus === 'Paid');
    
    const SummaryTabContent = () => (
         <div className="space-y-8">
            <div className="space-y-4">
                {user.uniformStatus === 'Shipped' && (
                    <ActionPrompt 
                        title="Your uniform has been shipped!" 
                        buttonText="Confirm Receipt"
                        onAction={() => {
                            updateUniformStatus(user.email, 'Received');
                            alert("Thank you for confirming!");
                        }}
                    />
                )}
                {missionsToConfirm.map(mission => (
                    <ActionPrompt 
                        key={mission.id}
                        title={`Payment for mission "${mission.title}" has been sent.`}
                        buttonText="Confirm Receipt"
                        onAction={() => {
                            updateMissionPaymentStatus(mission.id, 'Received');
                            alert("Payment confirmed. Thank you!");
                        }}
                    />
                ))}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-sss-ebony mb-4">Your Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Assigned Missions" value={user.assignedMissions.length.toString()} />
                    <StatCard title="Completed Trainings" value={user.trainings.length.toString()} />
                    <StatCard title="Total Earnings (Mock)" value="$1,234.56" />
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch(activeTab) {
            case 'summary':
                return <SummaryTabContent />;
            case 'availableMissions':
                return <MissionBoard />;
            case 'myMissions':
                return <MyMissions />;
            case 'performance':
                return <PerformanceTab />;
            default:
                return null;
        }
    }

    return (
        <div>
             <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                     <button
                        onClick={() => setActiveTab('summary')}
                        className={`${
                            activeTab === 'summary'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Summary & Actions
                    </button>
                     <button
                        onClick={() => setActiveTab('availableMissions')}
                        className={`${
                            activeTab === 'availableMissions'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Available Missions
                    </button>
                     <button
                        onClick={() => setActiveTab('myMissions')}
                        className={`${
                            activeTab === 'myMissions'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        My Missions
                    </button>
                    <button
                        onClick={() => setActiveTab('performance')}
                        className={`${
                            activeTab === 'performance'
                                ? 'border-sss-sage text-sss-ebony'
                                : 'border-transparent text-sss-grey hover:text-sss-ebony hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Performance & Recognition
                    </button>
                </nav>
            </div>
            {renderContent()}
        </div>
    )
}

const PerformanceTab: React.FC = () => (
    <div>
        <h2 className="text-2xl font-bold text-sss-ebony mb-4">Your Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges.map(badge => (
                <div key={badge.id} className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-sss-sage">
                    <div className="text-sss-sage text-4xl mb-3 flex justify-center">{badge.icon}</div>
                    <h3 className="font-bold text-sss-ebony">{badge.title}</h3>
                    <p className="text-sm text-sss-grey mt-1">{badge.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case UserRole.Owner:
      case UserRole.CoOwner:
        return <OwnerDashboard />;
      case UserRole.OperationsDirector:
      case UserRole.OperationsManager:
      case UserRole.Dispatch:
      case UserRole.Secretary:
        return <OperationsDashboard />;
      case UserRole.Client:
        return <ClientDashboard />;
      case UserRole.Supervisor:
        return <SupervisorDashboard />;
      case UserRole.Guard:
        return <GuardDashboard />;
      default:
        return <p>No dashboard available for your role.</p>;
    }
  };
  
  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-sss-ebony">Dashboard</h1>
            <p className="text-lg text-sss-grey">Welcome back, {user?.name}!</p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            {renderDashboardByRole()}
        </div>
    </div>
  );
};

export default DashboardPage;