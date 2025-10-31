
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const OperationsApplicationPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend for owner review.
    addNotification({ type: 'success', message: `Thank you, ${fullName}. Your operations application has been submitted for owner review.` });
    navigate('/');
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sss-ebony">
            Operations Application
          </h2>
           <p className="mt-2 text-center text-sm text-sss-grey">
            For Director & Manager Positions
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
          <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <textarea
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Summarize your relevant experience, qualifications, and why you are a good fit for an operations role at SSS."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sss-ebony hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sss-ebony transition-colors"
            >
              Submit for Review
            </button>
          </div>
           <p className="text-center text-sm text-sss-grey">
            These are part-ownership roles. Applications are sent directly to the owner for consideration.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OperationsApplicationPage;
