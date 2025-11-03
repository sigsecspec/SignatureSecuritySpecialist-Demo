
import { getTrainingModules, getUserTrainingProgress } from '../../database.js';
import { Icons } from '../Icons.js';

export const Training = ({ user }) => {
    const modules = getTrainingModules();
    const progress = getUserTrainingProgress(user.id);
    const getModuleProgress = (moduleId) => progress.find(p => p.moduleId === moduleId);
    
    let availableModules = modules.filter(module => {
        if (module.id === 'tm-lead') return false; 
        if (module.id === 'tm-to' || module.id === 'tm-sup' || module.id === 'tm-ops' || module.id === 'tm-mgmt') return false;
        return true;
    });

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-6">Training Center</h1>
            <div class="space-y-4">
                ${availableModules.map(module => {
                    const prog = getModuleProgress(module.id);
                    let statusColor = 'bg-[var(--border-tertiary)] text-[var(--text-secondary)]';
                    let statusText = 'Not Started';
                    let actionButton = `<button data-action="start-training" data-id="${module.id}" class="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--accent-secondary-text)] font-bold rounded-md hover:bg-[var(--accent-secondary-hover)] transition-transform hover:scale-105">Start Training</button>`;

                    if (prog) {
                        statusText = prog.status;
                        if (prog.status === 'Approved') {
                            statusColor = 'bg-green-100 text-green-800';
                            actionButton = `<span class="font-semibold text-green-600 flex items-center">${Icons.CheckCircle({className: "w-5 h-5 mr-2"})} Completed</span>`;
                        } else if (prog.status === 'Pending Approval') {
                            statusColor = 'bg-yellow-100 text-yellow-800';
                            actionButton = `<span class="font-semibold text-yellow-600">Pending</span>`;
                        } else if (prog.status === 'Failed' || prog.status === 'Denied') {
                            statusColor = 'bg-red-100 text-red-800';
                            actionButton = `<button data-action="request-retake-info" class="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600">Request Retake</button>`;
                        }
                    }
                    
                    return `
                        <div class="bg-[var(--bg-secondary)] p-4 border border-[var(--border-primary)] rounded-lg shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg text-[var(--text-primary)]">${module.title}</h3>
                                <p class="text-sm text-[var(--text-secondary)]">${module.content.substring(0, 100)}...</p>
                            </div>
                            <div class="flex-shrink-0 flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                                <span class="px-3 py-1 text-sm font-semibold rounded-full ${statusColor} text-center">${statusText}</span>
                                <div class="w-full md:w-auto">${actionButton}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};
