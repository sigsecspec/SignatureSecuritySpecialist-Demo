import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, UserRole } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { users, login } = useAuth();

  const handleLogin = (user: User) => {
    login(user);
    navigate('/dashboard');
  };

  const groupUsers = () => {
    const groups: { [key: string]: User[] } = {
        'New Accounts': [],
        'Owner': [],
        'Operations': [],
        'Field Team': [],
        'Clients': [],
    };

    const predefinedEmails = new Set(users.filter(u => u.email.includes('@SignatureSecuritySpecialist.com') || u.email.includes('@sigsecspec.com')).map(u => u.email));

    users.forEach(user => {
        if (!predefinedEmails.has(user.email)) {
            groups['New Accounts'].push(user);
            return;
        }

        switch(user.role) {
            case UserRole.Owner:
                groups['Owner'].push(user);
                break;
            case UserRole.OperationsDirector:
            case UserRole.OperationsManager:
                groups['Operations'].push(user);
                break;
            case UserRole.Guard:
            case UserRole.Supervisor:
                groups['Field Team'].push(user);
                break;
            case UserRole.Client:
                groups['Clients'].push(user);
                break;
            default:
                // Fallback for any other predefined roles; safer not to group them wrongly.
                break;
        }
    });
    return groups;
  }
  
  const userGroups = groupUsers();
  // Define an explicit order for rendering groups to ensure "New Accounts" is always at the top for demos.
  const groupOrder = ['New Accounts', 'Owner', 'Operations', 'Field Team', 'Clients'];

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
                        className="text-left p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sss-sage"
                      >
                        <p className="font-bold text-sss-ebony text-lg">{user.name}</p>
                        <p className="text-sm text-sss-sage font-semibold">{user.title}</p>
                        <p className="text-xs text-sss-grey truncate mt-1">{user.email}</p>
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