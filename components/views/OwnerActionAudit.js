import { getActionLog, getUsers } from '../../database.js';
import { UserRole } from '../../types.js';
import { Icons } from '../Icons.js';

const renderAuditLogTable = (logs, allUsers) => {
    const getUserName = (userId) => {
        const user = allUsers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
    };

    const severityClass = (severity) => {
        switch (severity) {
            case 'High': return 'border-red-500';
            case 'Medium': return 'border-yellow-500';
            default: return 'border-green-500';
        }
    };
    
    return `
    <div class="hidden md:block">
        <table class="min-w-full leading-normal">
            <thead>
                <tr class="text-left text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
                    <th class="pl-5 pr-2 py-3 font-semibold">Action</th>
                    <th class="px-2 py-3 font-semibold">User</th>
                    <th class="px-2 py-3 font-semibold">Timestamp</th>
                    <th class="px-2 py-3 font-semibold">Entity</th>
                    <th class="px-5 py-3 font-semibold text-right"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-border)]">
                ${logs.map(log => `
                    <tr class="hover:bg-[var(--color-bg-surface-raised)] border-l-4 ${severityClass(log.severity)}">
                        <td class="pl-4 pr-2 py-3 text-sm">
                            <p class="text-[var(--color-text-base)] whitespace-no-wrap font-semibold">${log.actionType.replace(/_/g, ' ')}</p>
                            <p class="text-xs text-[var(--color-text-muted)]">${log.entityType}</p>
                        </td>
                        <td class="px-2 py-3 text-sm text-[var(--color-text-muted)]">${getUserName(log.userId)}</td>
                        <td class="px-2 py-3 text-sm text-[var(--color-text-muted)]">${new Date(log.timestamp).toLocaleString()}</td>
                        <td class="px-2 py-3 text-sm text-[var(--color-text-muted)]">${log.entityId}</td>
                        <td class="px-5 py-3 text-sm text-right">
                            <button data-action="open-action-log-details" data-id="${log.id}" class="font-semibold text-[var(--color-accent)] hover:underline">Details</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    `;
};

const renderAuditLogCards = (logs, allUsers) => {
    const getUserName = (userId) => {
        const user = allUsers.find(u => u.id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
    };

    const severityClass = (severity) => {
        switch (severity) {
            case 'High': return 'border-red-500';
            case 'Medium': return 'border-yellow-500';
            default: return 'border-green-500';
        }
    };

    return `
    <div class="md:hidden space-y-3 p-4">
        ${logs.map(log => `
            <div class="bg-[var(--color-bg-surface-raised)] rounded-lg border-l-4 ${severityClass(log.severity)} p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-bold text-[var(--color-text-base)]">${log.actionType.replace(/_/g, ' ')}</p>
                        <p class="text-xs text-[var(--color-text-muted)]">${log.entityType}: ${log.entityId}</p>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-[var(--color-border)] flex justify-between items-end">
                    <div>
                        <p class="text-sm text-[var(--color-text-muted)]">By: <span class="font-semibold text-[var(--color-text-base)]">${getUserName(log.userId)}</span></p>
                        <p class="text-xs text-[var(--color-text-inactive)]">${new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    <button data-action="open-action-log-details" data-id="${log.id}" class="text-sm font-semibold text-[var(--color-accent)]">Details &rarr;</button>
                </div>
            </div>
        `).join('')}
    </div>
    `;
};

export const OwnerActionAudit = ({ user }) => {
    if (user.role !== UserRole.Owner) {
        return `<div class="p-8 text-center"><h1 class="text-2xl font-bold text-red-500">Access Denied</h1><p class="text-[var(--color-text-muted)]">This feature is only available to the Owner.</p></div>`;
    }

    const allLogs = getActionLog();
    const allUsers = getUsers();
    const entityTypes = [...new Set(allLogs.map(log => log.entityType))];
    const userRoles = [...new Set(allUsers.map(u => u.role))];

    // Expose renderers to window for dynamic updates from index.js
    window.auditLogRenderers = { renderAuditLogCards, renderAuditLogTable };

    return `
        <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Action Audit Log</h1>

            <div class="bg-[var(--color-bg-surface)] p-4 rounded-xl border border-[var(--color-border)] mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="relative">
                         <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            ${Icons.Search({ className: "w-5 h-5 text-[var(--color-text-muted)]" })}
                        </span>
                        <input type="text" id="audit-search-input" placeholder="Search logs..." class="w-full pl-10 p-2 rounded-md bg-[var(--color-bg-base)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0">
                    </div>
                    <select id="audit-type-filter" class="w-full p-2 rounded-md bg-[var(--color-bg-base)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0">
                        <option value="">All Action Types</option>
                        ${entityTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
                    </select>
                    <select id="audit-role-filter" class="w-full p-2 rounded-md bg-[var(--color-bg-base)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-0">
                        <option value="">All User Roles</option>
                        ${userRoles.map(role => `<option value="${role}">${role}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div id="audit-log-list-container" class="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
                ${renderAuditLogTable(allLogs, allUsers)}
                ${renderAuditLogCards(allLogs, allUsers)}
            </div>
        </div>
    `;
};