import { getSites } from '../database.js';
import { UserRole, Ranks } from '../types.js';
import { fieldRoles } from '../constants.js';

export const CreateGuardModal = () => {
    const sites = getSites();
    const guardRoles = fieldRoles.filter(r => r !== UserRole.SiteLead);
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] max-h-[90vh] flex flex-col" data-modal-content>
            <div class="p-6 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold mb-1 text-[var(--color-text-base)]">Create New Guard</h2>
                <p class="text-sm text-[var(--color-text-muted)]">Enter the details for the new guard.</p>
            </div>
            <form id="create-guard-form" class="p-6 space-y-4 overflow-y-auto">
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
                 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Email Address</label>
                        <input name="email" type="email" required class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Phone</label>
                        <input name="phone" type="tel" class="${inputStyles}" />
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Guard ID Number</label>
                        <input name="guardIdNumber" type="text" class="${inputStyles}" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--color-text-muted)]">Role</label>
                        <select name="role" required class="${inputStyles}">
                            ${guardRoles.map(r => `<option value="${r}">${r}</option>`).join('')}
                        </select>
                    </div>
                </div>
                 <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Primary Assigned Site (Optional)</label>
                    <select name="primarySiteId" class="${inputStyles}">
                        <option value="">None</option>
                        ${sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Upload Documents (e.g., Certifications)</label>
                    <input name="documents" type="file" multiple class="mt-1 block w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-accent)]/10 file:text-[var(--color-accent)] hover:file:bg-[var(--color-accent)]/20"/>
                </div>
                <div class="flex justify-end space-x-3 pt-4 border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Submit</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
