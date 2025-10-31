import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import MissionBoard from '../components/MissionBoard';
import ClientDashboard from '../components/ClientDashboard';
import SupervisorDashboard from '../components/SupervisorDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import OperationsDashboard from '../components/OperationsDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case UserRole.Owner:
        return <OwnerDashboard />;
      case UserRole.OperationsDirector:
      case UserRole.OperationsManager:
        return <OperationsDashboard />;
      case UserRole.Client:
        return <ClientDashboard />;
      case UserRole.Supervisor:
        return <SupervisorDashboard />;
      case UserRole.Guard:
        return <MissionBoard />;
      default:
        return <p>No dashboard available for your role.</p>;
    }
  };
  
  const getRoleDisplayName = () => {
    if (!user) return '';
    if (user.role === UserRole.Owner || user.role === UserRole.OperationsDirector || user.role === UserRole.OperationsManager) {
      return user.title;
    }
    return user.role;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sss-ebony">Welcome, {user?.name}!</h1>
            <p className="text-lg text-sss-grey">You are logged in as a <span className="font-semibold text-sss-sage">{getRoleDisplayName()}</span>.</p>
          </div>
          {renderDashboardByRole()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;