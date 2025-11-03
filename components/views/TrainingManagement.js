
import { getPendingTrainingApprovals, getUsers, getTrainingModules } from '../../database.js';

export const TrainingManagement = ({ user }) => {
    const approvals = getPendingTrainingApprovals(user.teamId);
    const users = getUsers();
    const modules = getTrainingModules();
    const getUser = (id) => users.find(u => u.id === id) || { firstName: 'Unknown', lastName: 'User' };
    const getModule = (id) => modules.find(m => m.id === id) || { title: 'Unknown Module' };
    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Training Management</h1>
            <div class="space-y-4">
                ${approvals.length > 0 ? approvals.map(appr => `<div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm"><div class="flex flex-col md:flex-row justify-between md:items-center gap-4"><div><p class="font-bold text-[var(--color-text-base)]">${getUser(appr.userId).firstName} ${getUser(appr.userId).lastName}</p><p class="text-sm text-[var(--color-text-muted)]">Completed: <span class="font-semibold">${getModule(appr.moduleId).title}</span> (Score: ${appr.score}%)</p><p class="text-xs text-[var(--color-text-muted)]">Submitted: ${new Date(appr.submittedAt).toLocaleString()}</p></div><div class="space-x-2 flex-shrink-0"><button data-action="approve-training" data-id="${appr.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button><button data-action="request-retake" data-id="${appr.id}" class="px-3 py-1 bg-yellow-600 text-white rounded-md text-sm font-semibold hover:bg-yellow-700">Request Retake</button><button data-action="deny-training" data-id="${appr.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Deny</button></div></div></div>`).join('') : `<p class="text-[var(--color-text-muted)] p-4 bg-[var(--color-bg-surface-raised)] rounded-md border border-[var(--color-border)]">No training submissions require approval on your team.</p>`}
            </div>
        </div>
    `;
};
