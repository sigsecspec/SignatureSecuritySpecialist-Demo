import { Icons } from './Icons.js';
import { getMissionById, getSiteById, getUserById } from '../database.js';

export const EmergencyConfirmationModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';
    const site = getSiteById(mission.siteId);
    const creator = mission.creatorId ? getUserById(mission.creatorId) : { firstName: 'Operations', lastName: '' };
    
    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-red-500/50" data-modal-content>
            <div class="p-6 text-center">
                <div class="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    ${Icons.Flag({ className: 'w-8 h-8' })}
                </div>
                <h2 class="text-2xl font-bold mb-2 text-white">Emergency Mission Confirmation</h2>
                <p class="text-sm text-[var(--color-text-muted)] mb-4">
                    An emergency mission was created on your behalf by <strong>${creator.firstName} ${creator.lastName}</strong>. Please review and confirm.
                </p>
                
                <div class="text-left bg-[var(--color-bg-surface-raised)] border border-[var(--color-border)] p-4 rounded-lg space-y-1">
                    <p><strong>Mission:</strong> ${mission.title}</p>
                    <p><strong>Site:</strong> ${site?.name || 'N/A'}</p>
                    <p><strong>Start Time:</strong> ${new Date(mission.startTime).toLocaleString()}</p>
                </div>
            </div>
            <div class="flex justify-center space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                <button type="button" data-action="dispute-emergency-mission" data-id="${mission.id}" class="px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">Dispute</button>
                <button type="button" data-action="confirm-emergency-mission" data-id="${mission.id}" class="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition">Confirm</button>
            </div>
        </div>
    </div>
    `;
};
