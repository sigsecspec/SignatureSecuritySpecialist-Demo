import { getPromotions, getUserById } from '../../database.js';
import { UserRole } from '../../types.js';
import { fieldRoles, operationsRoles, executiveRoles } from '../../constants.js';

export const Promotions = ({ user }) => {
    const allPromotions = getPromotions();
    const userPromotions = allPromotions.filter(p => p.userId === user.id);
    
    // --- VIEWS FOR APPLICANTS ---
    const ApplicationForm = () => {
        // Simple logic to determine available roles to apply for
        const availableRoles = [UserRole.SiteLead, UserRole.TrainingOfficer, UserRole.Supervisor, UserRole.OperationsManager];
        const currentRoleIndex = availableRoles.indexOf(user.role);
        const promotableRoles = currentRoleIndex > -1 ? availableRoles.slice(currentRoleIndex + 1) : availableRoles;
        
        return `
            <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
                 <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Apply for a Promotion</h2>
                 <form id="promotion-form" class="space-y-4">
                     <div>
                         <label class="block text-sm font-medium text-[var(--color-text-muted)]">Desired Role</label>
                         <select name="role" required class="mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]">
                            ${promotableRoles.map(r => `<option value="${r}">${r}</option>`).join('')}
                         </select>
                     </div>
                     <div>
                         <label class="block text-sm font-medium text-[var(--color-text-muted)]">Reason for Application</label>
                         <textarea name="reason" rows="4" required class="mt-1 block w-full border border-[var(--color-border)] rounded-md shadow-sm p-2 bg-[var(--color-bg-surface-raised)]" placeholder="Explain why you are ready for this role..."></textarea>
                     </div>
                     <div class="text-right">
                         <button type="submit" class="px-6 py-2 bg-[var(--color-secondary)] text-[var(--color-secondary-text)] font-semibold rounded-md hover:bg-[var(--color-secondary-hover)]">Submit</button>
                     </div>
                 </form>
            </div>
        `;
    };

    const ApplicationStatus = () => {
        const myApp = userPromotions[0]; // Assuming one application at a time
        const statusPill = (status) => {
            let className = '';
            switch(status) {
                case 'Approved': className='status-green'; break;
                case 'Denied': className='status-red'; break;
                case 'Pending Owner Approval': className='status-blue'; break;
                default: className='status-yellow';
            }
            return `<span class="status-pill ${className}">${status}</span>`;
        };
        return `
            <div class="bg-[var(--color-bg-surface)] p-6 border border-[var(--color-border)] rounded-lg shadow-sm">
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Your Promotion Application</h2>
                <div class="flex justify-between items-center">
                    <p class="text-[var(--color-text-muted)]">Application for <span class="font-bold text-[var(--color-text-base)]">${myApp.toRole}</span></p>
                    ${statusPill(myApp.status)}
                </div>
                <p class="text-sm text-[var(--color-text-muted)] mt-4 bg-[var(--color-bg-surface-raised)] p-3 rounded-md border border-[var(--color-border)]"><strong>Reason:</strong> ${myApp.reason}</p>
            </div>
        `;
    };
    
    // --- VIEWS FOR MANAGERS ---
    const ApprovalQueue = (title, promotions) => {
        if (promotions.length === 0) return '';
        return `
            <div class="mt-8">
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">${title}</h2>
                <div class="space-y-4">
                ${promotions.map(promo => {
                    const applicant = getUserById(promo.userId);
                    return `
                    <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <p class="font-bold text-[var(--color-text-base)]">${applicant?.firstName} ${applicant?.lastName}</p>
                                <p class="text-sm text-[var(--color-text-muted)]">${promo.fromRole} &rarr; ${promo.toRole}</p>
                            </div>
                            <div class="space-x-2 flex-shrink-0 self-end md:self-center">
                                <button data-action="approve-promotion" data-id="${promo.id}" class="px-3 py-1 bg-[var(--color-accent)] text-[var(--color-accent-text)] rounded-md text-sm font-semibold hover:bg-[var(--color-accent-hover)]">Approve</button>
                                <button data-action="deny-promotion" data-id="${promo.id}" class="px-3 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Deny</button>
                            </div>
                        </div>
                    </div>
                    `}).join('')}
                </div>
            </div>
        `;
    };

    const PromotionHistory = () => {
         const history = allPromotions.filter(p => p.status === 'Approved' || p.status === 'Denied');
         if (history.length === 0) return '';
         return `
             <div class="mt-8">
                <h2 class="text-xl font-bold text-[var(--color-text-base)] mb-4">Promotion History</h2>
                 <div class="bg-[var(--color-bg-surface)] p-4 border border-[var(--color-border)] rounded-lg shadow-sm">
                     <ul class="divide-y divide-[var(--color-border)]">
                        ${history.map(p => {
                             const applicant = getUserById(p.userId);
                             return `<li class="py-2 flex justify-between items-center"><p>${applicant?.firstName} ${applicant?.lastName} (${p.toRole})</p><span class="${p.status === 'Approved' ? 'text-green-400' : 'text-red-400'} font-semibold">${p.status}</span></li>`
                        }).join('')}
                    </ul>
                </div>
            </div>
         `;
    };

    let content = '';
    const isManager = [...operationsRoles, ...executiveRoles].includes(user.role);
    const isOwner = executiveRoles.includes(user.role);
    const isFieldWorker = fieldRoles.includes(user.role);

    if (isFieldWorker) {
        content += userPromotions.length > 0 ? ApplicationStatus() : ApplicationForm();
    }
    
    if (isManager) {
        const opsApprovals = allPromotions.filter(p => p.status === 'Pending Ops Approval');
        content += ApprovalQueue('Awaiting Operations Approval', opsApprovals);
    }
    if (isOwner) {
         const ownerApprovals = allPromotions.filter(p => p.status === 'Pending Owner Approval');
        content += ApprovalQueue('Awaiting Executive Approval', ownerApprovals);
    }

    if(isManager) {
        content += PromotionHistory();
    }


    return `
        <div class="animate-in max-w-4xl mx-auto" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Promotions & Evaluations</h1>
            ${content}
        </div>
    `;
};