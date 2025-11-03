import { Icons } from './Icons.js';
import { getCollection } from '../database.js';
import { UserRole } from '../types.js';

export const AddUserModal = ({ role }) => {
    const teams = getCollection('teams');
    const isClient = role === UserRole.Client;
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)] max-h-[90vh] flex flex-col" data-modal-content>
            <div class="p-6 border-b border-[var(--color-border)] flex-shrink-0">
                 <h2 class="text-2xl font-bold mb-1 text-[var(--color-text-base)]">Create New ${role} Account</h2>
                 <p class="text-sm text-[var(--color-text-muted)]">Manually provision a new user in the system.</p>
            </div>
            <form id="add-user-form" class="p-6 space-y-4 overflow-y-auto">
                <input type="hidden" name="role" value="${role}" />
                ${isClient ? `
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Company Name</label>
                    <input name="companyName" required class="${inputStyles}" />
                </div>
                ` : ''}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">First Name</label>
                        <input name="firstName" required class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Last Name</label>
                        <input name="lastName" required class="${inputStyles}" />
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Email Address</label>
                    <input name="email" type="email" required class="${inputStyles}" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Assign to Team</label>
                    <select name="teamId" class="${inputStyles}">
                        <option value="">No Team</option>
                        ${teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                    </select>
                </div>

                 <div class="flex justify-end space-x-3 pt-4 border-t border-[var(--color-border)]">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Create Account</button>
                </div>
            </form>
        </div>
    </div>
    `;
};