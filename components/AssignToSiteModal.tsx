import { getSites, getCollection } from '../database.js';

export const AssignToSiteModal = ({ siteId }) => {
    const sites = getSites();
    const vehicles = getCollection('vehicles').filter(v => v.status === 'Active');
    
    // This is a simplified assignment modal focusing on vehicles for now
    // as guard assignments are derived from missions in the current data model.

    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]";

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-lg border border-[var(--color-border)]" data-modal-content>
            <form id="assign-vehicle-form">
                <div class="p-6">
                    <h2 class="text-2xl font-bold mb-2 text-[var(--color-text-base)]">Assign Vehicle to Site</h2>
                    <p class="text-sm text-[var(--color-text-muted)] mb-4">Select a site and an available vehicle to create an assignment.</p>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Site</label>
                            <select name="siteId" required class="${inputStyles}">
                                <option value="">Select a site</option>
                                ${sites.map(s => `<option value="${s.id}" ${s.id === siteId ? 'selected' : ''}>${s.name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Vehicle</label>
                            <select name="vehicleId" required class="${inputStyles}">
                                <option value="">Select an available vehicle</option>
                                 ${vehicles.map(v => `<option value="${v.id}">${v.year} ${v.make} ${v.model} (${v.licensePlate})</option>`).join('')}
                            </select>
                        </div>
                         <div>
                            <label class="block text-sm font-medium text-[var(--color-text-muted)]">Assignment Start Date</label>
                            <input name="startDate" type="date" required class="${inputStyles}" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-accent-text)] font-semibold rounded-md hover:bg-[var(--color-accent-hover)] transition">Create Assignment</button>
                </div>
            </form>
        </div>
    </div>
    `;
};
