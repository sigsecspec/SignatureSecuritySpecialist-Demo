import { getClients, getSites, getContracts, getTrainingModules, getUserById } from '../../database.js';
import { Icons } from '../Icons.js';
import { UserRole } from '../../types.js';
import { clientRole, canCreateMissionsDirectly, canCreateMissionsForApproval } from '../../constants.js';

export const PostMission = ({ user }) => {
    const isClient = clientRole.includes(user.role);
    const canCreate = canCreateMissionsDirectly.includes(user.role) || canCreateMissionsForApproval.includes(user.role);

    const clients = getClients();
    const client = isClient ? clients.find(c => c.userId === user.id) : null;

    if (isClient && !client) return `<div class="text-center p-8 bg-[var(--color-bg-surface)] rounded-lg shadow-sm border border-[var(--color-border)]">Your client profile could not be loaded. Please contact support.</div>`;

    const sites = client ? getSites().filter(s => s.clientId === client.id) : getSites();
    const contracts = client ? getContracts().filter(c => c.clientId === client.id && c.status === 'Active') : getContracts().filter(c => c.status === 'Active');
    const trainingModules = getTrainingModules().filter(m => !m.title.includes("Officer") && !m.title.includes("Supervisor") && !m.title.includes("Lead"));
    const inputStyles = "mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-[var(--color-bg-surface-raised)]";
    
    const pageTitle = isClient ? "Post a New Mission" : "Create a New Mission";
    const submitText = canCreateMissionsForApproval.includes(user.role) && !canCreateMissionsDirectly.includes(user.role) ? 'Submit for Approval' : "Create Mission";
    const canShowEmergencyCheckbox = isClient || canCreate;

    return `
        <div class="animate-in max-w-4xl mx-auto" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">${pageTitle}</h1>
            <form id="post-mission-form" class="bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border)] rounded-lg shadow-md space-y-6">
                
                ${!isClient && canCreate ? `
                <div>
                    <label class="block text-sm font-medium text-[var(--color-text-muted)]">Client</label>
                    <select name="clientId" required class="${inputStyles}">
                        <option value="">Select a client</option>
                        ${clients.map(c => `<option value="${c.id}">${c.companyName}</option>`).join('')}
                    </select>
                </div>
                ` : ''}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Mission Title</label><input type="text" name="title" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Contract</label><select name="contractId" required class="${inputStyles}"><option value="">Select a contract</option>${contracts.map(c => `<option value="${c.id}">${c.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Site</label><select name="siteId" required class="${inputStyles}"><option value="">Select a site</option>${sites.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Training</label><select name="requiredTrainingId" required class="${inputStyles}"><option value="">Select Training</option>${trainingModules.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Start Time</label><input type="datetime-local" name="startTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">End Time</label><input type="datetime-local" name="endTime" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Pay Rate ($/hr)</label><input type="number" min="15" name="payRate" value="25" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Guards</label><input type="number" min="1" name="requiredGuards" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Required Guard Level</label><input type="number" min="1" max="5" name="requiredLevel" value="1" required class="${inputStyles}" /></div>
                    <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Assign Site Lead (Optional)</label><select name="leadGuardId" class="${inputStyles}"><option value="">Select a Lead Guard</option>${(client?.whitelist || []).map(gId => getUserById(gId)).filter(Boolean).map(g => `<option value="${g.id}">${g.firstName} ${g.lastName}</option>`).join('')}</select></div>
                </div>
                <div><label class="block text-sm font-medium text-[var(--color-text-muted)]">Description / Instructions</label><textarea name="description" rows="4" class="${inputStyles}"></textarea></div>
                
                <div class="flex justify-between items-center pt-4 border-t border-[var(--color-border)]">
                    ${canShowEmergencyCheckbox ? `
                    <div class="flex items-center">
                        <input id="emergency-mission" name="isEmergency" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]">
                        <label for="emergency-mission" class="ml-2 block text-sm text-[var(--color-text-muted)]">This is an <span class="font-bold text-red-400">Emergency Mission</span></label>
                    </div>
                    ` : '<div></div>'}
                    <button type="submit" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-[var(--color-secondary-text)] bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]">${Icons.PlusCircle({ className: "w-5 h-5 mr-2" })} ${submitText}</button>
                </div>
            </form>
        </div>
    `;
};