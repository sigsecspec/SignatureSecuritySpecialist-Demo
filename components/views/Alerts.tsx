import { getAlerts } from '../../database.js';
import { Icons } from '../Icons.js';

export const Alerts = ({ user }) => {
    const alerts = getAlerts();
    
    const getAlertClasses = (severity) => {
        if (severity === 'High') {
            return {
                bg: 'bg-red-500/10',
                border: 'border-red-500',
                text: 'text-red-400'
            };
        }
        // Assuming other severities are informational
        return {
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500',
            text: 'text-yellow-400'
        };
    };

    return `
         <div class="animate-in" style="opacity: 0;">
            <h1 class="text-3xl font-bold text-[var(--color-text-base)] mb-6">Alerts & Notifications</h1>
            <div class="space-y-4">
                ${alerts.length > 0 ? alerts.map(alert => {
                    const classes = getAlertClasses(alert.severity);
                    return `
                    <div class="${classes.bg} p-4 border-l-4 ${classes.border} rounded-r-lg flex justify-between items-center">
                        <div>
                            <p class="font-bold ${classes.text}">${alert.severity} Priority</p>
                            <p class="text-sm text-[var(--color-text-muted)]">${alert.message}</p>
                        </div>
                        <button class="px-3 py-1 bg-[var(--color-bg-surface-raised)] text-[var(--color-text-base)] rounded-md text-sm hover:bg-[var(--color-border)]">Acknowledge</button>
                    </div>`;
                }).join('') : `
                <div class="text-center py-10 bg-[var(--color-bg-surface)] rounded-lg border border-dashed border-[var(--color-border)]">
                    ${Icons.Bell({ className: "w-12 h-12 mx-auto text-[var(--color-text-inactive)]" })}
                    <h3 class="mt-2 text-lg font-medium text-[var(--color-text-base)]">No Active Alerts</h3>
                    <p class="text-sm text-[var(--color-text-muted)]">The system alert queue is clear.</p>
                </div>
                `}
            </div>
        </div>
    `;
};