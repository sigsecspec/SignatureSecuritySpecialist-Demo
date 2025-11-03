
import { getVehicleById, getVehicleAssignments, getUserById, getSiteById } from '../database.js';
import { Icons } from './Icons.js';
import { executiveRoles } from '../constants.js';

export const VehicleDetailsModal = ({ vehicleId, currentUser }) => {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return '';

    const assignments = getVehicleAssignments(vehicleId);
    const isOwner = executiveRoles.includes(currentUser.role);

    return `
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-2xl border border-[var(--color-border)] flex flex-col h-full md:h-auto md:max-h-[90vh]" data-modal-content>
            <div class="p-5 border-b border-[var(--color-border)] flex-shrink-0">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
                <p class="text-[var(--color-text-muted)]">${vehicle.licensePlate}</p>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-grow">
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Details</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)]">
                        <p><strong>Make:</strong> ${vehicle.make}</p>
                        <p><strong>Model:</strong> ${vehicle.model}</p>
                        <p><strong>Year:</strong> ${vehicle.year}</p>
                        <p><strong>License Plate:</strong> ${vehicle.licensePlate}</p>
                        <p><strong>Status:</strong> <span class="font-semibold ${vehicle.status === 'Active' ? 'text-green-400' : 'text-gray-400'}">${vehicle.status}</span></p>
                    </div>
                </div>
                <div>
                    <h3 class="font-bold text-lg mb-2 text-[var(--color-accent)]">Assignment History</h3>
                    <ul class="space-y-2">
                        ${assignments.length > 0 ? assignments.map(a => {
                            let assigneeName = 'N/A';
                            if (a.assigneeType === 'User') {
                                const user = getUserById(a.assigneeId);
                                assigneeName = user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
                            } else if (a.assigneeType === 'Site') {
                                const site = getSiteById(a.assigneeId);
                                assigneeName = site ? `Site: ${site.name}` : 'Unknown Site';
                            }
                            return `
                            <li class="flex justify-between items-center text-sm p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border border-[var(--color-border)]">
                               <div>
                                  <p class="font-semibold text-[var(--color-text-base)]">${assigneeName}</p>
                                  <p class="text-xs text-[var(--color-text-muted)]">${new Date(a.startDate).toLocaleDateString()} - ${a.endDate ? new Date(a.endDate).toLocaleDateString() : 'Present'}</p>
                               </div>
                                <span class="status-pill ${a.status === 'Active' ? 'status-green' : 'status-gray'}">${a.status}</span>
                            </li>
                        `}).join('') : `
                        <li class="text-sm text-[var(--color-text-muted)] italic p-3 bg-[var(--color-bg-surface-raised)] rounded-lg border border-dashed border-[var(--color-border)]">
                            No assignment history for this vehicle.
                        </li>
                        `}
                    </ul>
                </div>
            </div>
            <div class="p-4 bg-[var(--color-bg-surface-raised)] border-t border-[var(--color-border)] flex justify-between items-center space-x-3 flex-shrink-0">
                 <div>
                    ${isOwner ? `<button class="px-4 py-2 bg-red-800 text-red-100 font-semibold rounded-md text-sm hover:bg-red-700">Delete Record</button>` : ''}
                </div>
                <button data-action="close-modal" class="px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] border border-[var(--color-border)]">Close</button>
            </div>
        </div>
    </div>
    `;
};
