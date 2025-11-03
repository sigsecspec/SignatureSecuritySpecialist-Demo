import { Icons } from './Icons.js';
import { getMissionById } from '../database.js';

export const AppealModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';
    
    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="appeal-form" data-mission-id="${missionId}">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Submit Appeal</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">You are submitting an appeal for the mission: <strong>${mission.title}</strong>. Please describe the issue in detail.</p>
                    <textarea name="reason" rows="6" required class="w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]" placeholder="Describe the reason for your appeal..."></textarea>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">Submit Appeal</button>
                </div>
            </form>
        </div>
    </div>
    `;
}
