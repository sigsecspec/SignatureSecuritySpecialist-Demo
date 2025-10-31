import React from 'react';
import { useAuth } from '../context/AuthContext';
import { trainingModules } from '../data/training';
import type { TrainingModule } from '../types';

const TrainingModuleCard: React.FC<{ module: TrainingModule; isCompleted: boolean; isPending: boolean; onStart: (id: string) => void; }> = ({ module, isCompleted, isPending, onStart }) => {
    
    const getStatusBadge = () => {
        if (isCompleted) {
            return <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Completed</span>;
        }
        if (isPending) {
            return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Pending Approval</span>;
        }
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Required</span>;
    }

    return (
        <div className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${isCompleted ? 'border-green-500' : isPending ? 'border-blue-500' : 'border-sss-sage'}`}>
            <div className="flex justify-between items-start">
                 <h3 className="text-xl font-bold text-sss-ebony mb-2">{module.title}</h3>
                 {getStatusBadge()}
            </div>
            <p className="text-sss-grey mb-4">{module.description}</p>
            {!isCompleted && !isPending && (
                <button 
                    onClick={() => onStart(module.id)}
                    className="bg-sss-sage text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-all duration-300 text-sm"
                >
                    Start Training
                </button>
            )}
        </div>
    );
};

const TrainingCenterPage: React.FC = () => {
    const { user, addTrainingToUser } = useAuth();

    const handleStartTraining = (trainingId: string) => {
        // In a real app, this would navigate to a training module with a quiz.
        // Here, we'll simulate completion and send it for review.
        if (window.confirm("Simulate completing this training module and submit for review?")) {
            addTrainingToUser(trainingId);
            alert("Training submitted for review. A supervisor will approve it shortly.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-sss-ebony mb-2">Training Center</h1>
            <p className="text-lg text-sss-grey mb-8">Complete required training modules to unlock access to more mission types.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingModules.map(module => (
                    <TrainingModuleCard 
                        key={module.id} 
                        module={module}
                        isCompleted={user?.trainings.includes(module.id) ?? false}
                        isPending={user?.pendingTrainings.includes(module.id) ?? false}
                        onStart={handleStartTraining}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrainingCenterPage;