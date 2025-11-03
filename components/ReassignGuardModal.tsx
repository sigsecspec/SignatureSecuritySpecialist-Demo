import { Icons } from './Icons.js';
import { getMissionById, getUsers, getUserById } from '../database.js';
import { fieldRoles } from '../constants.js';

export const ReassignGuardModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';
    
    const assignedGuards = mission.claimedBy.map((id) => getUserById(id)).filter(Boolean);
    const teamId = assignedGuards.length > 0 ? assignedGuards[0].teamId : null;

    const availableGuards = getUsers(fieldRoles).filter((u) => 
        !mission.claimedBy.includes(u.id) && u.teamId === teamId
    );

    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="reassign-guard-form" data-mission-id="${missionId}">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Reassign Guard</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">Swap a guard on mission: <strong>${mission.title}</strong>.</p>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Guard to Replace</label>
                            <select name="guardToReplace" required class="${inputStyles}">
                                <option value="">Select current guard</option>
                                ${assignedGuards.map(g => `<option value="${g.id}">${g.firstName} ${g.lastName}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">New Guard</label>
                            <select name="newGuardId" required class="${inputStyles}">
                                <option value="">Select replacement guard</option>
                                ${availableGuards.map(g => `<option value="${g.id}">${g.firstName} ${g.lastName}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition">Reassign</button>
                </div>
            </form>
        </div>
    </div>
    `;
}