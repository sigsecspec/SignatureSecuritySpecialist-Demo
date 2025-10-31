
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole, User } from '../types';

const GuardApplicationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [guardType, setGuardType] = useState<'Base' | 'Flex' | 'Seasonal'>('Base');
  const [teamCode, setTeamCode] = useState('');
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
    
    register({
        name: fullName,
        email,
        role: UserRole.Guard,
        title: 'Security Officer Applicant',
        guardType: guardType,
    }, teamCode);
    
    alert(`Thank you, ${fullName}. Your application has been submitted and is pending review. You can track its status by attempting to log in.`);
    navigate('/login');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sss-ebony">
            Guard Application
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
           <input
            type="text"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Operations Team Code (Optional)"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
          />
          <div>
            <label htmlFor="guardType" className="block text-sm font-medium text-gray-700 mb-1">Guard Type</label>
            <select
              id="guardType"
              value={guardType}
              onChange={(e) => setGuardType(e.target.value as 'Base' | 'Flex' | 'Seasonal')}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            >
              <option value="Base">Base Officer</option>
              <option value="Flex">Flex Officer</option>
              <option value="Seasonal">Seasonal Officer</option>
            </select>
          </div>
          <input
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            autoComplete="new-password"
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sss-sage focus:border-sss-sage sm:text-sm"
            placeholder="Password"
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

export default GuardApplicationPage;
