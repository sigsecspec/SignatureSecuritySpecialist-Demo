import { getMissionById, getClientById, getSiteById, getTrainingModules, getUserById, getLeadGuardAssignment, getActionLogForEntity } from '../database.js';
import { fieldRoles } from '../constants.js';
import { Icons } from './Icons.js';

export const MissionDetailsModal = ({ missionId, user }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';
    const client = getClientById(mission.clientId);
    const site = getSiteById(mission.siteId);
    const requiredTraining = getTrainingModules().find(tm => tm.id === mission.requiredTrainingId);
    const guards = mission.claimedBy.map(id => getUserById(id)).filter(Boolean);
    const leadGuard = getLeadGuardAssignment(mission.id);
    const isGuard = fieldRoles.includes(user.role);
    const actionLog = getActionLogForEntity(missionId).slice(0, 10);

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">${mission.title}</h2>
                <p class="text-[var(--color-text-muted)]">${client.companyName} at ${site.name}</p>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Mission Details</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                        <p><strong>Pay Rate:</strong> $${mission.payRate}/hr</p>
                        <p><strong>Level Req:</strong> ${mission.requiredLevel}</p>
                        <p><strong>Start Time:</strong> ${new Date(mission.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> ${new Date(mission.endTime).toLocaleString()}</p>
                        <p class="sm:col-span-2"><strong>Location:</strong> ${site.address}</p>
                        <p class="sm:col-span-2"><strong>Training Req:</strong> ${requiredTraining.title}</p>
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Instructions</h3>
                    <p class="text-sm text-[var(--color-text-muted)] whitespace-pre-wrap bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">${mission.description || 'No specific instructions provided.'}</p>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Assigned Guards (${guards.length}/${mission.requiredGuards})</h3>
                    <ul class="space-y-2">
                        ${guards.map(g => `
                            <li class="flex items-center text-sm p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border border-[var(--color-border)]">
                                ${Icons.User({className: 'w-5 h-5 mr-3 text-[var(--color-text-muted)]'})}
                                <span class="font-semibold text-[var(--color-text-base)]">${g.firstName} ${g.lastName} ${leadGuard?.userId === g.id ? `<span class="ml-2 text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full">LEAD</span>` : ''}</span>
                            </li>
                        `).join('')}
                        ${guards.length === 0 ? '<li class="text-sm text-[var(--color-text-muted)] italic p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border border-dashed border-[var(--color-border)]">No guards have claimed this mission yet.</li>' : ''}
                    </ul>
                </div>

                 <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Mission History</h3>
                    <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] max-h-48 overflow-y-auto">
                        <ul class="space-y-3">
                        ${actionLog.length > 0 ? actionLog.map(log => {
                            const actor = getUserById(log.userId);
                            return `
                            <li class="text-xs">
                                <p class="font-semibold text-[var(--color-text-base)]">${log.actionType.replace(/_/g, ' ')} by ${actor ? `${actor.firstName} ${actor.lastName}` : 'System'}</p>
                                <p class="text-[var(--color-text-muted)]">${new Date(log.timestamp).toLocaleString()}</p>
                            </li>
                            `}).join('') : `
                            <li class="text-xs text-[var(--color-text-muted)] italic">No history found for this mission.</li>
                        `}
                        </ul>
                    </div>
                </div>

            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-end items-center space-x-3 flex-shrink-0">
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
                ${isGuard && !mission.claimedBy.includes(user.id) && mission.claimedBy.length < mission.requiredGuards ? `<button data-action="claim-mission" data-id="${mission.id}" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)]">Claim Mission</button>` : ''}
            </div>
        </div>
    </div>
    `;
};