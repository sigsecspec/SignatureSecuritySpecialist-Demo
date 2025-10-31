import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, UserRole } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, login } = useAuth();

  const handleLogin = (user: User) => {
    if (login(user)) {
      navigate('/dashboard');
    }
  };

  const groupUsers = () => {
    const groups: { [key: string]: User[] } = {
        'Pending Applicants': [],
        'Owner': [],
        'Management': [],
        'Operations': [],
        'Field Team': [],
        'Clients': [],
    };
    
    users.forEach(user => {
        if (user.status === 'Pending') {
            groups['Pending Applicants'].push(user);
            return;
        }

        switch(user.role) {
            case UserRole.Owner:
            case UserRole.CoOwner:
                groups['Owner'].push(user);
                break;
            case UserRole.Secretary:
            case UserRole.Dispatch:
                groups['Management'].push(user);
                break;
            case UserRole.OperationsDirector:
            case UserRole.OperationsManager:
                groups['Operations'].push(user);
                break;
            case UserRole.Supervisor:
            case UserRole.TrainingOfficer:
            case UserRole.LeadGuard:
            case UserRole.Guard:
                groups['Field Team'].push(user);
                break;
            case UserRole.Client:
                groups['Clients'].push(user);
                break;
            default:
                break;
        }
    });
    return groups;
  }
  
  const userGroups = groupUsers();
  const groupOrder = ['Owner', 'Management', 'Operations', 'Field Team', 'Clients', 'Pending Applicants'];

  return (
    <div className="min-h-[60vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-sss-ebony mb-10">
          Select an Account to Log In
        </h2>
        <div className="space-y-10">
          {groupOrder.map(groupName => {
            const usersInGroup = userGroups[groupName];
            return (
              usersInGroup && usersInGroup.length > 0 && (
                <div key={groupName}>
                  <h3 className="text-xl font-bold text-sss-ebony border-b-2 border-sss-sage pb-2 mb-6">{groupName}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {usersInGroup.map(user => (
                      <button
                        key={user.email}
                        onClick={() => handleLogin(user)}
                        className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sss-sage disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
                        disabled={user.status === 'Pending'}
                      >
                        <p className="font-bold text-sss-ebony text-lg">{user.name}</p>
                        <p className="text-sm text-sss-sage font-semibold">{user.title}</p>
                        <p className="text-xs text-sss-grey truncate mt-1">{user.email}</p>
                        {user.status === 'Pending' && <span className="text-xs text-blue-600 font-bold">Pending Approval</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;