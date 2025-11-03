
import { getClients } from '../database.js';

export const SiteModal = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return '';
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-tertiary)]";
    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-lg p-6 border border-[var(--border-primary)]" data-modal-content>
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Request New Site</h2>
            <form id="site-request-form" class="space-y-4">
                <input type="hidden" name="clientId" value="${client.id}" />
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Site Name</label>
                    <input name="siteName" placeholder="e.g., Warehouse B" required class="${inputStyles}" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--text-secondary)]">Site Address</label>
                    <input name="siteAddress" placeholder="123 Industrial Way, Anytown, USA" required class="${inputStyles}" />
                </div>
                 <div class="flex justify-end space-x-3 pt-4">
                     <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                     <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit for Approval</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
