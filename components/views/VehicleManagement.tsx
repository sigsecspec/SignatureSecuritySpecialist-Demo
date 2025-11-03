import { getCollection } from '../../database.js';
import { executiveRoles, operationsRoles } from '../../constants.js';
import { Icons } from '../Icons.js';

export const VehicleManagement = ({ user }) => {
    const vehicles = getCollection('vehicles');
    const canManage = [...executiveRoles, ...operationsRoles].includes(user.role);

    return `
        <div class="animate-in" style="opacity: 0;">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 class="text-4xl font-bold tracking-tighter text-[var(--color-text-base)]">Vehicle Management</h1>
                ${canManage ? `
                    <button class="px-4 py-2 flex items-center gap-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)] transition-colors">
                        ${Icons.PlusCircle({ className: "w-5 h-5" })}
                        Add Vehicle
                    </button>
                ` : ''}
            </div>
            
            <div class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] overflow-hidden">
                <table class="min-w-full leading-normal hidden md:table">
                    <thead>
                        <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                            <th class="px-5 py-3 font-semibold">Vehicle</th>
                            <th class="px-5 py-3 font-semibold">License Plate</th>
                            <th class="px-5 py-3 font-semibold">Status</th>
                            <th class="px-5 py-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${vehicles.map(v => `
                            <tr class="border-b border-[var(--color-border)] ${v.status === 'Decommissioned' ? 'opacity-50' : ''}">
                                <td class="px-5 py-4 text-sm">
                                    <p class="font-semibold text-[var(--color-text-base)] whitespace-no-wrap">${v.year} ${v.make} ${v.model}</p>
                                </td>
                                <td class="px-5 py-4 text-sm text-[var(--color-text-muted)]">${v.licensePlate}</td>
                                <td class="px-5 py-4 text-sm">
                                    <span class="status-pill ${v.status === 'Active' ? 'status-green' : 'status-gray'}">${v.status}</span>
                                </td>
                                <td class="px-5 py-4 text-sm text-right whitespace-nowrap space-x-4">
                                    <button data-action="open-vehicle-details" data-id="${v.id}" class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Details</button>
                                    ${canManage ? `
                                        <button class="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">Edit</button>
                                        <button class="font-semibold text-[var(--color-text-muted)] hover:text-blue-500 transition-colors">Assign</button>
                                    ` : ''}
                                </td>
                            </tr>
                        `).join('')}
                         ${vehicles.length === 0 ? `<tr><td colspan="4" class="text-center p-8 text-[var(--color-text-muted)]">No vehicles found.</td></tr>` : ''}
                    </tbody>
                </table>
                 <div class="md:hidden space-y-3 p-4">
                    ${vehicles.map(v => `
                        <div class="bg-[var(--color-bg-surface-raised)] p-4 rounded-lg border border-[var(--color-border)] ${v.status === 'Decommissioned' ? 'opacity-50' : ''}">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-bold text-[var(--color-text-base)]">${v.year} ${v.make} ${v.model}</p>
                                    <p class="text-sm text-[var(--color-text-muted)]">${v.licensePlate}</p>
                                </div>
                                <span class="status-pill ${v.status === 'Active' ? 'status-green' : 'status-gray'}">${v.status}</span>
                            </div>
                            <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex justify-end gap-2">
                                <button data-action="open-vehicle-details" data-id="${v.id}" class="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--color-border)] text-[var(--color-text-base)]">Details</button>
                                ${canManage ? `<button class="px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-400">Assign</button>` : ''}
                            </div>
                        </div>
                    `).join('')}
                    ${vehicles.length === 0 ? `<p class="text-center p-8 text-[var(--color-text-muted)]">No vehicles found.</p>` : ''}
                </div>
            </div>
        </div>
    `;
};