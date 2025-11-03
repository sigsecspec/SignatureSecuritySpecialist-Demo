import { Icons } from './Icons.js';
import { getUserById, getCollection } from '../database.js';
import { UserRole } from '../types.js';
import { fieldRoles } from '../constants.js';

export const PromoteDemoteModal = ({ userId }) => {
    const user = getUserById(userId);
    if (!user) return '';

    const availableRoles = Object.values(UserRole).filter(r => fieldRoles.includes(r));
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="promote-demote-form" data-user-id="${userId}">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Promote / Demote Guard</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">
                        Change the role for <strong>${user.firstName} ${user.lastName}</strong>. This will require approval.
                    </p>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">New Role</label>
                            <select name="toRole" required class="${inputStyles}">
                                ${availableRoles.map(r => `<option value="${r}" ${user.role === r ? 'selected' : ''}>${r}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Reason for Change</label>
                            <textarea name="reason" rows="4" required class="${inputStyles}" placeholder="Justification for this role change..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition">Submit for Approval</button>
                </div>
            </form>
        </div>
    </div>
    `;
}