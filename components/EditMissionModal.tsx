import { getMissionById, getSites, getContracts, getTrainingModules, getUserById, getClients } from '../database.js';
import { Icons } from './Icons.js';

export const EditMissionModal = ({ missionId }) => {
    const mission = getMissionById(missionId);
    if (!mission) return '';

    const client = getClients().find(c => c.id === mission.clientId);
    if (!client) return `<div>Error: Client not found for this mission.</div>`;

    const sites = getSites().filter(s => s.clientId === client.id);
    const contracts = getContracts().filter(c => c.clientId === client.id && c.status === 'Active');
    const trainingModules = getTrainingModules().filter(m => !m.title.includes("Officer") && !m.title.includes("Supervisor") && !m.title.includes("Lead"));
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2.5 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-base)] text-[var(--color-text-base)]";

    const formatDateTimeLocal = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const d_tz = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
        return d_tz.toISOString().slice(0, 16);
    }

    return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in" data-action="close-modal-backdrop" style="animation-name: fadeIn;">
        <div class="bg-[var(--color-bg-surface)] rounded-lg shadow-xl w-full max-w-4xl border border-[var(--color-border)] max-h-[90vh] flex flex-col" data-modal-content>
            <div class="p-6 border-b border-[var(--color-border)] flex-shrink-0 flex justify-between items-center">
                <h2 class="text-2xl font-bold text-[var(--color-text-base)]">Edit Mission: ${mission.title}</h2>
                 <button data-action="close-modal" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                    ${Icons.X({ className: 'w-6 h-6' })}
                </button>
            </div>
            <form id="edit-mission-form" data-mission-id="${mission.id}" class="p-8 space-y-6 overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" value="${mission.title}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Contract</label><select name="contractId" required class="${inputStyles}">${contracts.map(c => `<option value="${c.id}" ${mission.contractId === c.id ? 'selected' : ''}>${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Site</label><select name="siteId" required class="${inputStyles}">${sites.map(s => `<option value="${s.id}" ${mission.siteId === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Training</label><select name="requiredTrainingId" required class="${inputStyles}">${trainingModules.map(t => `<option value="${t.id}" ${mission.requiredTrainingId === t.id ? 'selected' : ''}>${t.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" value="${formatDateTimeLocal(mission.startTime)}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" value="${formatDateTimeLocal(mission.endTime)}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="${mission.payRate}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="${mission.requiredGuards}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="${mission.requiredLevel}" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Assign Site Lead (Optional)</label><select name="leadGuardId" class="${inputStyles}"><option value="">Select a Lead Guard</option>${client.whitelist.map(gId => getUserById(gId)).filter(Boolean).map(g => `<option value="${g.id}" ${mission.leadGuardId === g.id ? 'selected' : ''}>${g.firstName} ${g.lastName}</option>`).join('')}</select></div>
                </div>
                <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Description / Instructions</label><textarea name="description" rows="4" class="${inputStyles}">${mission.description || ''}</textarea></div>
                <div class="flex justify-end items-center gap-4 pt-4 border-t border-[var(--color-border)]">
                    <button type="button" data-action="close-modal" class="px-6 py-2 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] font-semibold rounded-md hover:bg-[var(--color-border)] transition">Cancel</button>
                    <button type="submit" class="inline-flex items-center px-6 py-2 border border-transparent font-medium rounded-md shadow-sm text-[var(--color-accent-text)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] focus:outline-none">
                        ${Icons.Pencil({ className: "w-5 h-5 mr-2" })} Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;
};