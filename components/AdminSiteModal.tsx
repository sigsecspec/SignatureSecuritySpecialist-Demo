
import { getClients } from '../database.js';

export const AdminSiteModal = () => {
    const clients = getClients();
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";
    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg p-6 border border-[var(--color-border)]" data-modal-content>
            <h2 class="text-2xl font-bold mb-4 text-[var(--color-text-base)]">Create New Site (Admin)</h2>
            <form id="admin-site-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Client</label>
                    <select name="clientId" required class="${inputStyles}">
                        <option value="">Select a Client</option>
                        ${clients.map(c => `<option value="${c.id}">${c.companyName}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Site Name</label>
                    <input name="siteName" placeholder="e.g., Warehouse B" required class="${inputStyles}" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Site Address</label>
                    <input name="siteAddress" placeholder="123 Industrial Way, Anytown, USA" required class="${inputStyles}" />
                </div>
                 <div class="flex justify-end space-x-3 pt-4">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition">Create Site</button>
                </div>
            </form>
        </div>
    </div>
    `;
};