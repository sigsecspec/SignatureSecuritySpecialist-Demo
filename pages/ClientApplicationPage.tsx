import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, User } from '../types';

const ClientApplicationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError('');
    
    const newUser: Omit<User, 'password' | 'status' | 'trainings' | 'assignedMissions' | 'pendingTrainings' | 'uniformStatus'> = {
        name: companyName,
        email,
        role: UserRole.Client,
        title: 'Client Applicant',
    };
    
    register(newUser);
    
    alert(`Thank you, ${companyName}. Your application has been submitted and is pending review. An operations manager will contact you shortly.`);
    navigate('/login');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sss-ebony">
            Client Registration
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Business Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sss-sage hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sss-sage transition-colors"
            >
              Submit Application
            </button>
          </div>
           <p className="text-center text-sm text-sss-grey">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sss-sage hover:text-opacity-80">
              Log in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClientApplicationPage;