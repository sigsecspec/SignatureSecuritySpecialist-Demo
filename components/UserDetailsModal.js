
import { getUserById, getUserTrainingProgress, getTrainingModules, getCollection } from '../database.js';
import { canAlwaysApproveRoles, managementAndOpsRoles, clientRole, executiveRoles, canProposeChanges, canManageAllUsers } from '../constants.js';
import { UserRole } from '../types.js';
import { Icons } from './Icons.js';

export const UserDetailsModal = ({ userId, currentUser }) => {
    const user = getUserById(userId);
    if (!user) return '';
    const teams = getCollection('teams');
    const userTrainings = getUserTrainingProgress(userId);
    const allModules = getTrainingModules();

    const canAlwaysEdit = canAlwaysApproveRoles.includes(currentUser.role);
    const isManagerOfUser = managementAndOpsRoles.includes(currentUser.role) && user.teamId === currentUser.teamId;
    const canEdit = canAlwaysEdit || isManagerOfUser;
    const canPropose = canProposeChanges.includes(currentUser.role) && !canEdit && currentUser.id !== userId;

    const submitButtonText = canPropose ? "Propose Changes" : "Save Changes";
    const canSubmit = canEdit || canPropose;
    
    const isClientContact = user.role === UserRole.Client;
    const isOwner = executiveRoles.includes(currentUser.role);

    const renderInternalUserFields = () => `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Rating:</strong> ${user.performanceRating.toFixed(2)}</p>
            <div class="flex items-center">
                <label for="user-level" class="font-bold mr-2">Level:</label>
                <input id="user-level" name="level" type="number" min="1" max="5" value="${user.level}" ${!canEdit && !canPropose ? 'disabled' : ''} class="w-20 p-1 border rounded-md bg-[var(--color-bg-base)] disabled:bg-[var(--color-bg-surface)] border-[var(--color-border)]" />
            </div>
                <div class="flex items-center">
                <label for="user-team" class="font-bold mr-2">Team:</label>
                <select id="user-team" name="teamId" ${!canEdit && !canPropose ? 'disabled' : ''} class="p-1 border rounded-md bg-[var(--color-bg-base)] disabled:bg-[var(--color-bg-surface)] border-[var(--color-border)]">
                    <option value="">No Team</option>
                    ${teams.map(t => `<option value="${t.id}" ${user.teamId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
                </select>
            </div>
             <p class="sm:col-span-2"><strong>Status:</strong> <span class="font-semibold ${user.status === 'Active' ? 'text-green-400' : (user.status === 'Suspended' ? 'text-yellow-400' : 'text-red-400')}">${user.status}</span></p>
        </div>
    `;
    
    const renderClientContactFields = () => `
        <div class="space-y-4 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
             <p><strong>Email:</strong> ${user.email}</p>
             <div>
                <label for="user-firstname" class="block text-xs font-bold mb-1">First Name:</label>
                <input id="user-firstname" name="firstName" type="text" value="${user.firstName}" ${!canEdit && !canPropose ? 'disabled' : ''} class="w-full p-2 border rounded-md bg-[var(--color-bg-base)] disabled:bg-[var(--color-bg-surface)] border-[var(--color-border)]" />
            </div>
            <div>
                <label for="user-lastname" class="block text-xs font-bold mb-1">Last Name:</label>
                <input id="user-lastname" name="lastName" type="text" value="${user.lastName}" ${!canEdit && !canPropose ? 'disabled' : ''} class="w-full p-2 border rounded-md bg-[var(--color-bg-base)] disabled:bg-[var(--color-bg-surface)] border-[var(--color-border)]" />
            </div>
            ${canAlwaysApproveRoles.includes(currentUser.role) ? `
                <div>
                    <label for="user-team" class="block text-xs font-bold mb-1">Assigned Team:</label>
                    <select id="user-team" name="teamId" class="w-full p-2 border rounded-md bg-[var(--color-bg-base)] border-[var(--color-border)]">
                        <option value="">No Team</option>
                        ${teams.map(t => `<option value="${t.id}" ${user.teamId === t.id ? 'selected' : ''}>${t.name}</option>`).join('')}
                    </select>
                </div>
            ` : `<p><strong>Team:</strong> ${teams.find(t => t.id === user.teamId)?.name || 'N/A'}</p>`}
            <p><strong>Status:</strong> <span class="font-semibold ${user.status === 'Active' ? 'text-green-400' : (user.status === 'Suspended' ? 'text-yellow-400' : 'text-red-400')}">${user.status}</span></p>
        </div>
    `;

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">${user.firstName} ${user.lastName}</h2>
                <p class="text-[var(--color-text-muted)]">${user.role} ${!isClientContact ? `- ${user.rank}` : ''}</p>
            </div>
            <form id="user-details-form" data-user-id="${user.id}">
                <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                    <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Profile Details</h3>
                        ${isClientContact ? renderClientContactFields() : renderInternalUserFields()}
                    </div>
                     ${!isClientContact ? `
                     <div>
                        <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Training & Certifications</h3>
                        <ul class="space-y-1 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] max-h-48 overflow-y-auto">
                        ${allModules.map(mod => {
                            const prog = userTrainings.find(p => p.moduleId === mod.id);
                            const status = prog ? prog.status : 'Not Started';
                            const pillClass = { 
                                'Approved': 'status-green', 
                                'Pending Approval': 'status-yellow', 
                                'Failed': 'status-red', 
                                'Denied': 'status-red'
                            }[status] || 'status-gray';
                            return `<li class="flex justify-between items-center py-1"><span class="text-[var(--color-text-base)]">${mod.title}</span><span class="status-pill ${pillClass}">${status}</span></li>`
                        }).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
                <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-between items-center flex-shrink-0">
                    <div>
                        ${isOwner && user.id !== currentUser.id ? `<button type="button" data-action="delete-user-permanently" data-id="${user.id}" class="px-3 py-1.5 text-xs bg-red-900/50 text-red-400 font-semibold rounded-md hover:bg-red-900/80 transition">Delete Permanently</button>` : ''}
                    </div>
                    <div class="flex items-center space-x-3">
                         ${canManageAllUsers.includes(currentUser.role) && user.status === 'Active' && user.id !== currentUser.id ? `
                            <button type="button" data-action="suspend-user" data-id="${user.id}" class="px-4 py-2 bg-yellow-600/50 text-yellow-300 font-semibold rounded-md hover:bg-yellow-600/80 transition">Suspend</button>
                            <button type="button" data-action="terminate-user" data-id="${user.id}" class="px-4 py-2 bg-red-600/50 text-red-300 font-semibold rounded-md hover:bg-red-600/80 transition">Terminate</button>
                         `: ''}
                        <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
                        ${canSubmit ? `<button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)]">${submitButtonText}</button>` : ''}
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
};
