
import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types';

const PromotionReview: React.FC = () => {
    const { users, reviewPromotion } = useAuth();
    const promotionApplicants = users.filter(u => u.promotionStatus === 'Applied');

    if (promotionApplicants.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-sss-ebony mb-4">Promotion Requests</h2>
            <div className="space-y-3">
                {promotionApplicants.map(applicant => (
                    <div key={applicant.email} className="bg-gray-50 rounded-lg p-4 shadow-sm border flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sss-black">{applicant.name}</p>
                            <p className="text-sm text-sss-grey">Current Rank: {applicant.rank}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => reviewPromotion(applicant.email, 'approve')} className="bg-green-500 text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs">Approve</button>
                            <button onClick={() => reviewPromotion(applicant.email, 'deny')} className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-opacity-80 transition-all text-xs">Deny</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromotionReview;
