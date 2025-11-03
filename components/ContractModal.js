
import { getClients } from '../database.js';

export const ContractModal = ({ user }) => {
    const client = getClients().find(c => c.userId === user.id);
    if (!client) return '';
    const inputStyles = "mt-1 block w-full border border-[var(--border-secondary)] rounded-md shadow-sm p-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-tertiary)]";
    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--bg-secondary)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--border-primary)] max-h-[90vh] overflow-y-auto" data-modal-content>
            <div class="p-6">
                <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Create New Contract</h2>
                <form id="contract-form" class="space-y-4">
                    <input type="hidden" name="clientId" value="${client.id}" />
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Contract Title</label>
                        <input name="title" placeholder="e.g., Downtown Office Security" required class="${inputStyles}" />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--text-secondary)]">Start Date</label>
                            <input name="startDate" type="date" required class="${inputStyles}" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--text-secondary)]">End Date</label>
                            <input name="endDate" type="date" required class="${inputStyles}" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-[var(--text-secondary)]">Total Budget ($)</label>
                        <input name="totalBudget" type="number" min="0" step="100" placeholder="50000" required class="${inputStyles}" />
                    </div>
                    <div class="pt-4 border-t border-[var(--border-tertiary)]">
                        <label class="flex items-center">
                            <input type="checkbox" name="addSite" id="add-site-checkbox" class="h-4 w-4 text-[var(--accent-primary)] border-[var(--border-secondary)] rounded focus:ring-[var(--accent-primary)]" />
                            <span class="ml-2 text-sm font-medium text-[var(--text-secondary)]">Add a new site with this contract</span>
                        </label>
                        <div id="new-site-fields" class="hidden mt-4 space-y-4">
                             <div>
                                <label class="block text-sm font-medium text-[var(--text-secondary)]">New Site Name</label>
                                <input name="siteName" placeholder="e.g., West Campus Building" class="${inputStyles}" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-[var(--text-secondary)]">New Site Address</label>
                                <input name="siteAddress" placeholder="456 University Ave, Anytown, USA" class="${inputStyles}" />
                            </div>
                        </div>
                    </div>
                     <div class="flex justify-end space-x-3 pt-4">
                         <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--border-tertiary)] text-[var(--text-primary)] font-semibold rounded-md hover:bg-[var(--border-secondary)] transition">Cancel</button>
                         <button type="submit" class="px-4 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-md hover:bg-[var(--accent-secondary-hover)] transition">Submit for Approval</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};
